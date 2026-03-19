# Analytics Spec（MVP）：〆トラ

## 北極星指標（North Star Metric）

- 定義：期限内に処理できた締切数（代理指標）
  - 判定：締切時刻（`deadline_at`）より前に、ステータスが「提出済」へ更新された件数
  - 算出：DBから `status_changed_at < deadline_at` を満たす件数を集計
  - 必要データ：`deadline_at`, `status`, `status_changed_at`（ユーザーIDで日次/週次に集計可能）
- 理由：締切ミス防止という価値に直結し、短期でも改善の方向性が明確

## KPI（最初の2週間）

- Signup数：`signup_users`
- Activation率：`activated_users / signup_users`
  - Activation定義：サインアップ後24時間以内に「締切アイテムを2件作成」
- D7継続率：`d7_active_users / d0_signup_users`
  - D7 Active定義（PRD準拠）：サインアップから7日目±1日（6〜8日目）にダッシュボードを1回以上閲覧
- 課金率（2週）：`paid_users / signup_users`
- 2週MRR先行指標：`paid_users * 980円`

## 最低限イベント（MVP）

命名：`snake_case`

※D7継続率をイベントで計測するため、`dashboard_viewed` を追加する

### 1) `signup`

- いつ発火：メール確認が完了し、ユーザー登録が確定したとき
- 必須プロパティ：
  - `user_id`
  - `method`（例：email_magic_link）
  - `utm_source`（任意）
  - `utm_medium`（任意）
  - `utm_campaign`（任意）

### 2) `activation`

- いつ発火：サインアップ後24時間以内に「締切アイテム2件作成」を満たした瞬間
- 必須プロパティ：
  - `user_id`
  - `definition`（固定値：two_items_within_24h）
  - `time_to_value_seconds`（任意）

算出メモ（ブレ防止）：

- `activation` は「クライアントのイベント2回カウント」で作らず、サーバー側で `created_items_within_24h >= 2` を満たしたタイミングで1回だけ確定（重複発火しない）

### 3) `dashboard_viewed`

- いつ発火：ユーザーがダッシュボード（締切一覧）を表示したとき
- 必須プロパティ：
  - `user_id`

集計メモ：

- D7継続率は `dashboard_viewed` を user_id distinct で集計（重複発火は集計側で吸収）
  - サインアップ日をD0として、D6〜D8のいずれかで `dashboard_viewed` があった user_id を d7_active_users とする

### 4) `purchase`

- いつ発火：Stripeでサブスクが `active` になったとき
- 必須プロパティ：
  - `user_id`
  - `plan`（pro_monthly）
  - `amount`（980）
  - `currency`（JPY）
  - `utm_source`（任意）
  - `utm_medium`（任意）
  - `utm_campaign`（任意）

## 注意（プライバシー）

- メモ/リンク等の本文はイベントに載せない
- メールアドレスなどのPIIをイベントに含めない
