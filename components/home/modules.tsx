import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/editorial/section";
import { ModuleIndex } from "@/components/editorial/module-index";

export function Modules() {
  return (
    <Section id="modules" label="Contents" title="Eight modules, one record" intro="Your team enters data once. Every module reads from the same student, class and fee records.">
      <ModuleIndex />
      <p className="mt-8">
        <Link href="/features" className="link-underline inline-flex items-center gap-2 font-semibold text-primary">
          Read about every module <ArrowRight className="size-4" aria-hidden />
        </Link>
      </p>
    </Section>
  );
}
