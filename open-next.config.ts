import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// @opennextjs/cloudflare v1 の設定ファイル
// ビルド時: npm run build:cloudflare (opennextjs-cloudflare build)
// ローカル開発: npm run preview (opennextjs-cloudflare build && opennextjs-cloudflare preview)
// デプロイ: npm run deploy (opennextjs-cloudflare build && opennextjs-cloudflare deploy)
// see: https://opennext.js.org/cloudflare/get-started
//
// 注: defineCloudflareConfig() は内部で以下を自動設定するため引数不要
//   - edgeExternals: ["node:crypto"]
//   - default.override (cloudflare-node wrapper)
//   - middleware.external: true (cloudflare-edge wrapper)
export default defineCloudflareConfig();
