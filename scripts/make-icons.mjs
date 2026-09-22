/** Icono cuadrado para "añadir a pantalla de inicio" en iOS y Android. */
import sharp from "sharp";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const svg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#6b1f24"/>
  <text x="90" y="112" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="76" font-weight="bold" fill="#faf8f6" letter-spacing="-3">JC</text>
  <rect x="45" y="132" width="90" height="3" fill="#faf8f6" fill-opacity="0.55"/>
</svg>`);

const info = await sharp(svg).png().toFile(path.join(ROOT, "public", "apple-touch-icon.png"));
console.log(`public/apple-touch-icon.png · ${info.width}×${info.height} · ${(info.size / 1024).toFixed(1)} KB`);
