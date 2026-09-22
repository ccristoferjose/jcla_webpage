import type { MetadataRoute } from "next";
import { site } from "@/data/site";

/* El export estático necesita que la ruta se declare estática de forma explícita. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
