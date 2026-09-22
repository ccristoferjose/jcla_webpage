import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * eslint-config-next 16 exporta flat config directamente, así que no hace
 * falta el shim de FlatCompat.
 */
const config = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "out/**", "node_modules/**", "scripts/**", "next.config.ts"] },
];

export default config;
