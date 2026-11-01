import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main id="main" className="flex-1 bg-gradient-to-b from-primary-soft to-surface">
        <div className="container-page py-24 text-center sm:py-32">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">We could not find that page</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/75">The link may be old or mistyped. Try one of these instead.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="xl"><Link href="/">Go to the home page</Link></Button>
            <Button asChild size="xl" variant="outline"><Link href="/features">Browse features</Link></Button>
            <Button asChild size="xl" variant="outline"><Link href="/contact">Contact us</Link></Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
