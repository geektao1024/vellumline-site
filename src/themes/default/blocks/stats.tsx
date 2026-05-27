'use client';

import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { IconShell, SectionHeading } from './section-primitives';

const fallbackStatIcons = ['ShieldCheck', 'MousePointerClick', 'FileDown'];

export function Stats({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn(
        'border-border/45 relative border-y py-14 md:py-20',
        section.className,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_40%,oklch(58%_0.08_230_/_0.08),transparent_26rem)]" />
      <div className="container space-y-10 md:space-y-16">
        <ScrollAnimation>
          <SectionHeading
            label={section.label}
            title={section.title}
            description={section.description}
          />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="grid gap-4 md:grid-cols-3">
            {section.items?.map((item, idx) => (
              <article
                className="border-border/60 bg-card/35 hover:border-primary/35 hover:bg-accent/15 rounded-[var(--radius-panel)] border p-6 text-left shadow-sm backdrop-blur-sm transition-colors"
                key={idx}
              >
                <div className="flex items-center gap-3">
                  <IconShell
                    name={(item.icon as string) || fallbackStatIcons[idx]}
                    size={17}
                    className="bg-background/60 size-10"
                  />
                  <h3 className="text-foreground text-sm leading-snug font-semibold">
                    {item.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-5 text-sm leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
