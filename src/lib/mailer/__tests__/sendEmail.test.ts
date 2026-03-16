/**
 * sendEmail ユーティリティ 最小テスト
 * 実行: npx tsx src/lib/mailer/__tests__/sendEmail.test.ts
 *
 * テスト戦略:
 *  - consoleプロバイダは外部依存なしで検証可能 → ここで自動テスト
 *  - resendプロバイダは本番キーが必要 → 手動確認手順を PR に記載
 */

import assert from "node:assert/strict";
import { sendEmail } from "../index";

const payload = {
  to: "test@example.com",
  subject: "テスト件名",
  html: "<p>テスト本文</p>",
  text: "テスト本文",
};

async function runAll() {
  let passed = 0;
  let failed = 0;

  async function test(name: string, fn: () => Promise<void>) {
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

  console.log("\nsendEmail テスト (EMAIL_PROVIDER=console)\n");

  // consoleプロバイダで正常送信
  await test("console: ok:true を返す", async () => {
    process.env.EMAIL_PROVIDER = "console";
    const result = await sendEmail(payload);
    assert.equal(result.ok, true);
  });

  // consoleプロバイダ: messageId 付き
  await test("console: messageId が返る", async () => {
    process.env.EMAIL_PROVIDER = "console";
    const result = await sendEmail(payload);
    assert.equal(result.ok, true);
    if (result.ok) {
      assert.ok(result.messageId, "messageId が存在する");
    }
  });

  // 未知プロバイダ
  await test("未知provider: ok:false を返す", async () => {
    process.env.EMAIL_PROVIDER = "unknown_provider";
    const result = await sendEmail(payload);
    assert.equal(result.ok, false);
  });

  console.log(`\n${passed} passed, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
}

runAll();
