import Link from "next/link";
import { site } from "@/data/site";
import { getDictionary, path, type Locale, type PageKey } from "@/i18n";
import { instagramUrl, whatsappUrl } from "@/lib/whatsapp";
import { Icon } from "@/components/ui/Icon";
import { Ruler } from "@/components/ui/Ruler";

const NAV: PageKey[] = ["home", "services", "gallery", "about"];

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="bg-brand-800 text-cream-100">
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="font-display text-2xl font-bold tracking-tight">{site.name}</span>
            <Ruler className="mt-2 h-2.5 w-32 text-cream-100/40" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-cream-100/70">
              {dict.footer.about}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={whatsappUrl(dict.whatsapp.generic)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-cream-100 px-5 font-display text-sm font-medium text-brand-800 transition-colors hover:bg-white"
              >
                <Icon name="whatsapp" size={18} />
                {site.whatsapp.display}
              </a>
              <a
                href={instagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-cream-100/25 px-5 font-display text-sm transition-colors hover:border-cream-100/60 hover:bg-white/5"
              >
                <Icon name="instagram" size={18} />@{site.instagram}
              </a>
            </div>
          </div>

          <nav aria-label={dict.footer.navTitle} className="md:col-span-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-cream-100/50">
              {dict.footer.navTitle}
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((key) => (
                <li key={key}>
                  <Link
                    href={path(key, locale)}
                    className="text-[0.95rem] text-cream-100/80 transition-colors hover:text-white"
                  >
                    {dict.nav[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-cream-100/50">
              {dict.contact.hours}
            </h2>
            <dl className="mt-5 space-y-1.5 text-[0.9rem]">
              {site.hours.map((entry) => (
                <div key={entry.day} className="flex justify-between gap-4">
                  <dt className="text-cream-100/60">{dict.contact.days[entry.day]}</dt>
                  <dd className="tabular-nums text-cream-100/90">
                    {entry.open ? `${entry.open} – ${entry.close}` : dict.contact.closed}
                  </dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-8 font-display text-xs font-semibold uppercase tracking-[0.16em] text-cream-100/50">
              {dict.contact.area}
            </h2>
            <p className="mt-3 flex items-start gap-2 text-[0.9rem] leading-relaxed text-cream-100/75">
              <Icon name="pin" size={17} className="mt-0.5 shrink-0 text-cream-100/50" />
              {site.location.serviceArea.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-100/12 pt-8 text-sm text-cream-100/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <Icon name="arrowUp" size={16} />
            {dict.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
