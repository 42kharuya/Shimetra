---
name: pm-phase5-api-interface-schema
description: 第5段階でAPIインターフェース定義を作成する。エンドポイント、入出力、バリデーション、エラーを実装前に固めるときに使う。
---

# API Interface Schema

- 出力は OpenAPI 風の YAML、または TypeScript の型定義で作る。
- `endpoint / method / auth / request / response / errors` を必ず含める。
- バリデーション条件と主要な失敗ケースを省略しない。
- UI と API の責務境界が分かる短い補足を付ける。
