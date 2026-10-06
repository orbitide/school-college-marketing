"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ExternalLink, Menu, Search } from "lucide-react";
import { Avatar } from "@/components/product/ui";
import { Modal } from "@/components/product/modal";
import { Sidebar } from "@/components/product/sidebar";
import { institution } from "@/content/product/data";
import { actions, overviewLive, useLive, useRelativeTime } from "@/lib/live";
import { roles, useRole } from "@/lib/role";

export function Topbar() {
  const { role, setRole } = useRole();
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const live = useLive();
  const rel = useRelativeTime();
  const o = overviewLive(live);
  const alerts = [
    o.pendingApprovals > 0 && { text: `${o.pendingApprovals} applications are waiting for approval`, href: "/app/admissions?stage=Pending+approval" },
    o.notSubmitted.length > 0 && { text: `${o.notSubmitted.length} sections have not submitted attendance`, href: "/app/attendance?register=Not+submitted" },
    o.conflicts > 0 && { text: `${o.conflicts} timetable conflicts need resolving`, href: "/app/timetable" },
  ].filter(Boolean) as { text: string; href: string }[];

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-surface px-3 sm:px-5">
      <button type="button" aria-label="Open navigation" onClick={() => setMenu(true)} className="rounded-md p-2 hover:bg-muted lg:hidden">
        <Menu className="size-5" aria-hidden />
      </button>

      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/app/students?q=${encodeURIComponent(q)}`);
        }}
        className="relative hidden max-w-md flex-1 sm:block"
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <label htmlFor="global-q" className="sr-only">Search students</label>
        <input id="global-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students by name or ID" className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25" />
      </form>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only text-muted-foreground md:not-sr-only">View as</span>
          <select value={role} onChange={(e) => setRole(e.target.value as typeof role)} className="h-9 rounded-md border border-border-strong bg-surface px-2 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/25">
            {roles.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </label>

        <details className="relative">
          <summary aria-label={live.unread ? `Notifications, ${live.unread} new` : "Notifications"} onClick={() => actions.markRead()} className="relative flex cursor-pointer list-none rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden">
            <Bell className="size-5" aria-hidden />
            {live.unread > 0 && <span className="tnum absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[0.625rem] font-bold leading-4 text-white ring-2 ring-surface">{Math.min(live.unread, 9)}{live.unread > 9 ? "+" : ""}</span>}
          </summary>
          <div className="panel absolute right-0 top-full z-50 mt-2 w-[min(22rem,calc(100vw-1.5rem))] p-1.5 shadow-md">
            <p className="px-3 py-2 text-sm font-semibold">Needs your attention</p>
            <ul>
              {alerts.map((a) => (
                <li key={a.text}>
                  <Link href={a.href} className="block rounded-md px-3 py-2 hover:bg-muted">
                    <span className="block text-sm">{a.text}</span>
                    
                  </Link>
                </li>
              ))}
            </ul>
            <p className="px-3 pb-1 pt-3 text-sm font-semibold">Recent activity</p>
            <ul>
              {live.activity.slice(0, 4).map((a) => (
                <li key={a.id} className="px-3 py-2"><span className="block text-sm leading-snug">{a.text}</span><span className="text-xs text-muted-foreground">{rel(a)}</span></li>
              ))}
            </ul>
          </div>
        </details>

        <details className="relative">
          <summary aria-label="SK, account menu" className="flex cursor-pointer list-none rounded-full [&::-webkit-details-marker]:hidden">
            <Avatar name="Salma Khatun" />
          </summary>
          <div className="panel absolute right-0 top-full z-50 mt-2 w-56 p-1.5 shadow-md">
            <div className="px-3 py-2">
              <p className="text-sm font-semibold">Salma Khatun</p>
              <p className="text-xs text-muted-foreground">{institution.name}</p>
            </div>
            <hr className="my-1" />
            <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"><ExternalLink className="size-4" aria-hidden /> Back to the website</Link>
          </div>
        </details>
      </div>

      <Modal open={menu} onClose={() => setMenu(false)} title="Navigation" variant="drawer-left">
        <div className="-mx-5 -my-4 h-full">
          <Sidebar onNavigate={() => setMenu(false)} />
        </div>
      </Modal>
    </header>
  );
}
