'use client';

import { ArrowRight } from 'lucide-react';

import { AppAwareLink, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { IconShell, SectionHeading } from './section-primitives';

const fallbackStepIcons = ['Search', 'Palette', 'Route', 'Download'];

export function FeaturesStep({
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
        'border-border/45 relative overflow-hidden border-y py-14 md:py-20',
        section.className,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,oklch(72%_0.16_47_/_0.08),transparent_34rem)]" />
      <div className="m-4 rounded-[var(--radius-sheet)]">
        <div className="@container relative container">
          <ScrollAnimation>
            <SectionHeading
              label={section.label}
              title={section.title}
              description={section.description}
            />
          </ScrollAnimation>

          <ScrollAnimation delay={0.2}>
            <div className="mt-12 grid gap-4 md:mt-14 @3xl:grid-cols-4">
              {section.items?.map((item, idx) => (
                <article
                  className="group border-border/60 bg-card/35 hover:border-primary/40 hover:bg-accent/15 relative min-h-[16rem] rounded-[var(--radius-panel)] border p-6 shadow-sm backdrop-blur-sm transition-colors"
                  key={idx}
                >
                  <div className="via-primary/35 pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
                  <div className="flex items-center justify-between gap-4">
                    <IconShell
                      name={(item.icon as string) || fallbackStepIcons[idx]}
                      className="bg-background/70 size-11"
                    />
                    <div
                      aria-hidden
                      className="via-primary/25 from-primary/30 h-px flex-1 bg-gradient-to-r to-transparent"
                    />
                  </div>
                  <div className="mt-10 text-center @md:text-left">
                    <h3 className="text-foreground text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mt-4 leading-relaxed text-balance">
                      {item.description}
                    </p>
                  </div>
                  {idx < (section.items?.length ?? 0) - 1 && (
                    <div className="border-primary/25 bg-background/85 text-primary absolute top-1/2 right-[-1.7rem] z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border shadow-xs backdrop-blur @3xl:flex">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </article>
              ))}
            </div>
          </ScrollAnimation>

          {section.buttons && section.buttons.length > 0 && (
            <ScrollAnimation delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {section.buttons.map((button, idx) => (
                  <Button
                    asChild
                    key={idx}
                    size={button.size || 'default'}
                    variant={button.variant || 'default'}
                    className="h-10 px-4 whitespace-nowrap"
                  >
                    <AppAwareLink
                      href={button.url || ''}
                      target={button.target || '_self'}
                    >
                      {button.icon && (
                        <SmartIcon name={button.icon as string} />
                      )}
                      <span>{button.title}</span>
                    </AppAwareLink>
                  </Button>
                ))}
              </div>
            </ScrollAnimation>
          )}
        </div>
      </div>
    </section>
  );
}
