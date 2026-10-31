import { site } from "@/content/site";

const hl = "text-[#ffe94a]";

export function GradientCta() {
  return (
    <section aria-labelledby="gradient-cta-title" className="on-dark relative overflow-hidden bg-gradient-to-r from-[#2b8a96] via-[#3a76ab] to-[#1b3f73] py-20 text-center text-white sm:py-28">
      <div className="container-page">
        <h2 id="gradient-cta-title" className="mx-auto max-w-3xl text-3xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
          Your institution has <span className={hl}>potential,</span> we help you run it <span className={hl}>smoothly.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90 sm:text-xl">Manage admissions, attendance, fees and families without the stress. You&rsquo;re just one click away.</p>

        <svg aria-hidden viewBox="0 0 70 90" className="mx-auto mt-8 h-20 w-16 -rotate-6 drop-shadow-[0_0_8px_rgba(0,0,0,0.35)] sm:h-24 sm:w-20" fill="none" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10 C4 4 -4 26 16 30 C36 34 50 48 40 74" />
          <path d="M40 74 L33 63 M40 74 L51 67" />
        </svg>

        <a href={`${site.appUrl}/signup`} className="mt-4 inline-flex h-14 items-center rounded-lg bg-[#ffc400] px-8 text-base font-bold text-[#111827] shadow-lg outline-none transition-colors hover:bg-[#ffd23d] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2b8a96]">
          Let&rsquo;s make this happen, start my free trial
        </a>
      </div>
    </section>
  );
}
