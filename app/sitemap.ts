import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const routes = ["", "/ask", "/questions", "/subjects", "/practice", "/dashboard", "/institutions", "/features", "/pricing", "/demo", "/about", "/contact", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : ["/ask", "/institutions", "/demo"].includes(path) ? 0.9 : 0.7,
  }));
}
