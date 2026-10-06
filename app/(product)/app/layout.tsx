import type { Metadata } from "next";
import { Sidebar } from "@/components/product/sidebar";
import { Toaster } from "@/components/product/toaster";
import { Topbar } from "@/components/product/topbar";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | SchoolSuite" },
  robots: { index: false },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 border-r lg:block">
        <Sidebar />
      </aside>
      <div className="lg:pl-60">
        <Topbar />
        <main id="main" className="px-3 py-5 sm:px-6 sm:py-6">
          <div className="mx-auto max-w-[80rem]">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  );
}
