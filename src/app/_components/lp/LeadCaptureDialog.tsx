"use client";

/**
 * LeadCaptureDialog — 先行登録モーダル
 *
 * 開閉状態・フォーム/完了切り替えを管理する Client Component。
 * HeroSection / BetaCtaSection のCTAボタンとして差し込む。
 *
 * docs/LP.md § LeadCaptureDialog に準拠
 */

import { useCallback, useEffect, useState } from "react";
import { LeadCaptureForm } from "./LeadCaptureForm";
import { LeadCaptureComplete } from "./LeadCaptureComplete";

/** window.dataLayer push helper */
function pushDataLayer(payload: Record<string, unknown>) {
  const win = window as Window & { dataLayer?: unknown[] };
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push(payload);
}

interface LeadCaptureDialogProps {
  /** CTA ボタンのラベル */
  label?: string;
  /** 計測用: どこのCTAから開いたか */
  ctaLocation?: "hero" | "bottom";
  /** ダークテーマ用（BetaCtaSection など） */
  dark?: boolean;
}

export function LeadCaptureDialog({
  label = "先行利用に登録する",
  ctaLocation = "hero",
  dark = false,
}: LeadCaptureDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setSubmitted(false);

    pushDataLayer({
      event:
        ctaLocation === "hero"
          ? "lp_primary_cta_clicked"
          : "lp_secondary_cta_clicked",
      cta_location: ctaLocation,
      cta_label: label,
      page_type: "lp",
    });

    pushDataLayer({
      event: "lp_waitlist_form_opened",
      open_source: ctaLocation,
      page_type: "lp",
    });
  }, [ctaLocation, label]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSuccess = useCallback(() => {
    setSubmitted(true);
  }, []);

  // ESC で閉じる
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, handleClose]);

  // 開放中はスクロールを抑制
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Airbnb: プライマリ CTA は常に Rausch (#ff385c)
  const buttonColor = "#ffffff";

  return (
    <>
      {/* トリガーボタン */}
      <button
        type="button"
        onClick={handleOpen}
        className="inline-block rounded-lg px-8 py-3.5 text-base font-medium transition-[transform,opacity] hover:opacity-90 active:scale-95"
        style={{ backgroundColor: "#ff385c", color: buttonColor }}
      >
        {label}
      </button>

      {/* モーダルオーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          aria-modal="true"
          role="dialog"
          aria-label="先行登録フォーム"
          onClick={(e) => {
            // オーバーレイ自体クリックで閉じる
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div
            className="relative w-full max-w-md rounded-[20px] p-6 sm:p-8"
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 6px 0, rgba(0,0,0,0.1) 0 4px 8px 0",
            }}
          >
            {/* 閉じるボタン */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="閉じる"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl transition-[transform,opacity] hover:opacity-70 active:scale-95"
              style={{ color: "#6a6a6a", backgroundColor: "#f7f7f7" }}
            >
              ×
            </button>

            {submitted ? (
              <LeadCaptureComplete onClose={handleClose} />
            ) : (
              <>
                <h2
                  className="mb-1 text-xl font-bold"
                  style={{
                    color: "#222222",
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  登録して案内を受け取る
                </h2>
                <p className="mb-6 text-sm" style={{ color: "#6a6a6a", fontWeight: 500 }}>
                  正式公開前の先行案内です
                </p>
                <LeadCaptureForm onSuccess={handleSuccess} />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
