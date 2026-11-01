import type { MetadataRoute } from "next";
import { featurePages } from "@/content/features";
import { moduleGroups, groupHref } from "@/content/modules";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

const routes = [
  "", "/features", "/integrations", ...moduleGroups.map((g) => groupHref(g.title)), ...featurePages.map((f) => `/features/${f.slug}`), "/solutions", ...solutions.map((s) => `/solutions/${s.slug}`), "/resources", ...resources.map((r) => `/resources/${r.slug}`),
  "/pricing", "/demo", "/about", "/contact", "/privacy", "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/demo" ? 0.9 : 0.7,
  }));
}
