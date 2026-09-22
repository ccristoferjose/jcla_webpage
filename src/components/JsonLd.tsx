/**
 * Inserta datos estructurados. El JSON se genera en build y no viene de
 * entrada del usuario, así que `dangerouslySetInnerHTML` es el mecanismo
 * correcto: React escaparía el contenido de un `<script>` normal.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
