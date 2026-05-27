'use client';

import { AppAwareLink, LazyImage, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { IconShell, SectionHeading } from './section-primitives';

export function FeaturesList({
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
        'relative overflow-x-hidden py-14 md:py-20',
        section.className,
        className
      )}
    >
      <div className="via-border pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="container overflow-x-hidden">
        <ScrollAnimation>
          <SectionHeading
            label={section.label}
            title={section.title}
            description={section.description}
          />
        </ScrollAnimation>

        {section.buttons && section.buttons.length > 0 && (
          <ScrollAnimation delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {section.buttons?.map((button, idx) => (
                <Button
                  asChild
                  key={idx}
                  variant={button.variant || 'default'}
                  size={button.size || 'default'}
                >
                  <AppAwareLink
                    href={button.url ?? ''}
                    target={button.target ?? '_self'}
                    className={cn(
                      'focus-visible:ring-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] text-sm font-semibold whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                      'h-9 px-4 py-2',
                      'bg-background/70 ring-foreground/10 hover:border-primary/40 hover:bg-accent/35 dark:ring-foreground/15 border-border/70 border shadow-xs ring-1 duration-200'
                    )}
                  >
                    {button.icon && (
                      <SmartIcon name={button.icon as string} size={20} />
                    )}
                    {button.title}
                  </AppAwareLink>
                </Button>
              ))}
            </div>
          </ScrollAnimation>
        )}

        <div className="mt-14 grid items-center gap-8 md:mt-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <ScrollAnimation direction="left">
            <div className="border-border/70 bg-card/45 relative mx-auto w-full max-w-[560px] flex-shrink-0 overflow-hidden rounded-[var(--radius-sheet)] border p-2 shadow-md backdrop-blur-sm lg:mx-0">
              <div className="border-border/50 pointer-events-none absolute inset-y-2 left-2 w-12 rounded-[var(--radius-panel)] border-r bg-[repeating-linear-gradient(-45deg,var(--color-rule-soft),var(--color-rule-soft)_1px,transparent_1px,transparent_8px)]" />
              <LazyImage
                src={section.image?.src ?? ''}
                alt={section.image?.alt ?? ''}
                className="relative h-auto w-full rounded-[var(--radius-panel)] object-cover"
              />
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.1} direction="right">
            <div className="relative grid min-w-0 grid-cols-1 gap-4 break-words sm:grid-cols-2">
              {section.items?.map((item, idx) => (
                <article
                  className={cn(
                    'group border-border/55 bg-card/30 hover:border-primary/35 hover:bg-accent/15 min-w-0 rounded-[var(--radius-panel)] border p-5 break-words shadow-xs transition-colors',
                    section.items?.length === 3 && idx === 2 && 'sm:col-span-2'
                  )}
                  key={idx}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <IconShell
                      name={item.icon as string}
                      size={16}
                      className="bg-background/60 size-9"
                    />
                    <h3 className="min-w-0 text-sm leading-snug font-semibold break-words">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-4 min-w-0 text-sm leading-relaxed break-words">
                    {item.description ?? ''}
                  </p>
                </article>
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
