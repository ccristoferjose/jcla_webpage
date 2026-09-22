import { getDictionary, type Locale } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";

/**
 * Botón flotante de WhatsApp, presente en todas las páginas.
 *
 * Va en verde de WhatsApp y no en el vino de la marca: aquí importa más
 * que se reconozca el canal de un vistazo que la coherencia cromática.
 */
export function WhatsAppFab({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <a
      href={whatsappUrl(dict.whatsapp.generic)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.whatsapp.ariaLabel}
      className={
        "fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center " +
        "rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 " +
        "transition-transform duration-200 hover:bg-[#1eb855] " +
        "motion-safe:hover:scale-105 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16"
      }
    >
      <Icon name="whatsapp" size={30} className="sm:h-8 sm:w-8" />
    </a>
  );
}
