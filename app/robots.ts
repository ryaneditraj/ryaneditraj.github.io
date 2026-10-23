import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const allowSearch = { allow: "/" as const, disallow: ["/admin", "/portal", "/api/"] };
const blockTraining = { disallow: "/" as const };

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/portal", "/api/"] },
      { userAgent: "Googlebot", ...allowSearch },
      { userAgent: "Bingbot", ...allowSearch },
      { userAgent: "DuckDuckBot", ...allowSearch },
      { userAgent: "Applebot", ...allowSearch },
      { userAgent: "OAI-SearchBot", ...allowSearch },
      { userAgent: "ChatGPT-User", ...allowSearch },
      { userAgent: "Claude-SearchBot", ...allowSearch },
      { userAgent: "Claude-User", ...allowSearch },
      { userAgent: "PerplexityBot", ...allowSearch },
      { userAgent: "GPTBot", ...blockTraining },
      { userAgent: "ClaudeBot", ...blockTraining },
      { userAgent: "Google-Extended", ...blockTraining },
      { userAgent: "Applebot-Extended", ...blockTraining },
      { userAgent: "CCBot", ...blockTraining },
      { userAgent: "Bytespider", ...blockTraining },
      { userAgent: "meta-externalagent", ...blockTraining },
      { userAgent: "FacebookBot", ...blockTraining },
    ],
    sitemap: `${getSiteUrl()}/sitemap.xml`,
    host: getSiteUrl(),
  };
}
