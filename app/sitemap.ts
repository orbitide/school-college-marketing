import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/features", "/pricing", "/demo", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/demo" ? 0.9 : 0.7,
  }));
}
