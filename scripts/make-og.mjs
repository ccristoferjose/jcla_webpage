/**
 * Imagen de Open Graph: la miniatura del enlace cuando alguien comparte el
 * sitio por WhatsApp, que es justamente por donde va a circular.
 *
 * Sale en JPEG y no WebP a propósito: los previsualizadores de enlaces son
 * mucho más conservadores que los navegadores.
 */
import sharp from "sharp";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const W = 1200;
const H = 630;

const BRAND = "#6b1f24";
const CREAM = "#faf8f6";

const overlay = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${BRAND}" stop-opacity="0.97"/>
      <stop offset="52%"  stop-color="${BRAND}" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="${BRAND}" stop-opacity="0.25"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#fade)"/>
  <text x="80" y="250" font-family="Helvetica, Arial, sans-serif" font-size="34"
        letter-spacing="6" fill="${CREAM}" fill-opacity="0.85">SERVICIO DE COSTURA</text>
  <text x="80" y="345" font-family="Helvetica, Arial, sans-serif" font-size="88"
        font-weight="bold" fill="${CREAM}">JC Atelier</text>
  <text x="80" y="415" font-family="Helvetica, Arial, sans-serif" font-size="34"
        fill="${CREAM}" fill-opacity="0.92">Alteraciones y confección a medida · Guatemala</text>
  <rect x="80" y="462" width="220" height="3" fill="${CREAM}" fill-opacity="0.5"/>
  <text x="80" y="528" font-family="Helvetica, Arial, sans-serif" font-size="30"
        fill="${CREAM}" fill-opacity="0.9">+30 años de experiencia · WhatsApp 3040-7982</text>
</svg>`);

const background = await sharp(path.join(ROOT, "images", "projects2", "workplace1.jpeg"))
  .rotate()
  .resize({ width: W, height: H, fit: "cover", position: "right top" })
  .toBuffer();

const info = await sharp(background)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join(ROOT, "public", "og.jpg"));

console.log(`public/og.jpg · ${W}×${H} · ${(info.size / 1024).toFixed(0)} KB`);
