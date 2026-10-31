import type { MetadataRoute } from "next";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

const routes = [
  "", "/features", "/solutions", ...solutions.map((s) => `/solutions/${s.slug}`), "/resources", ...resources.map((r) => `/resources/${r.slug}`),
  "/benefits", "/security", "/pricing", "/faq", "/about", "/contact", "/privacy", "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
