'use client';
import React, { useEffect, useRef } from 'react';

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface SplashCursorProps {
  SIM_RESOLUTION?: number;
  DYE_RESOLUTION?: number;
  CAPTURE_RESOLUTION?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  SHADING?: boolean;
  COLOR_UPDATE_SPEED?: number;
  BACK_COLOR?: ColorRGB;
  TRANSPARENT?: boolean;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1440,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  TRANSPARENT = true,
  RAINBOW_MODE = false,
  COLOR = '#7c3aed',
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let pointers: Pointer[] = [pointerPrototype()];

    const config = {
      SIM_RESOLUTION: SIM_RESOLUTION!,
      DYE_RESOLUTION: DYE_RESOLUTION!,
      CAPTURE_RESOLUTION: CAPTURE_RESOLUTION!,
      DENSITY_DISSIPATION: DENSITY_DISSIPATION!,
      VELOCITY_DISSIPATION: VELOCITY_DISSIPATION!,
      PRESSURE: PRESSURE!,
      PRESSURE_ITERATIONS: PRESSURE_ITERATIONS!,
      CURL: CURL!,
      SPLAT_RADIUS: SPLAT_RADIUS!,
      SPLAT_FORCE: SPLAT_FORCE!,
      SHADING,
      COLOR_UPDATE_SPEED: COLOR_UPDATE_SPEED!,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
      RAINBOW_MODE,
      COLOR,
    };

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl || !ext) return;

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let gl = canvas.getContext('webgl2', params) as WebGL2RenderingContext | null;
      if (!gl) {
        gl = (canvas.getContext('webgl', params) ||
          canvas.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;
      }
      if (!gl) throw new Error('Unable to initialize WebGL.');

      const isWebGL2 = 'drawBuffers' in gl;
      let supportLinearFiltering = false;
      let halfFloat = null;

      if (isWebGL2) {
        (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = !!gl.getExtension('OES_texture_half_float_linear');
      }

      gl.clearColor(0, 0, 0, 1);
      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : ((halfFloat as any)?.HALF_FLOAT_OES ?? 0);

      let formatRGBA: any, formatRG: any, formatR: any;
      if (isWebGL2) {
        const gl2 = gl as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(gl, gl2.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG   = getSupportedFormat(gl, gl2.RG16F,   gl2.RG,  halfFloatTexType);
        formatR    = getSupportedFormat(gl, gl2.R16F,    gl2.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG   = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR    = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    function getSupportedFormat(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number, format: number, type: number
    ): { internalFormat: number; format: number } | null {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if ('drawBuffers' in gl) {
          const gl2 = gl as WebGL2RenderingContext;
          switch (internalFormat) {
            case gl2.R16F:  return getSupportedFormat(gl2, gl2.RG16F,   gl2.RG,   type);
            case gl2.RG16F: return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
            default:        return null;
          }
        }
        return null;
      }
      return { internalFormat, format };
    }

    function supportRenderTextureFormat(
      gl: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number, format: number, type: number
    ) {
      const texture = gl.createTexture();
      if (!texture) return false;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = gl.createFramebuffer();
      if (!fbo) return false;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    function hashCode(s: string) {
      let hash = 0;
      for (let i = 0; i < s.length; i++) { hash = (hash << 5) - hash + s.charCodeAt(i); hash |= 0; }
      return hash;
    }

    function addKeywords(source: string, keywords: string[] | null) {
      if (!keywords) return source;
      return keywords.map(k => `#define ${k}\n`).join('') + source;
    }

    function compileShader(type: number, source: string, keywords: string[] | null = null) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, addKeywords(source, keywords));
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader));
      return shader;
    }

    function createProgram(vert: WebGLShader | null, frag: WebGLShader | null) {
      if (!vert || !frag) return null;
      const prog = gl.createProgram();
      if (!prog) return null;
      gl.attachShader(prog, vert);
      gl.attachShader(prog, frag);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(prog));
      return prog;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
      }
      return uniforms;
    }

    class Program {
      program: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vert: WebGLShader | null, frag: WebGLShader | null) {
        this.program = createProgram(vert, frag);
        this.uniforms = this.program ? getUniforms(this.program) : {};
      }
      bind() { if (this.program) gl.useProgram(this.program); }
    }

    class Material {
      vertexShader: WebGLShader | null;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram | null>;
      activeProgram: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vert: WebGLShader | null, fragSrc: string) {
        this.vertexShader = vert;
        this.fragmentShaderSource = fragSrc;
        this.programs = {};
        this.activeProgram = null;
        this.uniforms = {};
      }
      setKeywords(keywords: string[]) {
        let hash = 0;
        for (const kw of keywords) hash += hashCode(kw);
        let prog = this.programs[hash];
        if (prog == null) {
          const frag = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          prog = createProgram(this.vertexShader, frag);
          this.programs[hash] = prog;
        }
        if (prog === this.activeProgram) return;
        if (prog) this.uniforms = getUniforms(prog);
        this.activeProgram = prog;
      }
      bind() { if (this.activeProgram) gl.useProgram(this.activeProgram); }
    }

    // ── Shaders ───────────────────────────────────────────────────────
    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }`);

    const copyShader       = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main () { gl_FragColor = texture2D(uTexture, vUv); }`);
    const clearShader      = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main () { gl_FragColor = value * texture2D(uTexture, vUv); }`);
    const splatShader      = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main () { vec2 p = vUv - point.xy; p.x *= aspectRatio; vec3 splat = exp(-dot(p, p) / radius) * color; vec3 base = texture2D(uTarget, vUv).xyz; gl_FragColor = vec4(base + splat, 1.0); }`);
    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main () { float L=texture2D(uVelocity,vL).x; float R=texture2D(uVelocity,vR).x; float T=texture2D(uVelocity,vT).y; float B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy; if(vL.x<0.0){L=-C.x;} if(vR.x>1.0){R=-C.x;} if(vT.y>1.0){T=-C.y;} if(vB.y<0.0){B=-C.y;} gl_FragColor=vec4(0.5*(R-L+T-B),0.0,0.0,1.0); }`);
    const curlShader       = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity; void main () { float L=texture2D(uVelocity,vL).y; float R=texture2D(uVelocity,vR).y; float T=texture2D(uVelocity,vT).x; float B=texture2D(uVelocity,vB).x; gl_FragColor=vec4(0.5*(R-L-T+B),0.0,0.0,1.0); }`);
    const pressureShader   = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; void main () { float L=texture2D(uPressure,vL).x; float R=texture2D(uPressure,vR).x; float T=texture2D(uPressure,vT).x; float B=texture2D(uPressure,vB).x; float div=texture2D(uDivergence,vUv).x; gl_FragColor=vec4((L+R+B+T-div)*0.25,0.0,0.0,1.0); }`);
    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR; varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; void main () { float L=texture2D(uPressure,vL).x; float R=texture2D(uPressure,vR).x; float T=texture2D(uPressure,vT).x; float B=texture2D(uPressure,vB).x; vec2 vel=texture2D(uVelocity,vUv).xy; vel.xy-=vec2(R-L,T-B); gl_FragColor=vec4(vel,0.0,1.0); }`);

    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main () {
        float L=texture2D(uCurl,vL).x; float R=texture2D(uCurl,vR).x;
        float T=texture2D(uCurl,vT).x; float B=texture2D(uCurl,vB).x;
        float C=texture2D(uCurl,vUv).x;
        vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
        force/=length(force)+0.0001; force*=curl*C; force.y*=-1.0;
        vec2 vel=texture2D(uVelocity,vUv).xy+force*dt;
        vel=min(max(vel,-1000.0),1000.0);
        gl_FragColor=vec4(vel,0.0,1.0);
      }`);

    const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource;
      uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation;
      vec4 bilerp(sampler2D sam,vec2 uv,vec2 tsize){
        vec2 st=uv/tsize-0.5; vec2 iuv=floor(st); vec2 fuv=fract(st);
        vec4 a=texture2D(sam,(iuv+vec2(0.5,0.5))*tsize); vec4 b=texture2D(sam,(iuv+vec2(1.5,0.5))*tsize);
        vec4 c=texture2D(sam,(iuv+vec2(0.5,1.5))*tsize); vec4 d=texture2D(sam,(iuv+vec2(1.5,1.5))*tsize);
        return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);
      }
      void main(){
        #ifdef MANUAL_FILTERING
          vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
          vec4 result=bilerp(uSource,coord,dyeTexelSize);
        #else
          vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;
          vec4 result=texture2D(uSource,coord);
        #endif
        gl_FragColor=result/(1.0+dissipation*dt);
      }`, ext.supportLinearFiltering ? null : ['MANUAL_FILTERING']);

    const displayShaderSource = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uTexture; uniform vec2 texelSize;
      vec3 linearToGamma(vec3 color){ color=max(color,vec3(0)); return max(1.055*pow(color,vec3(0.416666667))-0.055,vec3(0)); }
      void main(){
        vec3 c=texture2D(uTexture,vUv).rgb;
        #ifdef SHADING
          vec3 lc=texture2D(uTexture,vL).rgb; vec3 rc=texture2D(uTexture,vR).rgb;
          vec3 tc=texture2D(uTexture,vT).rgb; vec3 bc=texture2D(uTexture,vB).rgb;
          float dx=length(rc)-length(lc); float dy=length(tc)-length(bc);
          vec3 n=normalize(vec3(dx,dy,length(texelSize))); vec3 l=vec3(0.0,0.0,1.0);
          float diffuse=clamp(dot(n,l)+0.7,0.7,1.0); c*=diffuse;
        #endif
        float a=max(c.r,max(c.g,c.b));
        gl_FragColor=vec4(c,a);
      }`;

    // ── Blit ─────────────────────────────────────────────────────────
    interface FBO { texture: WebGLTexture; fbo: WebGLFramebuffer; width: number; height: number; texelSizeX: number; texelSizeY: number; attach: (id: number) => number; }
    interface DoubleFBO { width: number; height: number; texelSizeX: number; texelSizeY: number; read: FBO; write: FBO; swap: () => void; }

    const blit = (() => {
      const buf = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
      const ebuf = gl.createBuffer()!;
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebuf);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return (target: FBO | null, doClear = false) => {
        if (!target) { gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER, null); }
        else { gl.viewport(0, 0, target.width, target.height); gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); }
        if (doClear) { gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture, fbo, width: w, height: h, texelSizeX: 1/w, texelSizeY: 1/h, attach(id: number) { gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
      let r = createFBO(w,h,internalFormat,format,type,param);
      let wr = createFBO(w,h,internalFormat,format,type,param);
      return { width:w, height:h, texelSizeX:r.texelSizeX, texelSizeY:r.texelSizeY, read:r, write:wr, swap(){ const t=this.read; this.read=this.write; this.write=t; } };
    }

    function resizeFBO(target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      const newFBO = createFBO(w,h,internalFormat,format,type,param);
      copyProgram.bind();
      if (copyProgram.uniforms.uTexture) gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
      blit(newFBO, false);
      return newFBO;
    }

    function resizeDoubleFBO(target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      if (target.width===w && target.height===h) return target;
      target.read  = resizeFBO(target.read,  w,h,internalFormat,format,type,param);
      target.write = createFBO(w,h,internalFormat,format,type,param);
      target.width=w; target.height=h; target.texelSizeX=1/w; target.texelSizeY=1/h;
      return target;
    }

    // ── Programs ──────────────────────────────────────────────────────
    const copyProgram             = new Program(baseVertexShader, copyShader);
    const clearProgram            = new Program(baseVertexShader, clearShader);
    const splatProgram            = new Program(baseVertexShader, splatShader);
    const advectionProgram        = new Program(baseVertexShader, advectionShader);
    const divergenceProgram       = new Program(baseVertexShader, divergenceShader);
    const curlProgram             = new Program(baseVertexShader, curlShader);
    const vorticityProgram        = new Program(baseVertexShader, vorticityShader);
    const pressureProgram         = new Program(baseVertexShader, pressureShader);
    const gradienSubtractProgram  = new Program(baseVertexShader, gradientSubtractShader);
    const displayMaterial         = new Material(baseVertexShader, displayShaderSource);

    let dye: DoubleFBO, velocity: DoubleFBO, divergence: FBO, curl: FBO, pressure: DoubleFBO;

    function getResolution(resolution: number) {
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const aspect = w > h ? w/h : h/w;
      const min = Math.round(resolution), max = Math.round(resolution * aspect);
      return w > h ? { width: max, height: min } : { width: min, height: max };
    }

    function initFramebuffers() {
      const simRes  = getResolution(config.SIM_RESOLUTION);
      const dyeRes  = getResolution(config.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba    = ext.formatRGBA, rg = ext.formatRG, r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);
      dye      = dye      ? resizeDoubleFBO(dye,      dyeRes.width,  dyeRes.height,  rgba.internalFormat, rgba.format, texType, filtering) : createDoubleFBO(dyeRes.width,  dyeRes.height,  rgba.internalFormat, rgba.format, texType, filtering);
      velocity = velocity ? resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat,   rg.format,   texType, filtering) : createDoubleFBO(simRes.width, simRes.height, rg.internalFormat,   rg.format,   texType, filtering);
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curl       = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure   = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function updateKeywords() {
      const kw: string[] = [];
      if (config.SHADING) kw.push('SHADING');
      displayMaterial.setKeywords(kw);
    }

    updateKeywords();
    initFramebuffers();

    let lastUpdateTime  = Date.now();
    let colorUpdateTimer = 0;
    let rafId = 0;

    function scaleByPixelRatio(input: number) { return Math.floor(input * (window.devicePixelRatio || 1)); }

    function calcDeltaTime() { const now = Date.now(); const dt = Math.min((now - lastUpdateTime) / 1000, 0.016666); lastUpdateTime = now; return dt; }

    function resizeCanvas() {
      const w = scaleByPixelRatio(canvas!.clientWidth), h = scaleByPixelRatio(canvas!.clientHeight);
      if (canvas!.width !== w || canvas!.height !== h) { canvas!.width = w; canvas!.height = h; return true; }
      return false;
    }

    function hexToRGB(hex: string): ColorRGB {
      let v = hex.replace('#','');
      if (v.length===3) v = v[0]+v[0]+v[1]+v[1]+v[2]+v[2];
      return { r: parseInt(v.slice(0,2),16)/255*0.15, g: parseInt(v.slice(2,4),16)/255*0.15, b: parseInt(v.slice(4,6),16)/255*0.15 };
    }

    function generateColor(): ColorRGB {
      if (!config.RAINBOW_MODE) return hexToRGB(config.COLOR!);
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      return { r: c.r*0.15, g: c.g*0.15, b: c.b*0.15 };
    }

    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
      const i = Math.floor(h*6), f = h*6-i, p = v*(1-s), q = v*(1-f*s), t = v*(1-(1-f)*s);
      const cases: [number,number,number][] = [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]];
      const [r,g,b] = cases[i%6];
      return { r, g, b };
    }

    function wrap(value: number, min: number, max: number) { const range = max-min; return range===0 ? min : ((value-min)%range)+min; }

    function updateColors(dt: number) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) { colorUpdateTimer = wrap(colorUpdateTimer, 0, 1); pointers.forEach(p => { p.color = generateColor(); }); }
    }

    function correctRadius(radius: number) { const ar = canvas!.width/canvas!.height; if (ar > 1) radius *= ar; return radius; }
    function correctDeltaX(delta: number)  { const ar = canvas!.width/canvas!.height; if (ar < 1) delta *= ar; return delta; }
    function correctDeltaY(delta: number)  { const ar = canvas!.width/canvas!.height; if (ar > 1) delta /= ar; return delta; }

    function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget!, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio!, canvas!.width/canvas!.height);
      gl.uniform2f(splatProgram.uniforms.point!, x, y);
      gl.uniform3f(splatProgram.uniforms.color!, dx, dy, 0);
      gl.uniform1f(splatProgram.uniforms.radius!, correctRadius(config.SPLAT_RADIUS/100));
      blit(velocity.write); velocity.swap();
      gl.uniform1i(splatProgram.uniforms.uTarget!, dye.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color!, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    function splatPointer(pointer: Pointer) { splat(pointer.texcoordX, pointer.texcoordY, pointer.deltaX*config.SPLAT_FORCE, pointer.deltaY*config.SPLAT_FORCE, pointer.color); }

    function clickSplat(pointer: Pointer) {
      const color = generateColor();
      color.r *= 10; color.g *= 10; color.b *= 10;
      splat(pointer.texcoordX, pointer.texcoordY, 10*(Math.random()-0.5), 30*(Math.random()-0.5), color);
    }

    function updatePointerDownData(p: Pointer, id: number, posX: number, posY: number) {
      p.id = id; p.down = true; p.moved = false;
      p.texcoordX = posX/canvas!.width; p.texcoordY = 1-posY/canvas!.height;
      p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
      p.deltaX = 0; p.deltaY = 0; p.color = generateColor();
    }

    function updatePointerMoveData(p: Pointer, posX: number, posY: number, color: ColorRGB) {
      p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
      p.texcoordX = posX/canvas!.width; p.texcoordY = 1-posY/canvas!.height;
      p.deltaX = correctDeltaX(p.texcoordX-p.prevTexcoordX);
      p.deltaY = correctDeltaY(p.texcoordY-p.prevTexcoordY);
      p.moved = Math.abs(p.deltaX) > 0 || Math.abs(p.deltaY) > 0;
      p.color = color;
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);

      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlProgram.uniforms.uVelocity!, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity!, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl!, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl!, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt!, dt);
      blit(velocity.write); velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity!, velocity.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture!, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value!, config.PRESSURE);
      blit(pressure.write); pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureProgram.uniforms.uDivergence!, divergence.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure!, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure!, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity!, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize!, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize!, velocity.texelSizeX, velocity.texelSizeY);
      const vId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity!, vId);
      gl.uniform1i(advectionProgram.uniforms.uSource!, vId);
      gl.uniform1f(advectionProgram.uniforms.dt!, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation!, config.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize!, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(advectionProgram.uniforms.uVelocity!, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource!, dye.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation!, config.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function render(target: FBO | null) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      const w = target ? target.width : gl.drawingBufferWidth;
      const h = target ? target.height : gl.drawingBufferHeight;
      displayMaterial.bind();
      if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize!, 1/w, 1/h);
      gl.uniform1i(displayMaterial.uniforms.uTexture!, dye.read.attach(0));
      blit(target, false);
    }

    function updateFrame() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      pointers.forEach(p => { if (p.moved) { p.moved = false; splatPointer(p); } });
      step(dt);
      render(null);
      rafId = requestAnimationFrame(updateFrame);
    }

    // ── Event listeners ───────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      const p = pointers[0];
      updatePointerDownData(p, -1, scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY));
      clickSplat(p);
    };
    const onMouseMove = (e: MouseEvent) => {
      const p = pointers[0];
      updatePointerMoveData(p, scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY), p.color);
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.targetTouches[0];
      updatePointerDownData(pointers[0], t.identifier, scaleByPixelRatio(t.clientX), scaleByPixelRatio(t.clientY));
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.targetTouches[0];
      updatePointerMoveData(pointers[0], scaleByPixelRatio(t.clientX), scaleByPixelRatio(t.clientY), pointers[0].color);
    };
    const onTouchEnd = () => { pointers[0].down = false; };

    // First mouse-move kick-starts the render loop
    const onFirstMove = (e: MouseEvent) => {
      updatePointerMoveData(pointers[0], scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY), generateColor());
      updateFrame();
      window.removeEventListener('mousemove', onFirstMove);
    };

    window.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mousemove',  onFirstMove);
    window.addEventListener('touchstart', onTouchStart, false);
    window.addEventListener('touchmove',  onTouchMove,  false);
    window.addEventListener('touchend',   onTouchEnd);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mousemove',  onFirstMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
    };
  }, [
    SIM_RESOLUTION, DYE_RESOLUTION, CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS,
    CURL, SPLAT_RADIUS, SPLAT_FORCE, SHADING, COLOR_UPDATE_SPEED,
    BACK_COLOR, TRANSPARENT, RAINBOW_MODE, COLOR,
  ]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[10]" aria-hidden>
      <canvas ref={canvasRef} className="block h-screen w-screen" />
    </div>
  );
}

export default SplashCursor;
