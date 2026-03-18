# Analytics Spec Template（イベント/プロパティ/KPI）

このテンプレは「最小の計測」を先に決めて、実装と運用を楽にするためのものです。
本プロジェクトの実装は [docs/ANALYTICS_SPEC.md](ANALYTICS_SPEC.md) を正とします。

## 1) 北極星指標（North Star）

- 指標名: **週次アクティブユーザー（WAU）のうち締切を 1 件以上登録したユーザー数**
- 定義（1文）: 登録後 7 日以内に締切を 1 件以上作成したユーザー数（アクティベーション到達数）
- なぜこれか: 登録しただけでなく「使った」人を増やすことがリテンションと収益化の起点になるため

## 2) KPI（最初の2週間）

- アクティベーション率: $= \frac{\text{deadline を 1 件以上作成したユーザー}}{\text{signup users}}$
- 継続率（例）: $= \frac{\text{D7 active（D7 以内に再ログインしたユーザー）}}{\text{D0 cohort}}$
- 課金率（課金するなら）: $= \frac{\text{plan=pro のユーザー}}{\text{signup users}}$

## 3) イベント一覧（最低限）

| event_name | いつ発火 | 目的 | 必須プロパティ | 任意プロパティ |
| --- | --- | --- | --- | --- |
| `magic_link_sent` | マジックリンク送信完了時 | 獲得計測 | `email_hash` | `referrer` |
| `email_verified` | `/api/auth/verify` でセッション発行時 | 認証完了計測 | `user_id` | `time_to_verify_ms` |
| `deadline_created` | 締切 1 件登録完了時 | アクティベーション計測 | `user_id`, `deadline_type` | `days_until_deadline` |
| `upgrade_clicked` | アップグレードボタン押下時 | 課金意向計測 | `user_id`, `trigger_point` | `current_count` |
| `purchase_completed` | Stripe Webhook `checkout.session.completed` 受信時 | 収益計測 | `user_id`, `plan`, `amount_jpy` | `coupon` |
| `plan_cancelled` | Stripe Webhook `customer.subscription.deleted` 受信時 | チャーン計測 | `user_id`, `plan` | `reason` |

> `trigger_point` の値: `deadline_limit_reached`（11件目作成時）/ `billing_page`（課金ページ訪問時）

### utm（推奨）

流入別の効果測定をしたい場合、可能な範囲で付与します（[docs/SEO_GTM_CHECKLIST.md](SEO_GTM_CHECKLIST.md)）。

- `utm_source`: `twitter` / `zenn` / `producthunt` / `direct`
- `utm_medium`: `social` / `blog` / `cpc`
- `utm_campaign`: `launch_v1` / `feature_<機能名>`
- `utm_content`（任意）: A/B テスト用のバリアント名

### 命名ルール

- 小文字 + snake_case
- 意味が被るイベントを増やさない（迷ったら統合）
- 動詞_名詞の形を基本とする（例: `deadline_created` ○ / `newDeadline` ✗）

## 4) プライバシー/取り扱い注意

- 収集しない情報（PII/機微情報）: メールアドレスそのもの（ハッシュ化して送信）、応募企業の社名
- 保存期間: イベントログは最大 90 日（分析ツールの無料プランに準じる）
- 同意（必要なら）: 日本国内ユーザー向けのみなら Cookie 同意バナーは MVP 段階では省略可（ただしプライバシーポリシーへのリンクは必須）
