import Link from "next/link";
import {
  ArrowRight, BarChart3, Bell, CalendarClock, CalendarDays, ClipboardCheck, Clock, FileSpreadsheet, GraduationCap, Mail, MessageCircle, MessageSquareText,
  Megaphone, Receipt, UserPlus, Users, Wallet, Briefcase, BookOpenCheck, LineChart, Radio, ShieldCheck, ClipboardList, type LucideIcon,
} from "lucide-react";
import { slug } from "@/content/modules";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";
import { cn } from "@/lib/utils";

const tile = ["bg-[#d9ccff] text-[#4b2fa8]", "bg-[#ffd0de] text-[#a3254f]", "bg-[#c3e1fb] text-[#1d5aa5]", "bg-[#bfeede] text-[#126a54]"] as const;

function Heading({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-muted-foreground">{children}</p>;
}

/** Item with a coloured icon tile (left column). */
function TileItem({ href, icon: Icon, title, text, tone }: { href: string; icon: LucideIcon; title: string; text: string; tone: number }) {
  return (
    <Link href={href} className="group flex items-center gap-3.5 rounded-xl p-2 hover:bg-primary-soft/60">
      <span aria-hidden className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", tile[tone % tile.length])}><Icon className="size-5" /></span>
      <span><span className="block font-bold text-[#0b1d3a] group-hover:text-primary">{title}</span><span className="block text-sm text-muted-foreground">{text}</span></span>
    </Link>
  );
}

/** Item with a plain outline icon (key features grid). */
function PlainItem({ href, icon: Icon, title, text }: { href: string; icon: LucideIcon; title: string; text: string }) {
  return (
    <Link href={href} className="group flex items-start gap-3 rounded-lg p-2 hover:bg-primary-soft/60">
      <Icon className="mt-0.5 size-6 shrink-0 text-[#2b8a96]" aria-hidden />
      <span><span className="block font-bold text-[#0b1d3a] group-hover:text-primary">{title}</span><span className="block text-sm text-muted-foreground">{text}</span></span>
    </Link>
  );
}

/** Small product preview used as the promo card. A drawn thumbnail, not a video. */
function PromoCard() {
  return (
    <div className="flex h-full flex-col rounded-2xl bg-muted/70 p-5">
      <div aria-hidden className="rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-black/5">
        <div className="grid grid-cols-3 gap-1.5">
          {["130", "14", "৳2.0L"].map((v) => <div key={v} className="rounded-md bg-muted p-1.5"><i className="block h-1 w-6 rounded bg-border-strong" /><b className="mt-1 block text-xs">{v}</b></div>)}
        </div>
        <ul className="mt-2 space-y-1.5">
          {[["bg-danger", "w-3/4"], ["bg-danger", "w-2/3"], ["bg-warning", "w-4/5"]].map(([c, w], i) => (
            <li key={i} className="flex items-center gap-2 rounded-md border p-1.5"><i className={cn("size-2 rounded-full", c)} /><i className={cn("h-1.5 rounded bg-border-strong", w)} /><i className="ml-auto h-4 w-9 rounded border" /></li>
          ))}
        </ul>
      </div>
      <p className="mt-4 text-center text-lg font-bold text-[#0b1d3a]">See it in action</p>
      <p className="mt-1 text-center text-sm text-muted-foreground">A short demo, set up with your own classes and fee structure.</p>
      <Link href="/demo" className="mt-auto inline-flex items-center justify-center gap-2 pt-4 font-bold text-[#1d8a96] hover:underline">Book a demo <ArrowRight className="size-4" aria-hidden /></Link>
    </div>
  );
}

const pill = "inline-flex items-center gap-2 rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-foreground/80 hover:bg-primary-soft";

/** Bottom bar shared by every panel. */
function BottomBar() {
  const chan = [MessageSquareText, MessageCircle, Mail, FileSpreadsheet];
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-muted/70 px-5 py-4">
      <div>
        <ul aria-hidden className="flex gap-2">{chan.map((C, i) => <li key={i} className="flex size-10 items-center justify-center rounded-md bg-white text-primary shadow-sm"><C className="size-5" /></li>)}</ul>
        <Link href="/#integrations" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-primary">Integrations <ArrowRight className="size-4" aria-hidden /></Link>
      </div>
      <div className="flex flex-wrap gap-2.5">
        <Link href="/demo" className={cn(pill, "border-[#2b8a96] text-[#0b1d3a]")}><Clock className="size-4" aria-hidden />Book a demo</Link>
        <a href={`${site.appUrl}/signup`} className={pill}><Radio className="size-4" aria-hidden />Start free trial</a>
        <Link href="/pricing" className={pill}><Wallet className="size-4" aria-hidden />See pricing</Link>
      </div>
    </div>
  );
}

function Shell({ left, middle, leftTitle, middleTitle }: { left: React.ReactNode; middle: React.ReactNode; leftTitle: string; middleTitle: string }) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[19rem_1fr_17rem] lg:gap-0">
        <div className="lg:pr-6"><Heading>{leftTitle}</Heading><div className="mt-4 space-y-1.5">{left}</div></div>
        <div className="lg:border-x lg:px-8"><Heading>{middleTitle}</Heading><div className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">{middle}</div></div>
        <div className="lg:pl-6"><PromoCard /></div>
      </div>
      <BottomBar />
    </>
  );
}

const f = (name: string) => `/features#${slug(name)}`;

export function FeaturesPanel() {
  return (
    <Shell
      leftTitle="Product areas"
      left={
        <>
          <TileItem href={f("Administration")} icon={ClipboardList} title="Administration" text="Admissions, attendance, leave" tone={0} />
          <TileItem href={f("Finance")} icon={Wallet} title="Finance" text="Fees, invoices, collection" tone={1} />
          <TileItem href={f("Communication")} icon={Megaphone} title="Communication" text="Notices, messages, parents" tone={2} />
        </>
      }
      middleTitle="Key features"
      middle={
        <>
          <PlainItem href={f("Students")} icon={GraduationCap} title="Students" text="Profiles, guardians, documents" />
          <PlainItem href={f("Fees and payments")} icon={Wallet} title="Fees and payments" text="Dues, receipts, reminders" />
          <PlainItem href={f("Teachers and staff")} icon={Users} title="Teachers and staff" text="Records, presence, cover" />
          <PlainItem href={f("Invoices and financial reports")} icon={Receipt} title="Invoices" text="Generate and track invoices" />
          <PlainItem href={f("Admissions")} icon={UserPlus} title="Admissions" text="Applications and approvals" />
          <PlainItem href={f("Notices and announcements")} icon={Bell} title="Notices" text="Publish once, see who read it" />
          <PlainItem href={f("Attendance")} icon={CalendarClock} title="Attendance" text="Registers and absence alerts" />
          <PlainItem href={f("Exams and results")} icon={ClipboardCheck} title="Exams and results" text="Marks, grades, published results" />
          <PlainItem href={f("Timetable")} icon={CalendarDays} title="Timetable" text="Rooms and clash detection" />
          <PlainItem href={f("Student, attendance, financial and academic reports")} icon={BarChart3} title="Reports" text="Standard and custom reports" />
        </>
      }
    />
  );
}

const roleIcon: Record<string, LucideIcon> = { administrators: ShieldCheck, teachers: BookOpenCheck, students: GraduationCap, parents: Users };

export function SolutionsPanel() {
  return (
    <Shell
      leftTitle="By role"
      left={solutions.slice(0, 3).map((s, i) => <TileItem key={s.slug} href={`/solutions/${s.slug}`} icon={roleIcon[s.slug]} title={s.name} text={s.summary.split(",")[0].replace(/\.$/, "")} tone={i} />)}
      middleTitle="Also for"
      middle={
        <>
          <PlainItem href={`/solutions/${solutions[3].slug}`} icon={roleIcon.parents} title="Parents" text="Attendance, fees, results, messages" />
          <PlainItem href="/solutions" icon={Briefcase} title="All solutions" text="One view for every role" />
          <PlainItem href="/resources/enterprise" icon={LineChart} title="Multi-branch groups" text="Compare every campus" />
          <PlainItem href="/features" icon={ClipboardList} title="Every feature" text="The full product map" />
        </>
      }
    />
  );
}

const resIcon: Record<string, LucideIcon> = { enterprise: Briefcase, staff: Users, teachers: BookOpenCheck, monitoring: Radio, analytics: LineChart, reporting: BarChart3, "track-management": ClipboardCheck };

export function ResourcesPanel() {
  const first = resources.slice(0, 3);
  const rest = resources.slice(3);
  return (
    <Shell
      leftTitle="Capabilities"
      left={first.map((r, i) => <TileItem key={r.slug} href={`/resources/${r.slug}`} icon={resIcon[r.slug]} title={r.name} text={r.summary.replace(/\.$/, "")} tone={i} />)}
      middleTitle="More resources"
      middle={
        <>
          {rest.map((r) => <PlainItem key={r.slug} href={`/resources/${r.slug}`} icon={resIcon[r.slug]} title={r.name} text={r.summary.replace(/\.$/, "")} />)}
          <PlainItem href="/resources" icon={ClipboardList} title="All resources" text="Everything in one list" />
        </>
      }
    />
  );
}
