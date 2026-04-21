import Link from "next/link";
import { LP_CONTENT } from "./content";

/**
 * LP全体レイアウトを束ねる Server Component
 * デザイン方針: docs/DESIGN.md 参照（パーチメント系カラー + テラコッタCTA）
 */
export function LandingPage() {
  const { hero, problem, howItWorks, benefit, difference, betaCta } =
    LP_CONTENT;

  return (
    // パーチメント背景 (#f5f4ed)
    <div className="min-h-screen" style={{ backgroundColor: "#f5f4ed" }}>
      {/* ナビゲーション */}
      <header
        className="sticky top-0 z-10 border-b"
        style={{
          borderColor: "#f0eee6",
          backgroundColor: "#f5f4ed",
        }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span
            className="text-lg font-medium"
            style={{ color: "#141413", fontFamily: "Georgia, serif" }}
          >
            〆トラ
          </span>
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#c96442", color: "#faf9f5" }}
          >
            {hero.ctaLabel}
          </Link>
        </div>
      </header>

      <main>
        {/* HeroSection */}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1
            className="mx-auto max-w-2xl text-4xl font-medium leading-tight sm:text-5xl"
            style={{
              color: "#141413",
              fontFamily: "Georgia, serif",
              lineHeight: 1.1,
            }}
          >
            {hero.heading}
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: "#5e5d59" }}
          >
            {hero.subCopy}
          </p>
          <div className="mt-10">
            <Link
              href="/login"
              className="inline-block rounded-lg px-8 py-3.5 text-base font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#c96442", color: "#faf9f5" }}
            >
              {hero.ctaLabel}
            </Link>
          </div>
          <p className="mt-4 text-sm" style={{ color: "#87867f" }}>
            {hero.note}
          </p>
        </section>

        {/* ProblemSection — ダーク背景 */}
        <section
          className="py-20"
          style={{ backgroundColor: "#141413" }}
        >
          <div className="mx-auto max-w-5xl px-6">
            <h2
              className="text-center text-3xl font-medium"
              style={{
                color: "#faf9f5",
                fontFamily: "Georgia, serif",
                lineHeight: 1.2,
              }}
            >
              {problem.heading}
            </h2>
            <ul className="mx-auto mt-10 max-w-lg space-y-5">
              {problem.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "#b0aea5" }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0 text-sm"
                    style={{ color: "#c96442" }}
                  >
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HowItWorksSection */}
        <section className="py-20" style={{ backgroundColor: "#f5f4ed" }}>
          <div className="mx-auto max-w-5xl px-6">
            <h2
              className="text-center text-3xl font-medium"
              style={{
                color: "#141413",
                fontFamily: "Georgia, serif",
                lineHeight: 1.2,
              }}
            >
              {howItWorks.heading}
            </h2>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              {howItWorks.steps.map(({ number, label }) => (
                <div
                  key={number}
                  className="rounded-2xl p-6"
                  style={{
                    backgroundColor: "#faf9f5",
                    border: "1px solid #f0eee6",
                  }}
                >
                  <div
                    className="mb-4 text-3xl font-medium"
                    style={{
                      color: "#c96442",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    {number}
                  </div>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: "#4d4c48" }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BenefitSection — ダーク背景 */}
        <section className="py-20" style={{ backgroundColor: "#30302e" }}>
          <div className="mx-auto max-w-5xl px-6">
            <h2
              className="text-center text-3xl font-medium"
              style={{
                color: "#faf9f5",
                fontFamily: "Georgia, serif",
                lineHeight: 1.2,
              }}
            >
              {benefit.heading}
            </h2>
            <ul className="mx-auto mt-10 max-w-md space-y-5">
              {benefit.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "#b0aea5" }}
                >
                  <span
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "#c96442" }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DifferenceSection */}
        <section className="py-20" style={{ backgroundColor: "#f5f4ed" }}>
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2
              className="text-3xl font-medium"
              style={{
                color: "#141413",
                fontFamily: "Georgia, serif",
                lineHeight: 1.2,
              }}
            >
              {difference.heading}
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
              style={{ color: "#5e5d59" }}
            >
              {difference.body}
            </p>
            {/* 価値ループ */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              {difference.loop.map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span
                    className="rounded-full px-4 py-1.5 text-sm font-medium"
                    style={{
                      backgroundColor: "#faf9f5",
                      border: "1px solid #e8e6dc",
                      color: "#4d4c48",
                    }}
                  >
                    {step}
                  </span>
                  {i < difference.loop.length - 1 && (
                    <span style={{ color: "#c96442" }}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BetaCtaSection */}
        <section
          className="py-24 text-center"
          style={{ backgroundColor: "#141413" }}
        >
          <div className="mx-auto max-w-5xl px-6">
            <h2
              className="text-3xl font-medium sm:text-4xl"
              style={{
                color: "#faf9f5",
                fontFamily: "Georgia, serif",
                lineHeight: 1.2,
              }}
            >
              {betaCta.heading}
            </h2>
            <p
              className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
              style={{ color: "#b0aea5" }}
            >
              {betaCta.body}
            </p>
            <div className="mt-10">
              <Link
                href="/login"
                className="inline-block rounded-lg px-8 py-3.5 text-base font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#c96442", color: "#faf9f5" }}
              >
                {betaCta.ctaLabel}
              </Link>
            </div>
            <p className="mt-4 text-sm" style={{ color: "#87867f" }}>
              {betaCta.note}
            </p>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer
        className="border-t py-8 text-center text-sm"
        style={{ borderColor: "#30302e", backgroundColor: "#141413", color: "#5e5d59" }}
      >
        © 2026 〆トラ
      </footer>
    </div>
  );
}
