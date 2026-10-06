"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
        <nav id="mobile-menu" aria-label="Mobile" className="absolute inset-x-0 top-full border-b border-foreground bg-background">
          <ul className="container-page">
            {nav.map((item) => (
              <li key={item.href} className="border-b last:border-b-0">
                <Link href={item.href} onClick={close} className="block py-4 font-display text-2xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="container-page grid gap-3 border-t py-5">
            <Button asChild size="lg">
              <Link href="/demo" onClick={close}>Book a demonstration</Link>
            </Button>
            <a href={`${site.appUrl}/login`} className="link-underline py-2 text-center font-semibold">
              Parent and student portal
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
