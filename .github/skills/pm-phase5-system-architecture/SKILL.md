---
name: pm-phase5-system-architecture
description: 第5段階でシステム構成図を作成する。クライアント、サーバー、データストア、外部サービス、信頼境界を整理するときに使う。
---

# System Architecture

- 出力は Mermaid `flowchart LR` を優先する。
- コンポーネントは `Client / App / Data / External` の層で整理する。
- 認証、課金、通知などの外部依存は境界を分けて書く。
- 図の下に主要データフローと障害点を箇条書きで補足する。
