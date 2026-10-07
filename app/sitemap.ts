import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/features", "/solutions", "/benefits", "/security", "/pricing", "/faq", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/contact" ? 0.9 : 0.7,
  }));
}
