import { LP_CONTENT } from "./content";

/**
 * BenefitSection — 利用後の変化を具体化するセクション（ダーク背景）
 */
export function BenefitSection() {
  const { benefit } = LP_CONTENT;

  return (
    <section className="py-20" style={{ backgroundColor: "#f7f7f7" }}>
      <div className="mx-auto max-w-5xl px-6">
        <h2
          className="text-center text-3xl font-bold"
          style={{
            color: "#222222",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {benefit.heading}
        </h2>
        <ul className="mx-auto mt-10 max-w-md space-y-4">
          {benefit.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-[14px] border p-5 text-base"
              style={{
                color: "#222222",
                backgroundColor: "#ffffff",
                borderColor: "#dddddd",
                fontWeight: 500,
              }}
            >
              <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{ backgroundColor: "#ff385c", color: "#ffffff" }}
                aria-hidden="true"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
