import Link from "next/link";
import { Check, FileSpreadsheet, Fingerprint, Mail, MessageCircle, MessageSquareText, Wallet, type LucideIcon } from "lucide-react";

// TODO: confirm each of these with the product team before launch. They are shown generically, with no third-party logos.
const nodes: { label: string; icon: LucideIcon; x: number; y: number }[] = [
  { label: "SMS", icon: MessageSquareText, x: 13, y: 33 },
  { label: "WhatsApp", icon: MessageCircle, x: 36, y: 10 },
  { label: "Email", icon: Mail, x: 66, y: 12 },
  { label: "Excel and CSV", icon: FileSpreadsheet, x: 84, y: 37 },
  { label: "Payments", icon: Wallet, x: 82, y: 63 },
  { label: "Biometric devices", icon: Fingerprint, x: 62, y: 82 },
];
const hub = { x: 42, y: 56 };

function Diagram() {
  return (
    <div className="relative mx-auto aspect-[1.05/1] w-full max-w-xl" role="img" aria-label="The platform at the centre, connected to SMS, WhatsApp, email, spreadsheets, payments and biometric devices">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full">
        {nodes.map((n) => {
          const mx = (hub.x + n.x) / 2, my = Math.min(hub.y, n.y) - 8;
          return <path key={n.label} d={`M${hub.x},${hub.y} Q${mx},${my} ${n.x},${n.y}`} fill="none" stroke="#3a9fb0" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" opacity="0.8" />;
        })}
      </svg>
      <div className="absolute flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#cdeee3] shadow-md ring-8 ring-white/60 sm:size-24" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
        <span aria-hidden className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground sm:size-14"><Check className="size-6 sm:size-8" strokeWidth={3} /></span>
      </div>
      {nodes.map((n) => (
        <span key={n.label} className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-lg bg-white/95 px-2.5 py-1.5 text-[0.6875rem] font-semibold shadow-sm ring-1 ring-black/5 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <n.icon className="size-4 text-primary sm:size-5" aria-hidden />{n.label}
        </span>
      ))}
    </div>
  );
}

export function IntegrationsSection() {
  return (
    <section id="integrations" aria-labelledby="integrations-title" className="bg-[linear-gradient(135deg,#e3f3ee_0%,#e4eefa_55%,#ebe9fb_100%)] py-16 sm:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div>
          <p className="text-base font-semibold text-primary">Integrations</p>
          <h2 id="integrations-title" className="mt-2 text-3xl font-bold leading-[1.12] tracking-tight sm:text-5xl">Connects with the tools you already use</h2>
          <p className="mt-5 max-w-md text-lg text-foreground/75">Reach parents by SMS, WhatsApp and email, export to Excel and CSV, and bring in payments and attendance devices, so the system fits how your institution already works.</p>
          <Link href="/demo" className="mt-8 inline-flex h-12 items-center rounded-lg bg-gradient-to-r from-primary to-[#2b7a8c] px-7 text-base font-semibold text-white shadow-md outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Let&rsquo;s begin</Link>
        </div>
        <Diagram />
      </div>
    </section>
  );
}
