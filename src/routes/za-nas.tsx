import { createFileRoute } from "@tanstack/react-router";
import terraceAsset from "@/assets/about/about-terrace.jpg";
import cuisineAsset from "@/assets/about/about-cuisine.jpg";
import coffeeAsset from "@/assets/about/about-coffee.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/lib/i18n";


export const Route = createFileRoute("/za-nas")({
  head: () => ({
    meta: [
      { title: "За нас — Дион Центар, ресторан во Скопје" },
      {
        name: "description",
        content:
          "Дион Центар — тераса покрај реката, традиционална македонска кујна со современ допир и атмосфера за секоја прилика, во срцето на Скопје.",
      },
      { property: "og:title", content: "За нас — Дион Центар" },
      {
        property: "og:description",
        content:
          "Тераса покрај реката, традиционална кујна со современ допир и атмосфера за секоја прилика, во срцето на Скопје.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function FeatureRow({
  image,
  alt,
  title,
  text,
  imageLeft,
}: {
  image: string;
  alt: string;
  title: string;
  text: string;
  imageLeft: boolean;
}) {
  const textSide = imageLeft ? "right" : "left";
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal direction={imageLeft ? "left" : "right"} className={imageLeft ? "order-1" : "order-1 lg:order-2"}>
        <div className="group relative overflow-hidden border border-border shadow-[var(--shadow-warm)]">
          <img
            src={image}
            alt={alt}
            loading="lazy"
            width={1200}
            height={900}
            className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 border border-gold/0 transition-colors duration-500 group-hover:border-gold/40"
          />
        </div>
      </Reveal>
      <Reveal
        direction={textSide}
        delay={150}
        className={imageLeft ? "order-2 lg:order-2" : "order-2 lg:order-1"}
      >
        <p className="eyebrow">Dion Centar</p>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl">{title}</h2>
        <div className="diamond-rule mt-4 justify-start" aria-hidden />
        <p className="mt-5 leading-relaxed text-muted-foreground">{text}</p>
      </Reveal>
    </div>
  );
}

function AboutPage() {
  const { t } = useLang();

  return (
    <main className="pt-20">
      {/* Вовед */}
      <section className="section-pad bg-secondary/40 px-5">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal direction="up">
            <p className="eyebrow">Dion Centar · Est. 2009</p>
            <h1 className="mt-4 font-display text-4xl sm:text-5xl">{t("aboutTitle")}</h1>
            <div className="diamond-rule mt-5" aria-hidden />
            <p className="mt-8 font-display text-2xl text-primary sm:text-3xl">{t("aboutLead")}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{t("aboutLeadText")}</p>
          </Reveal>
        </div>
      </section>

      {/* Три особини наизменично */}
      <section className="section-pad px-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-24 lg:gap-32">
          <FeatureRow
            image={terraceAsset}
            alt={t("aboutS1Title")}
            title={t("aboutS1Title")}
            text={t("aboutS1Text")}
            imageLeft={false}
          />
          <FeatureRow
            image={cuisineAsset}
            alt={t("aboutS2Title")}
            title={t("aboutS2Title")}
            text={t("aboutS2Text")}
            imageLeft
          />
          <FeatureRow
            image={coffeeAsset}
            alt={t("aboutS3Title")}
            title={t("aboutS3Title")}
            text={t("aboutS3Text")}
            imageLeft={false}
          />
        </div>
      </section>

      {/* Завршна лента */}
      <section className="bg-ink px-5 py-16 text-center text-ink-foreground">
        <Reveal direction="up">
          <p className="hero-script text-4xl text-gold sm:text-5xl">{t("aboutLead")}</p>
        </Reveal>
      </section>
    </main>
  );
}
