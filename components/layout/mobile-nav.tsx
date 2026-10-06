"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b bg-background px-5 pb-5 pt-2 shadow-lift"
        >
          <ul className="flex flex-col py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-xl px-3 py-3.5 font-display text-xl font-medium hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid gap-2">
            <Button asChild size="lg" variant="accent">
              <Link href="/demo" onClick={close}>Book a demo</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`${site.appUrl}/login`}>
                <UserRound /> Parent / student portal
              </a>
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
