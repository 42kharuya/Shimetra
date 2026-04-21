import { LP_CONTENT } from "./content";

/**
 * ProblemSection — 課題共感を作るセクション（ダーク背景）
 */
export function ProblemSection() {
  const { problem } = LP_CONTENT;

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
          {problem.heading}
        </h2>
        <ul className="mx-auto mt-10 max-w-lg space-y-4">
          {problem.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-[14px] border p-5 text-base leading-relaxed"
              style={{
                color: "#222222",
                backgroundColor: "#ffffff",
                borderColor: "#dddddd",
                fontWeight: 500,
              }}
            >
              <span
                className="mt-0.5 flex-shrink-0 text-sm font-semibold"
                style={{ color: "#ff385c" }}
                aria-hidden="true"
              >
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
