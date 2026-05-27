'use client';

import { AppAwareLink } from '@/shared/blocks/common';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Cta({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-14 md:py-20', section.className, className)}
    >
      <div className="container">
        <div className="border-border/70 bg-card/45 relative overflow-hidden rounded-[var(--radius-sheet)] border px-6 py-12 text-center shadow-lg backdrop-blur-sm md:px-10 md:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(82%_0.1_84_/_0.12),transparent_30rem)]" />
          <div className="via-primary/45 pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
          <ScrollAnimation>
            <div className="relative mx-auto max-w-3xl text-balance">
              {section.label && (
                <span className="border-primary/25 bg-primary/10 text-primary inline-flex items-center rounded-[var(--radius-control)] border px-3 py-1 font-mono text-xs font-semibold">
                  {section.label}
                </span>
              )}
              <h2 className="mt-4 text-3xl font-bold tracking-normal md:text-4xl lg:text-5xl">
                {section.title}
              </h2>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={0.15}>
            <p
              className="text-muted-foreground relative mx-auto mt-4 max-w-2xl leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
            />
          </ScrollAnimation>

          <ScrollAnimation delay={0.3}>
            <div className="relative mt-10 flex flex-wrap justify-center gap-3">
              {section.buttons?.map((button, idx) => (
                <Button
                  asChild
                  size={button.size || 'default'}
                  variant={button.variant || 'default'}
                  className="h-10 px-4 whitespace-nowrap"
                  key={idx}
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
        </div>
      </div>
    </section>
  );
}
