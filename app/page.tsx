import { site } from "@/content/site";

export default function Home() {
  return (
    <div className="container-page py-24">
      <h1 className="text-4xl font-bold">{site.name}</h1>
      <p className="mt-4 text-muted-foreground">{site.tagline}</p>
    </div>
  );
}
