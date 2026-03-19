import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// @opennextjs/cloudflare v1.17.1 の設定ファイル
// edgeExternals / default / middleware は v1 内部で自動設定されるため引数不要
// see: https://opennext.js.org/cloudflare/get-started
export default defineCloudflareConfig();
