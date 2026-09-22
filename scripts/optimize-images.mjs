/**
 * Pre-procesado de imágenes.
 *
 * El sitio se exporta estático (`output: "export"`), así que `next/image`
 * corre con `unoptimized: true` y no redimensiona nada en runtime. Toda la
 * optimización tiene que pasar aquí, antes del build.
 *
 * Lee los originales de `images/`, emite WebP en dos anchos a
 * `public/images/` y escribe un manifiesto con las dimensiones reales para
 * que los componentes reserven el espacio y no haya layout shift.
 *
 *     npm run images
 *
 * Los originales (369 MB de fotos directas de cámara) ya no están en el
 * árbol de trabajo: se sacaron del repo una vez generados los derivados,
 * que son los que se sirven. Siguen en el historial de git y se recuperan
 * con el comando que imprime este script si falta el directorio.
 */

import sharp from "sharp";
import { mkdir, writeFile, stat, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC_DIR = path.join(ROOT, "images", "projects2");
const OUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "data", "images.manifest.json");

/** Anchos por uso. La galería se ve en grid, el contenido a ancho completo. */
const WIDTHS = {
  gallery: { large: 1200, small: 600 },
  content: { large: 1600, small: 800 },
};

const QUALITY = 80;

/**
 * `gallery` son prendas reales hechas en el taller: van al portafolio.
 * `content` incluye fotos de proceso y de stock, que ilustran servicios
 * pero no se presentan como trabajo propio.
 */
const SOURCES = [
  // — Portafolio ———————————————————————————————
  { slug: "bomber-negro", file: "jcla_bumber_jacket.jpg", set: "gallery" },
  { slug: "chaqueta-warren", file: "warren_jacket.jpg", set: "gallery" },
  { slug: "bomber-denim", file: "DenimBumberJacket-2.png", set: "gallery" },
  { slug: "bomber-denim-detalle", file: "DenimBumberJacket-3.png", set: "gallery" },
  { slug: "bomber-denim-frente", file: "DenimBumberJacket-6.png", set: "gallery" },
  { slug: "bomber-mujer", file: "bumber_jacker_woman_kercher.jpg", set: "gallery" },
  { slug: "chaqueta-lozano", file: "lozano_jacket.jpg", set: "gallery" },
  { slug: "camisa-seda", file: "kerchedr_silk_shirt.jpg", set: "gallery" },
  { slug: "camisa-manga-larga", file: "jcla_long_slv_shirt.jpg", set: "gallery" },
  { slug: "falda-short", file: "lost_daze_skirt_short.jpg", set: "gallery" },
  { slug: "cargo-frente", file: "jcla_f_cargo_pants.jpg", set: "gallery" },
  { slug: "cargo-espalda", file: "jcla_b_cargo_pants.jpg", set: "gallery" },
  { slug: "pantalon-cinco-bolsas", file: "f_five_pckt_pants.jpg", set: "gallery" },
  { slug: "pantalon-cinco-bolsas-espalda", file: "b_five_pckt_pants.jpg", set: "gallery" },
  { slug: "pantalon-carpintero", file: "carpenter_pants.jpg", set: "gallery" },
  { slug: "short-nylon", file: "rci_nylon_short.jpg", set: "gallery" },

  // — Contenido ————————————————————————————————
  { slug: "taller", file: "workplace1.jpeg", set: "content" },
  { slug: "alteraciones", file: "alterations1.jpeg", set: "content" },
  { slug: "patronaje", file: "pattern-making.png", set: "content" },
  { slug: "confeccion", file: "sample-working.png", set: "content" },
];

async function processOne({ slug, file, set }) {
  const input = path.join(SRC_DIR, file);
  const outDir = path.join(OUT_DIR, set);
  const widths = WIDTHS[set];

  const pipeline = sharp(input).rotate();
  const meta = await pipeline.metadata();

  // `withoutEnlargement` evita escalar hacia arriba una foto ya pequeña.
  const large = await pipeline
    .clone()
    .resize({ width: widths.large, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(path.join(outDir, `${slug}.webp`));

  const small = await pipeline
    .clone()
    .resize({ width: widths.small, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(path.join(outDir, `${slug}-sm.webp`));

  const before = (await stat(input)).size;
  const after = large.size;

  return {
    entry: [
      slug,
      {
        src: `/images/${set}/${slug}.webp`,
        srcSmall: `/images/${set}/${slug}-sm.webp`,
        width: large.width,
        height: large.height,
        // Ancho real de la variante pequeña: alimenta el `srcSet`, y puede
        // no ser `widths.small` si el original ya era más angosto.
        widthSmall: small.width,
      },
    ],
    before,
    after,
    original: `${meta.width}×${meta.height}`,
  };
}

async function main() {
  try {
    await access(SRC_DIR);
  } catch {
    console.error(
      `No existe ${path.relative(ROOT, SRC_DIR)}.\n\n` +
        "Los originales se quitaron del árbol de trabajo pero siguen en el\n" +
        "historial de git. Para recuperarlos:\n\n" +
        "  git checkout 280de1a -- images/\n\n" +
        "Si vas a trabajar con fotos nuevas, colócalas en ese directorio y\n" +
        "añádelas a SOURCES, más arriba en este archivo.",
    );
    process.exit(1);
  }

  await mkdir(path.join(OUT_DIR, "gallery"), { recursive: true });
  await mkdir(path.join(OUT_DIR, "content"), { recursive: true });

  const manifest = {};
  let totalBefore = 0;
  let totalAfter = 0;

  for (const source of SOURCES) {
    try {
      const { entry, before, after, original } = await processOne(source);
      manifest[entry[0]] = entry[1];
      totalBefore += before;
      totalAfter += after;

      const mb = (n) => (n / 1048576).toFixed(2);
      console.log(
        `  ${entry[0].padEnd(32)} ${original.padEnd(11)} ${mb(before).padStart(6)} MB → ${mb(after).padStart(5)} MB`,
      );
    } catch (error) {
      console.error(`  ✗ ${source.slug}: ${error.message}`);
      process.exitCode = 1;
    }
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  const mb = (n) => (n / 1048576).toFixed(1);
  console.log(
    `\n${Object.keys(manifest).length} imágenes · ${mb(totalBefore)} MB → ${mb(totalAfter)} MB ` +
      `(${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}% menos)`,
  );
  console.log(`Manifiesto: ${path.relative(ROOT, MANIFEST)}`);
}

await main();
