# Runbook Template（運用/障害対応/ロールバック）

> このテンプレートをコピーして、プロジェクト固有の `docs/RUNBOOK.md` を作成してください。
> 本プロジェクトの実際の Runbook は [docs/RUNBOOK.md](RUNBOOK.md) を参照。

## 1) 目的

- 何を守るか（最重要導線）: ログイン / コア体験 / 課金の 3 点を最優先
- 連絡先（自分/共同開発者）: <名前> <メール/Slack>
- ステータス告知先（任意: SNS/サイト）: Twitter/X または status ページ

## 2) 監視（最低限）

- 死活監視（URL/ジョブ）: UptimeRobot 等で `/` `/login` `/dashboard` を監視
- エラー監視（例: 5xx, 例外）: Vercel Logs の `level:error` フィルタ / Sentry
- 重要指標（例: signup/activation/purchase）: [docs/ANALYTICS_SPEC_TEMPLATE.md](ANALYTICS_SPEC_TEMPLATE.md) 参照

## 3) 障害レベル（目安）

- **S1（即対応 〜 15 分）**: 課金/ログイン/コア体験が全滅 → ロールバック判断
- **S2（優先対応 〜 2 時間）**: 一部ユーザー/一部機能に影響
- **S3（計画対応）**: 軽微/回避可能

## 4) 障害対応（手順）

1. 影響範囲を確認（ユーザー影響 / 期間 / 主要導線 / エラーログ）
2. 切り戻し判断（直近デプロイが原因 → 即ロールバック、それ以外 → ステップ 3 へ）
3. 暫定対応（機能フラグ OFF / メンテナンスページ表示 など）
4. 恒久対応（修正 PR → レビュー → デプロイ）
5. 告知（必要なら: 何が起きた / 回避策 / 復旧見込み）
6. ふりかえり（[docs/POSTMORTEM_TEMPLATE.md](POSTMORTEM_TEMPLATE.md)）

## 5) ロールバック手順（箇条書き）

**コードのロールバック**

- [ ] Vercel Dashboard > Deployments > 1 つ前のデプロイを選択 → **Redeploy**
- [ ] 代替: `git revert HEAD --no-edit && git push origin main`
- [ ] Vercel が **Ready** になるまで待つ（通常 1〜2 分）

**ロールバック後のスモークテスト**

- [ ] `BASE_URL=https://your-app.vercel.app bash scripts/smoke-test.sh` を実行し全 PASS を確認
- [ ] `/login` → マジックリンク送付 → メール到達を確認
- [ ] `/dashboard` が 200 で表示されることを確認
- [ ] `POST /api/stripe/webhook`（Stripe テストイベント送信）が 200 を返すことを確認
- [ ] `POST /api/cron/notify`（`Authorization: Bearer <CRON_SECRET>`）が 200 を返すことを確認

**データ整合性の確認（DB マイグレーションを戻した場合のみ）**

- [ ] `prisma migrate status` で未適用マイグレーション = ゼロを確認
- [ ] `subscriptions` テーブルで `plan` / `status` が正しいことを確認
- [ ] `notification_deliveries` で `status='failed'` の異常増加がないことを確認

## 6) バックアップ/復旧（可能な範囲で）

- バックアップ手段（自動/手動）: Supabase / Neon 等のポイントインタイムリカバリ（PITR）を確認
- 保持期間: ホスティングサービスの無料プランに準じる（例: 7 日間）
- 復旧手順（誰が/どこで/何を）: DB ホストのダッシュボードでバックアップから復元 → `prisma migrate status` で確認

## 7) データ削除依頼（最小）

- 受付窓口: [SUPPORT.md](../SUPPORT.md)
- 本人確認: 登録メールアドレスからの連絡を必須とする
- 対応手順: `users` テーブルの当該レコード + 関連 `deadlines` / `subscriptions` を削除
- 対応ログの残し方: スプレッドシートまたは Issues に「削除日・対応者・確認内容」を記録

## 8) 問い合わせ運用

- 入口: [SUPPORT.md](../SUPPORT.md)
- SLA（目安）: S1 は即日 / S2 は 1〜2 営業日 / S3 は 3〜5 営業日
- よくある質問（FAQ候補）:
  - メールが届かない → スパムフォルダ確認 / Resend ログ確認
  - 課金が反映されない → Stripe Dashboard でイベント確認 / Webhook 再送
  - 締切が消えた → DB の `deadlines` テーブルで `deleted_at` を確認
