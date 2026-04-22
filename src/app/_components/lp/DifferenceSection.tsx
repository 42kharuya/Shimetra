import { LP_CONTENT } from "./content";

/**
 * DifferenceSection — 既存手段との違いと価値ループを示すセクション
 */
export function DifferenceSection() {
  const { difference } = LP_CONTENT;

  return (
    <section className="py-20" style={{ backgroundColor: "#ffffff" }}>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2
          className="text-3xl font-bold"
          style={{
            color: "#222222",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {difference.heading}
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-base leading-relaxed"
          style={{ color: "#6a6a6a", fontWeight: 500 }}
        >
          {difference.body}
        </p>
        {/* 価値ループ */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
          aria-label="価値ループ"
        >
          {difference.loop.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span
                className="rounded-[20px] px-4 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #dddddd",
                  color: "#222222",
                }}
              >
                {step}
              </span>
              {i < difference.loop.length - 1 && (
                <span style={{ color: "#ff385c", fontWeight: 600 }} aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
