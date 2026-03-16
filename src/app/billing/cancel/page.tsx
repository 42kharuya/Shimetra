import Link from "next/link";

/**
 * /billing/cancel – Stripe Checkout キャンセル後のリダイレクト先
 *
 * ACチェック:
 * - "課金キャンセル" メッセージを表示
 * - /billing への導線を提供
 */
export default function BillingCancelPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-3xl">
          ℹ️
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          課金をキャンセルしました
        </h1>
        <p className="mt-3 text-slate-600">
          購入はキャンセルされました。カードへの請求はありません。
          <br />
          必要になったらいつでも Pro にアップグレードできます。
        </p>
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="/billing"
            className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            プラン・お支払いページへ戻る
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-slate-500 underline hover:text-slate-700"
          >
            ダッシュボードへ
          </Link>
        </div>
      </div>
    </main>
  );
}
