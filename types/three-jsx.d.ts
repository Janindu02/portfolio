// meshline custom JSX elements used in lanyard.tsx via @react-three/fiber's extend()
import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineGeometry: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meshLineMaterial: any;
    }
  }
}
