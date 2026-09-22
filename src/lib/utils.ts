/**
 * Concatenador de clases. Se queda en el repo en vez de traer `clsx`
 * porque es lo único que se necesita de esa dependencia.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
