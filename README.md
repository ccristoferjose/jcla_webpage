# JC Atelier

Sitio web de JC Atelier — taller de costura en Guatemala. Alteraciones y confección
a medida, con más de 30 años de oficio.

El objetivo del sitio es uno solo: que el visitante **solicite un fitting por
WhatsApp**. No hay backend ni formularios que envíen datos a ningún lado.

- **Español** en la raíz (`/`), **inglés** bajo `/en`
- Next.js con export estático, publicado en GitHub Pages
- Contacto exclusivamente por WhatsApp (`3040-7982`)

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el sitio estático en `out/` |
| `npm run lint` | ESLint |
| `npm run images` | Re-procesa las fotos (ver *Imágenes*) |

Para probar exactamente lo que servirá GitHub Pages:

```bash
npm run build && npx serve out
```

## Dónde se edita cada cosa

| Qué quieres cambiar | Archivo |
|---|---|
| Teléfono, horarios, zona de cobertura, Instagram, dominio | `src/data/site.ts` |
| Textos en español | `src/i18n/es.ts` |
| Textos en inglés | `src/i18n/en.ts` |
| Servicios (orden, icono, foto) | `src/data/services.ts` |
| Fotos del portafolio y sus descripciones | `src/data/gallery.ts` |
| Reseñas de clientes | `src/data/testimonials.ts` |
| Colores y tipografías | `src/app/globals.css` |
| Rutas de cada idioma | `src/i18n/routes.ts` |

`src/i18n/es.ts` es la fuente de verdad del contenido y define el tipo del
diccionario. Si agregas una clave ahí y olvidas traducirla, **el build falla**:
`en.ts` está tipado contra `es.ts`.

### Reseñas

`src/data/testimonials.ts` está vacío a propósito y la sección no se renderiza
mientras lo esté. Se activa sola al agregar la primera reseña real.

## Cómo está armado el i18n

El sitio se exporta estático, y en export estático **el middleware de Next no
corre**. Eso descarta `next-intl` con `localePrefix: "as-needed"`, que es lo que
haría falta para tener español sin prefijo: sin middleware no hay negociación de
idioma y el prefijo pasa a ser obligatorio (`/es` y `/en`).

La solución son **dos layouts raíz**, uno por idioma, cada uno con su propio
`<html lang>`:

```
src/app/
├── (es)/            → /, /servicios, /galeria, /nosotros
└── (en)/en/         → /en, /en/services, /en/gallery, /en/about
```

Next.js permite varios layouts raíz siempre que **no exista** `src/app/layout.tsx`
y cada árbol viva en su propio route group. Cada `page.tsx` es un envoltorio de
tres líneas sobre una vista compartida de `src/views/`, así que la UI no se
duplica: solo las rutas.

Para agregar una página hay que tocar cuatro lugares: la ruta en
`src/i18n/routes.ts`, los textos en ambos diccionarios, la vista en `src/views/`
y los dos `page.tsx`.

## El carrusel del portafolio

`GalleryCarousel` se desplaza con scroll nativo y `scroll-snap`, no con un
carrusel gobernado por JavaScript: así el arrastre con el dedo, el trackpad y el
teclado funcionan solos, y sin JavaScript las fotos siguen siendo desplazables.
Las flechas, la barra de progreso y el difuminado de los bordes son una capa
encima que solo lee y empuja ese scroll.

Dos detalles que no son evidentes al leer el código:

- El desplazamiento de las flechas se anima a mano en vez de usar
  `scrollBy({ behavior: "smooth" })`, para aterrizar en el borde exacto de una
  tarjeta. El snap se desactiva durante el recorrido porque, si no, cada
  posición intermedia sería reajustada al anclaje más cercano y la animación
  avanzaría a saltos.
- Las primeras cinco fotos se cargan con `loading="eager"`. En un contenedor
  horizontal, `lazy` no las trae hasta que entran al viewport, y eso hace que
  aparezcan en blanco justo al pulsar la flecha.

Al hacer clic en una foto se abre un visor a pantalla completa construido sobre
`<dialog>`, que trae el foco atrapado y el cierre con Escape sin código extra.

## Imágenes

Con `output: "export"`, `next/image` corre con `unoptimized: true` y no
redimensiona nada en tiempo de ejecución. Por eso las fotos se pre-procesan:

```bash
npm run images
```

El script lee `images/projects2/`, emite WebP en dos anchos a `public/images/` y
escribe `src/data/images.manifest.json` con las dimensiones reales, que es lo que
usa el componente `Photo` para reservar el espacio y evitar saltos de layout.

Los originales (369 MB de fotos directas de cámara) **ya no están en el árbol de
trabajo**: se quitaron una vez generados los derivados, que pesan 3.3 MB. Siguen
en el historial de git y se recuperan con:

```bash
git checkout 280de1a -- images/
```

El script te recuerda este comando si el directorio no existe.

Para agregar fotos nuevas: ponlas en `images/projects2/`, añádelas a `SOURCES` en
`scripts/optimize-images.mjs`, corre `npm run images` y registra el slug en
`src/data/gallery.ts` con su `title` (el pie de foto del carrusel, dos o tres
palabras) y su `alt` (la descripción larga para lectores de pantalla).

La imagen de Open Graph (`public/og.jpg`) y el icono se regeneran con
`node scripts/make-og.mjs` y `node scripts/make-icons.mjs`.

## Despliegue

`.github/workflows/deploy.yml` construye y publica en cada push a `main`. Hace
falta activar **Settings → Pages → Source: GitHub Actions** en el repositorio.

### ⚠️ Antes del primer despliegue: el dominio

`public/CNAME` apunta a `jcatelier.com`. Ese archivo le dice a GitHub Pages que
use ese dominio, y **si el dominio todavía no está comprado y apuntando, el sitio
queda inaccesible**: la URL `*.github.io` redirige al dominio y el dominio no
resuelve.

Hay dos caminos:

1. **Comprar el dominio primero** (recomendado). Apunta los registros DNS a
   GitHub Pages, ajusta `site.domain` en `src/data/site.ts` y listo.
2. **Publicar sin dominio propio**: borra `public/CNAME`. Ojo que entonces el
   sitio vive en `usuario.github.io/jcla_webpage/`, lo que exige configurar
   `basePath` en `next.config.ts` y prefijar las rutas de `images.manifest.json`.
   Por eso conviene tener el dominio antes.

### Sobre `public/.nojekyll`

Jekyll solo se ejecuta cuando Pages publica directamente desde una rama; con
despliegue por Actions el artefacto se sirve tal cual, así que el archivo no es
imprescindible hoy. Se conserva como seguro por si alguna vez se vuelve al
despliegue desde rama, porque sin él Jekyll ignoraría el directorio `_next`.

Para que llegue al artefacto, el workflow pasa `include-hidden-files: true` a
`upload-pages-artifact`: por defecto esa action excluye todo archivo que empiece
por punto.

## Pendientes

- [ ] **Ciudad y zona exactas en Guatemala** — `src/data/site.ts` tiene valores
      provisionales. Son necesarios para el SEO local y el JSON-LD.
- [ ] **Horarios reales** de atención (los actuales son un supuesto).
- [ ] **Dominio definitivo** y su CNAME.
- [ ] **Logo vectorial** de JC Atelier. Hoy el header usa un wordmark de texto
      con el motivo de regla del flyer; ver el `TODO` en
      `src/components/layout/Navbar.tsx`.
- [ ] **Precios "desde"** por servicio, opcional pero suben la conversión.
- [ ] **Fotos de Guatemala** — el portafolio actual es trabajo del taller en Los
      Ángeles.
- [ ] Decidir si se conserva la propiedad de Google Analytics heredada
      (`G-WSXRY7V3D6`) o se crea una nueva para JC Atelier.

## Historia

Este repositorio contenía **J&C LA Studios**, un sitio estático (HTML + jQuery)
de un taller B2B en Los Ángeles que hacía patronaje, muestras y producción para
marcas, con un backend Express aparte para el formulario de contacto. Todo eso
está en el historial de git; el commit `280de1a` es el último del sitio anterior.
