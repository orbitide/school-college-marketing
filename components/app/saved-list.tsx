"use client";

import Link from "next/link";
import { SaveButton } from "@/components/app/save-button";
import { questionById } from "@/content/learn/questions";
import { useSaved } from "@/lib/saved";

export function SavedList() {
  const { ids } = useSaved();
  const items = ids.map((id) => questionById(id)).filter((q) => !!q);

  if (!items.length) {
    return <p className="text-sm text-muted-foreground">Nothing saved yet. Tap the bookmark on any problem to keep it here.</p>;
  }
  return (
    <ul className="divide-y">
      {items.map((q) => (
        <li key={q!.id} className="flex items-center justify-between gap-3 py-3">
          <Link href={`/solve/${q!.id}`} className="font-medium hover:text-primary">{q!.title}</Link>
          <SaveButton id={q!.id} compact />
        </li>
      ))}
    </ul>
  );
}
