import Link from "next/link";
import { Bell, Bookmark, History, Search, UserRound } from "lucide-react";
import { DesktopNav } from "@/components/layout/main-nav";
import { Wordmark } from "@/components/layout/wordmark";
import { notifications, student } from "@/content/learn/student";

const menuItem = "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Wordmark />
          <DesktopNav />
        </div>

        <div className="flex items-center gap-1">
          <Link href="/questions" aria-label="Search questions" className="rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Search className="size-5" aria-hidden />
          </Link>

          {/* Notifications and account menus use native <details>: no client JS. */}
          <details className="group relative">
            <summary aria-label="Notifications" className="relative flex cursor-pointer list-none rounded-lg p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground [&::-webkit-details-marker]:hidden">
              <Bell className="size-5" aria-hidden />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-accent ring-2 ring-background" />
            </summary>
            <div className="panel absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] p-2 shadow-md">
              <p className="px-3 py-2 text-sm font-semibold">Notifications</p>
              <ul>
                {notifications.map((n) => (
                  <li key={n.text} className="rounded-lg px-3 py-2.5 hover:bg-muted">
                    <p className="text-sm leading-snug">{n.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{n.when}</p>
                  </li>
                ))}
              </ul>
              <p className="px-3 pb-1 pt-2 text-xs text-muted-foreground">Sample notifications</p>
            </div>
          </details>

          <details className="group relative">
            <summary aria-label="Account menu" className="flex cursor-pointer list-none rounded-full outline-none [&::-webkit-details-marker]:hidden">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary-soft font-display text-sm font-bold text-primary">
                {student.name[0]}
              </span>
            </summary>
            <div className="panel absolute right-0 top-full z-50 mt-2 w-60 p-2 shadow-md">
              <p className="px-3 py-2 text-sm font-semibold">{student.name}</p>
              <Link href="/dashboard" className={menuItem}><UserRound className="size-4" aria-hidden /> My learning</Link>
              <Link href="/dashboard#saved" className={menuItem}><Bookmark className="size-4" aria-hidden /> Saved problems</Link>
              <Link href="/dashboard#history" className={menuItem}><History className="size-4" aria-hidden /> History</Link>
              <hr className="my-1" />
              <Link href="/institutions" className={menuItem}>For schools and colleges</Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
