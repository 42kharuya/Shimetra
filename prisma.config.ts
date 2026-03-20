import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // CLI（prisma migrate / prisma db push / prisma studio）用
    // Cloudflare Workers Edge Runtime では使用しない（TCP 接続不可）
    // DATABASE_URL: Neon の接続文字列（.env.example 参照）
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
