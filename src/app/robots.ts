import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * /robots.txt を動的生成する。
 *
 * - production 環境: クロール・インデックスを許可
 * - それ以外（preview / staging / development）: noindex で保護
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = env.NODE_ENV === "production";

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${env.APP_URL}/sitemap.xml`,
  };
}
