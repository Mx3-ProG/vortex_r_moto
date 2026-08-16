import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // react-hooks purity/immutability rules assume a pure React render
    // model. React Three Fiber's useFrame is an imperative per-frame
    // render loop that is *meant* to mutate Object3D instances (camera,
    // meshes, materials) returned by useThree/useRef — that's the
    // documented R3F pattern, not a bug. Disable these two rules only
    // where that imperative pattern lives.
    files: ["src/components/canvas/**/*.{ts,tsx}", "src/lib/r3f/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
