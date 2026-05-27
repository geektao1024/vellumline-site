'use client';

import { AppAwareLink, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { IconShell, SectionHeading } from './section-primitives';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const itemCount = section.items?.length ?? 0;

  return (
    <section
      id={section.id}
      className={cn('relative py-14 md:py-20', section.className, className)}
    >
      <div className="via-border pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="container space-y-10 md:space-y-16">
        <ScrollAnimation>
          <SectionHeading
            label={section.label}
            title={section.title}
            description={section.description}
          />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div
            className={cn(
              'relative mx-auto grid gap-4 sm:grid-cols-2',
              itemCount === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            )}
          >
            {section.items?.map((item, idx) => {
              const isTonal = idx === 0 || idx === 3;

              return (
                <article
                  className={cn(
                    'group border-border/60 hover:border-primary/35 hover:bg-accent/15 relative min-h-[13rem] overflow-hidden rounded-[var(--radius-panel)] border p-6 shadow-sm backdrop-blur-sm transition-colors lg:p-7',
                    isTonal ? 'bg-card/45' : 'bg-card/30',
                    isTonal &&
                      'before:from-primary/40 before:via-primary/10 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:to-transparent after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:h-28 after:w-28 after:bg-[radial-gradient(circle_at_100%_100%,oklch(72%_0.16_47_/_0.12),transparent_70%)]'
                  )}
                  key={idx}
                >
                  <div className="relative flex items-center gap-3">
                    <IconShell
                      name={item.icon as string}
                      size={17}
                      className="bg-background/60"
                    />
                    <h3 className="text-sm leading-snug font-semibold">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground relative mt-5 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </ScrollAnimation>

        {section.buttons && section.buttons.length > 0 && (
          <ScrollAnimation delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-3">
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
                    {button.icon && <SmartIcon name={button.icon as string} />}
                    <span>{button.title}</span>
                  </AppAwareLink>
                </Button>
              ))}
            </div>
          </ScrollAnimation>
        )}
      </div>
    </section>
  );
}
