import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { site } from "@/content/site";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Analytics } from "@/components/shared/analytics";
import { JsonLd } from "@/components/shared/json-ld";
import { organizationLd, softwareApplicationLd } from "@/lib/structured-data";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import "./globals.css";

const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | School & College ERP for Bangladesh`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_BD" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${newsreader.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col"><a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <Analytics />
        <JsonLd data={organizationLd} />
        <JsonLd data={softwareApplicationLd} />
      </body>
    </html>
  );
}
