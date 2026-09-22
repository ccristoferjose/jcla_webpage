import type { NextConfig } from "next";

/**
 * El sitio se publica en GitHub Pages, que sirve archivos estáticos.
 *
 * - `output: "export"` produce `out/` con HTML plano por ruta.
 * - `images.unoptimized` es obligatorio en export: no hay servidor que
 *   redimensione, por eso las fotos se pre-procesan con `npm run images`.
 * - `trailingSlash` hace que /servicios resuelva a /servicios/index.html,
 *   que es lo único que Pages sabe servir.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
