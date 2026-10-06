import Script from "next/script";

const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/** Plausible analytics; renders nothing unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. */
export function Analytics() {
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
