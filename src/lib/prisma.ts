// Cloudflare Workers では WebAssembly が禁止されているため /edge サブパスを使用
// /edge は Prisma Accelerate（HTTP経由）専用の軽量クライアント（WASM不使用）
import { PrismaClient } from "@prisma/client/edge";

// Cloudflare Edge Runtime 対応: Prisma Accelerate（HTTP経由）を使用
// DATABASE_URL には prisma://accelerate.prisma.data.net/?api_key=... を設定する
// マイグレーション実行には DIRECT_URL（直接 PostgreSQL 接続）が必要
//
// Prisma v7: accelerateUrl オプションで Accelerate を設定する（withAccelerate() 不要）
// see: https://www.prisma.io/docs/accelerate

// globalThis を使用（global は Edge Runtime で非推奨）
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  // Prisma v7: accelerateUrl オプションで Accelerate 接続を設定
  // withAccelerate() extension は不要（accelerateUrl が代替）
  return new PrismaClient({ accelerateUrl: url });
}

function getPrismaClient(): ReturnType<typeof createPrismaClient> {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

// Lazy Proxy: モジュールインポート時に PrismaClient を初期化しない。
// 初回プロパティアクセス時（実リクエスト時）に初期化することで、
// Next.js ビルド時に DATABASE_URL が未設定でもクラッシュしない。
export const prisma = new Proxy({} as ReturnType<typeof createPrismaClient>, {
  get(_target, prop: string | symbol) {
    return (getPrismaClient() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
