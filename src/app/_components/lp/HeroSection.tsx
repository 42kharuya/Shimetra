import { LP_CONTENT } from "./content";
import { LeadCaptureDialog } from "./LeadCaptureDialog";

/**
 * HeroSection — 誰向けの価値かを最初に伝えるセクション
 * CTA: 先行利用に登録する
 */
export function HeroSection() {
  const { hero } = LP_CONTENT;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h1
        className="mx-auto max-w-2xl text-4xl font-bold leading-tight sm:text-5xl"
        style={{
          color: "#222222",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {hero.heading}
      </h1>
      <p
        className="mx-auto mt-6 max-w-xl text-base leading-relaxed"
        style={{ color: "#6a6a6a", fontWeight: 500 }}
      >
        {hero.subCopy}
      </p>
      <div className="mt-10">
        <LeadCaptureDialog label={hero.ctaLabel} ctaLocation="hero" />
      </div>
      <p className="mt-4 text-sm" style={{ color: "#6a6a6a" }}>
        {hero.note}
      </p>
    </section>
  );
}
