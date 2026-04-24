import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

/**
 * /sitemap.xml を動的生成する。
 *
 * 出力するURL: / (トップ)、/lp、/terms、/privacy、/legal
 * - /lp を最高優先度 (priority: 1.0) に設定
 * - 主要ページは changeFrequency: "monthly"
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = env.APP_URL;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lp`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
