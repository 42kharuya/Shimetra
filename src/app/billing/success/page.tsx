import Link from "next/link";

/**
 * /billing/success – Stripe Checkout 成功後のリダイレクト先
 *
 * ACチェック:
 * - "Pro有効化中/完了" メッセージを表示
 * - /dashboard への導線を提供
 */
export default function BillingSuccessPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Pro プランへようこそ！
        </h1>
        <p className="mt-3 text-slate-600">
          Pro が有効化されました。締切を無制限に登録して、
          <br />
          72h / 24h / 3h 前のメール通知をご利用いただけます。
        </p>
        <p className="mt-2 text-sm text-slate-400">
          ※ 反映に数秒かかる場合があります。有効化中はしばらくお待ちください。
        </p>
        <div className="mt-8">
          <Link
            href="/dashboard"
            className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            ダッシュボードへ
          </Link>
        </div>
      </div>
    </main>
  );
}
