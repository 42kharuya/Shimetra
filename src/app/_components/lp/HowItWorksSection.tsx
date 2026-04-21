import { LP_CONTENT } from "./content";

/**
 * HowItWorksSection — 価値の流れを3ステップで示すセクション
 */
export function HowItWorksSection() {
  const { howItWorks } = LP_CONTENT;

  return (
    <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
      <div className="mx-auto max-w-5xl px-6">
        <h2
          className="text-center text-3xl font-bold"
          style={{
            color: "#222222",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {howItWorks.heading}
        </h2>
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {howItWorks.steps.map(({ number, label }) => (
            <div
              key={number}
              className="rounded-[14px] p-6"
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #dddddd",
              }}
            >
              <div
                className="mb-4 text-3xl font-bold"
                style={{ color: "#ff385c" }}
                aria-label={`ステップ ${number}`}
              >
                {number}
              </div>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#222222", fontWeight: 500 }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
