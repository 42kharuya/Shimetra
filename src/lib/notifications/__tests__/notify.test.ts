/**
 * src/lib/notifications/__tests__/notify.test.ts
 *
 * 通知ロジックのユニットテスト（DB・メール送信不要な純粋関数のみ）
 *
 * 実行: npx tsx src/lib/notifications/__tests__/notify.test.ts
 *
 * テスト対象:
 *  - offsetLabel: オフセット分数 → 表示ラベルの変換
 *  - buildNotificationHtml: メール件名・HTML・テキストの生成
 *  - 定数: OFFSETS_FREE / OFFSETS_PRO / CRON_WINDOW_MINUTES
 *
 * === 手動確認手順（DB 結合が必要なもの） ===
 *
 * 1. CRON_SECRET 認証テスト
 *    a. CRON_SECRET を .env に設定した状態で以下を実行:
 *       curl -X POST http://localhost:3000/api/cron/notify \
 *         -H "Authorization: Bearer <正しいシークレット>"
 *       → { ok: true, result: { processed, sent, failed, skipped } } が返ること
 *    b. シークレットを間違えた場合:
 *       → 401 Unauthorized が返ること
 *    c. CRON_SECRET 未設定の場合:
 *       → 500 が返ること
 *
 * 2. 重複防止テスト
 *    a. 同一 (deadline_item_id, offset_minutes) で 2 回 Cron を実行する
 *       → 2 回目は notification_delivery.status が変わらず、sent 数が 0 になること
 *
 * 3. Free プラン通知テスト
 *    a. subscriptions レコードなし（Free ユーザー）に対して Cron を実行する
 *       → offset_minutes=1440（24h）の通知のみ送信されること
 *       → pro オフセット（4320/180）の通知が作成されないこと
 *
 * 4. Pro プラン通知テスト
 *    a. plan="pro", status="active" のユーザーに対して Cron を実行する
 *       → offset_minutes=4320/1440/180 の通知がそれぞれ送信されること
 *
 * 5. 送信失敗テスト
 *    a. EMAIL_PROVIDER=resend かつ無効な RESEND_API_KEY を設定して Cron を実行する
 *       → notification_delivery.status が "failed" になること
 *       → notification_delivery.error にエラーメッセージが入ること
 *
 * 6. ウィンドウ外スキップテスト
 *    a. deadline_at が 100 時間後のアイテムに対して Cron を実行する
 *       → 通知が作成されないこと（どのオフセットもウィンドウ外）
 */

import assert from "node:assert/strict";
import {
  offsetLabel,
  buildNotificationHtml,
  OFFSETS_FREE,
  OFFSETS_PRO,
  CRON_WINDOW_MINUTES,
} from "../notify";

async function runAll() {
  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => void | Promise<void>) {
    try {
      await fn();
      console.log(`  ✓ ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ ${name}`);
      console.error("   ", err instanceof Error ? err.message : err);
      failed++;
    }
  }

  console.log("\n通知ロジック テスト\n");

  // --- 定数チェック ---
  await test("OFFSETS_FREE は [1440] である", () => {
    assert.deepEqual(OFFSETS_FREE, [1440]);
  });

  await test("OFFSETS_PRO は [4320, 1440, 180] である", () => {
    assert.deepEqual(OFFSETS_PRO, [4320, 1440, 180]);
  });

  await test("CRON_WINDOW_MINUTES は 10 である", () => {
    assert.equal(CRON_WINDOW_MINUTES, 10);
  });

  // --- offsetLabel ---
  await test("offsetLabel(4320) は '72時間' を返す", () => {
    assert.equal(offsetLabel(4320), "72時間");
  });

  await test("offsetLabel(1440) は '24時間' を返す", () => {
    assert.equal(offsetLabel(1440), "24時間");
  });

  await test("offsetLabel(180) は '3時間' を返す", () => {
    assert.equal(offsetLabel(180), "3時間");
  });

  await test("offsetLabel(60) は '60分' を返す（未定義値のフォールバック）", () => {
    assert.equal(offsetLabel(60), "60分");
  });

  // --- buildNotificationHtml ---
  await test("buildNotificationHtml: subject に企業名・オフセットラベルが含まれる", () => {
    const result = buildNotificationHtml({
      companyName: "テスト株式会社",
      kind: "es",
      deadlineAt: new Date("2026-03-18T15:00:00Z"), // UTC → JST 2026-03-19 00:00
      offsetMinutes: 1440,
      appUrl: "http://localhost:3000",
    });
    assert.ok(result.subject.includes("テスト株式会社"), "subject に企業名がない");
    assert.ok(result.subject.includes("24時間"), "subject にオフセットラベルがない");
    assert.ok(result.subject.includes("ES"), "subject に種別がない");
  });

  await test("buildNotificationHtml: html にダッシュボードリンクが含まれる", () => {
    const result = buildNotificationHtml({
      companyName: "テスト株式会社",
      kind: "interview",
      deadlineAt: new Date("2026-03-18T15:00:00Z"),
      offsetMinutes: 180,
      appUrl: "https://example.com",
    });
    assert.ok(result.html.includes("https://example.com/dashboard"), "html にダッシュボードリンクがない");
    assert.ok(result.html.includes("3時間"), "html にオフセットラベルがない");
  });

  await test("buildNotificationHtml: text が生成される", () => {
    const result = buildNotificationHtml({
      companyName: "テスト株式会社",
      kind: "briefing",
      deadlineAt: new Date("2026-03-18T15:00:00Z"),
      offsetMinutes: 4320,
      appUrl: "http://localhost:3000",
    });
    assert.ok(result.text.length > 0, "text が空");
    assert.ok(result.text.includes("72時間"), "text にオフセットラベルがない");
  });

  await test("buildNotificationHtml: deadline_at の JST 表示が正しい", () => {
    // UTC 2026-03-18 15:00:00 → JST 2026-03-19 00:00
    const result = buildNotificationHtml({
      companyName: "テスト株式会社",
      kind: "other",
      deadlineAt: new Date("2026-03-18T15:00:00Z"),
      offsetMinutes: 1440,
      appUrl: "http://localhost:3000",
    });
    // JST: 2026-03-19 00:00 が html に含まれること
    assert.ok(result.html.includes("2026-03-19 00:00"), `JST 変換が正しくない: ${result.html}`);
  });

  // --- まとめ ---
  console.log(`\n結果: ${passed} 件成功, ${failed} 件失敗\n`);
  if (failed > 0) process.exit(1);
}

runAll().catch((err) => {
  console.error("テスト実行エラー:", err);
  process.exit(1);
});
