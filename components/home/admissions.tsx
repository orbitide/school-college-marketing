import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/editorial/section";
import { AdmissionsProcess } from "@/components/editorial/admissions-process";

export function Admissions() {
  return (
    <Section label="Admissions" title="From enquiry to enrolled, in four clear stages" intro="Every applicant has a visible status, so nothing waits in someone's notebook.">
      <AdmissionsProcess />
      <p className="mt-8">
        <Link href="/demo" className="link-underline inline-flex items-center gap-2 font-semibold text-primary">
          See the admissions module in a demo <ArrowRight className="size-4" aria-hidden />
        </Link>
      </p>
    </Section>
  );
}
