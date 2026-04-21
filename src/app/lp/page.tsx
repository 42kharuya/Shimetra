import type { Metadata } from "next";
import { LandingPage } from "@/app/_components/lp/LandingPage";

export const metadata: Metadata = {
  title: "〆トラ — 就活の迷いを、次の一手へ。",
  description:
    "価値観や興味を整理しながら、あなたに合いそうな企業候補と次の一手を提案する就活支援サービス。現在は先行案内・検証段階です。",
};

export default function LpPage() {
  return <LandingPage />;
}
