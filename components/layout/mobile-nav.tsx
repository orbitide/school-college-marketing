"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nav } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

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
          className="absolute inset-x-0 top-full border-b bg-background px-4 pb-4 shadow-lg"
        >
          <ul className="flex flex-col py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="w-full">
            <Link href="/demo" onClick={() => setOpen(false)}>
              Book a demo
            </Link>
          </Button>
        </nav>
      )}
    </div>
  );
}
