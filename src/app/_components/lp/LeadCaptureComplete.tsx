"use client";

/**
 * LeadCaptureComplete — 先行登録完了状態の表示
 * docs/LP.md § LeadCaptureComplete に準拠
 */

interface LeadCaptureCompleteProps {
  onClose: () => void;
}

export function LeadCaptureComplete({ onClose }: LeadCaptureCompleteProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h2
        className="text-2xl font-bold"
        style={{ color: "#222222", lineHeight: 1.2, letterSpacing: "-0.01em" }}
      >
        登録ありがとうございます
      </h2>
      <p className="text-base leading-relaxed" style={{ color: "#6a6a6a", fontWeight: 500 }}>
        〆トラは現在、先行案内・検証段階です。
        <br />
        今後、ベータ版やヒアリングのご案内を順次お送りします。
      </p>
      <p className="text-sm" style={{ color: "#6a6a6a" }}>
        就活の悩みはご入力内容を参考に改善へ活用します。
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-2 rounded-lg border px-8 py-3 text-sm font-medium transition-[transform,opacity] hover:opacity-80 active:scale-95"
        style={{ backgroundColor: "#ffffff", color: "#222222", borderColor: "#dddddd" }}
      >
        LPに戻る
      </button>
    </div>
  );
}
