import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/product/ui";
import { placeholders } from "@/content/product/nav";

export function generateStaticParams() {
  return Object.keys(placeholders).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  return { title: placeholders[section]?.title ?? "Not found" };
}

export default async function PlaceholderPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const p = placeholders[section];
  if (!p) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title={p.title} description={p.summary} />
      <div className="panel max-w-2xl p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Not built in this prototype</p>
        <h2 className="mt-1 text-lg">What you will do here</h2>
        <ul className="mt-3 space-y-2">
          {p.does.map((d) => (
            <li key={d} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{d}</li>
          ))}
        </ul>
        <Button asChild variant="outline" className="mt-5"><Link href="/app/dashboard">Back to the dashboard</Link></Button>
      </div>
    </div>
  );
}
