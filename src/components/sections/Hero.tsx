import { image } from "@/data/gallery";
import { site } from "@/data/site";
import { getDictionary, path, type Locale } from "@/i18n";
import { whatsappUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Ruler } from "@/components/ui/Ruler";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-cream-100">
      {/* Mancha de color que empuja la vista hacia la foto. Va muy diluida
          y desplazada hacia abajo para no teñir el borde del header. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-24 h-[36rem] w-[36rem] rounded-full bg-brand-100/45 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="lg:col-span-6">
          <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
            {dict.hero.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
            {dict.hero.title}
          </h1>

          <Ruler className="mt-6 w-40" />

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {dict.hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={whatsappUrl(dict.whatsapp.fittingIntro)}
              size="lg"
              icon="whatsapp"
              className="w-full sm:w-auto"
            >
              {dict.hero.ctaPrimary}
            </ButtonLink>

            <ButtonLink
              href={path("services", locale)}
              variant="outline"
              size="lg"
              icon="arrowRight"
              iconAfter
              className="w-full sm:w-auto"
            >
              {dict.hero.ctaSecondary}
            </ButtonLink>
          </div>

          <p className="mt-7 flex items-center gap-2.5 text-sm text-ink-faint">
            <Icon name="check" size={17} className="shrink-0 text-brand-600" />
            <span>
              <strong className="font-semibold text-ink-soft">
                +{site.experienceYears} {dict.trust.experience}
              </strong>
              {" · "}
              {dict.trust.homeService} ({dict.trust.homeServiceNote.toLowerCase()})
            </span>
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-brand-900/10">
            <Photo
              asset={image("taller")}
              alt={dict.hero.imageAlt}
              sizes="(min-width: 1024px) 46vw, 100vw"
              priority
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
