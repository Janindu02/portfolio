// @ts-nocheck — adapted from react-bits Lanyard; three.js types conflict with strict TS
"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

// Assets served from public/lanyard/
const CARD_GLB    = "/lanyard/card.glb";
const LANYARD_PNG = "/lanyard/lanyard.png";

// UV rects for the two card faces baked into the GLB texture atlas
const FRONT_UV = { x: 0,   y: 0, w: 0.5,  h: 0.755 };
const BACK_UV  = { x: 0.5, y: 0, w: 0.5,  h: 0.757 };

extend({ MeshLineGeometry, MeshLineMaterial });

/* ── Public component ───────────────────────────────────────────── */

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

export default function Lanyard({
  // Camera sits at z=16, pitched down to y=-2.5 so the canvas frames the card
  // body rather than the empty rope space above it.
  position = [0, -2.5, 16],
  gravity = [0, -40, 0],
  fov = 28,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="relative z-0 w-full h-full flex justify-center items-center">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer intensity={1.2} color="white" position={[0, -1, 5]}   rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={1.5} color="white" position={[-1, -1, 1]}  rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={1.5} color="white" position={[1, 1, 1]}    rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={4}   color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

/* ── Internal Band + Card ───────────────────────────────────────── */

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: "cover" | "contain";
  lanyardImage?: string | null;
  lanyardWidth?: number;
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  lanyardImage = null,
  lanyardWidth = 1,
}: BandProps) {
  const band  = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1    = useRef<any>(null);
  const j2    = useRef<any>(null);
  const j3    = useRef<any>(null);
  const card  = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB) as any;
  const texture  = useTexture(lanyardImage || LANYARD_PNG);
  // Hooks must be called unconditionally — fall back to LANYARD_PNG (already cached).
  const frontTex = useTexture(frontImage || LANYARD_PNG);
  const backTex  = useTexture(backImage  || LANYARD_PNG);

  // Full atlas composite: portrait-only front + premium branded back
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    if (!frontImage) return baseMap;

    const baseImg = baseMap?.image as any;
    if (!baseImg) return baseMap;
    const AW = baseImg.naturalWidth  ?? baseImg.width;
    const AH = baseImg.naturalHeight ?? baseImg.height;
    if (!AW || !AH) return baseMap;

    const cvs = document.createElement("canvas");
    cvs.width = AW; cvs.height = AH;
    const ctx = cvs.getContext("2d");
    if (!ctx) return baseMap;

    // Preserve original atlas (keeps clip / clamp metal geometry textures intact)
    ctx.drawImage(baseImg, 0, 0, AW, AH);

    // ── FRONT FACE — portrait fills the face, zero overlay ───────────────
    if (frontTex.image) {
      const fx = FRONT_UV.x * AW, fy = FRONT_UV.y * AH;
      const fw = FRONT_UV.w * AW, fh = FRONT_UV.h * AH;

      ctx.fillStyle = "#050510";
      ctx.fillRect(fx, fy, fw, fh);

      const img = frontTex.image as any;
      const iw  = img.naturalWidth  ?? img.width;
      const ih  = img.naturalHeight ?? img.height;
      const s   = Math.max(fw / iw, fh / ih);
      const dw  = iw * s, dh = ih * s;
      ctx.save();
      ctx.beginPath();
      ctx.rect(fx, fy, fw, fh);
      ctx.clip();
      ctx.drawImage(img, fx + (fw - dw) / 2, fy + (fh - dh) / 2, dw, dh);
      ctx.restore();
    }

    // ── BACK FACE — premium branded card ─────────────────────────────────
    {
      const bx = BACK_UV.x * AW, by = BACK_UV.y * AH;
      const bw = BACK_UV.w * AW, bh = BACK_UV.h * AH;
      const cx = bx + bw / 2;

      // Clip strictly to the back-face UV region — prevents any text from
      // bleeding left into the front face when a string is wider than bw.
      ctx.save();
      ctx.beginPath();
      ctx.rect(bx, by, bw, bh);
      ctx.clip();

      // Deep dark background
      const bg = ctx.createLinearGradient(bx, by, bx, by + bh);
      bg.addColorStop(0,    "#0d0b1e");
      bg.addColorStop(0.45, "#13103a");
      bg.addColorStop(1,    "#070714");
      ctx.fillStyle = bg;
      ctx.fillRect(bx, by, bw, bh);

      // Top accent bar — violet → cyan
      const barGrd = ctx.createLinearGradient(bx, 0, bx + bw, 0);
      barGrd.addColorStop(0, "#7c3aed");
      barGrd.addColorStop(1, "#06b6d4");
      ctx.fillStyle = barGrd;
      ctx.fillRect(bx, by, bw, Math.round(bh * 0.028));

      // Bottom accent bar (thinner mirror)
      ctx.fillStyle = barGrd;
      ctx.fillRect(bx, by + bh - Math.round(bh * 0.016), bw, Math.round(bh * 0.016));

      // Monogram circle with glow
      const circR = bh * 0.1;
      const circY = by + bh * 0.19;
      const glow  = ctx.createRadialGradient(cx, circY, 0, cx, circY, circR * 2);
      glow.addColorStop(0, "rgba(124,58,237,0.35)");
      glow.addColorStop(1, "rgba(124,58,237,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, circY, circR * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = "rgba(124,58,237,0.8)";
      ctx.lineWidth   = Math.max(1, bh * 0.004);
      ctx.beginPath();
      ctx.arc(cx, circY, circR, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle    = "#c4b5fd";
      ctx.font         = `bold ${Math.round(circR * 1.05)}px Arial, sans-serif`;
      ctx.textAlign    = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("JA", cx, circY);
      ctx.textBaseline = "alphabetic";

      // Name
      ctx.fillStyle = "#ffffff";
      ctx.font      = `bold ${Math.round(bh * 0.082)}px Arial, sans-serif`;
      ctx.fillText("JANINDU",    cx, by + bh * 0.355);
      ctx.fillText("AMARAWEERA", cx, by + bh * 0.448);

      // Divider
      ctx.strokeStyle = "rgba(124,58,237,0.35)";
      ctx.lineWidth   = 1;
      ctx.beginPath();
      ctx.moveTo(bx + bw * 0.14, by + bh * 0.5);
      ctx.lineTo(bx + bw * 0.86, by + bh * 0.5);
      ctx.stroke();

      // Role — two lines so neither overflows bw
      ctx.fillStyle = "#a5b4fc";
      ctx.font      = `${Math.round(bh * 0.048)}px Arial, sans-serif`;
      ctx.fillText("Software Engineering",  cx, by + bh * 0.545);
      ctx.fillText("Undergraduate",         cx, by + bh * 0.605);

      // Contact details
      ctx.fillStyle = "#64748b";
      ctx.font      = `${Math.round(bh * 0.038)}px Arial, sans-serif`;
      [
        "janiduamaraweera@gmail.com",
        "+94 71 397 4674",
        "linkedin.com/in/janinduamaraweera",
        "Panadura, Sri Lanka",
      ].forEach((line, i) => ctx.fillText(line, cx, by + bh * (0.665 + i * 0.068)));

      // University footer
      ctx.fillStyle = "rgba(165,180,252,0.28)";
      ctx.font      = `italic ${Math.round(bh * 0.033)}px Arial, sans-serif`;
      ctx.fillText("University of Westminster", cx, by + bh * 0.955);

      ctx.restore(); // end back-face clip
    }

    const tex = new THREE.CanvasTexture(cvs);
    tex.colorSpace  = THREE.SRGBColorSpace;
    tex.flipY       = baseMap.flipY;
    tex.anisotropy  = 16;
    tex.needsUpdate = true;
    return tex;
  }, [frontImage, frontTex, materials.base.map]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1,    j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2,    j3, [[0, 0, 0], [0, 0, 0], 1]);
  // Anchor y = mesh offset (-1.2) + scale (3.25) * half-height (1.125) ≈ 2.45 → clip sits above card face
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 2.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => { document.body.style.cursor = "auto"; };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((r) => r.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((r) => {
        if (!r.current.lerped)
          r.current.lerped = new THREE.Vector3().copy(r.current.translation());
        const d = Math.max(0.1, Math.min(1, r.current.lerped.distanceTo(r.current.translation())));
        r.current.lerped.lerp(r.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={3.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={0.4}
                clearcoatRoughness={0.3}
                roughness={0.6}
                metalness={0.05}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry}  material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB);
