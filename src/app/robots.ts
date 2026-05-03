import type { MetadataRoute } from "next";

import { getClientEnv } from "@/lib/env";

/**
 * Dynamic robots.txt. Stays in sync with `sitemap.ts` because both read
 * the canonical app URL from the same validated env source.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const { NEXT_PUBLIC_APP_URL: baseUrl } = getClientEnv();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
