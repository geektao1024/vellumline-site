'use client';

import { AppAwareLink, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { SectionHeading } from './section-primitives';

type GuideItem = {
  title?: string;
  description?: string;
  url?: string;
  target?: string;
  icon?: unknown;
  badge?: string;
  keywords?: string[];
};

type GuideGroup = {
  title?: string;
  description?: string;
  items?: GuideItem[];
};

function GuideCard({ item }: { item: GuideItem }) {
  const iconName = typeof item.icon === 'string' ? item.icon : 'BookOpen';

  const content = (
    <>
      <div className="flex min-w-0 items-start gap-3">
        <span className="border-primary/25 bg-primary/10 text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] border">
          <SmartIcon name={iconName} size={18} />
        </span>
        <div className="min-w-0">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <h3 className="text-sm leading-snug font-semibold break-words">
              {item.title}
            </h3>
            {item.badge ? (
              <span className="border-border/70 bg-background/70 text-muted-foreground rounded-[var(--radius-control)] border px-2 py-0.5 text-[11px] leading-5 font-semibold">
                {item.badge}
              </span>
            ) : null}
          </div>
          <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {item.keywords?.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {item.keywords.map((keyword) => (
            <span
              key={keyword}
              className="bg-muted/50 text-muted-foreground rounded-[var(--radius-control)] px-2 py-1 text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      ) : null}
    </>
  );

  const className = cn(
    'group border-border/60 bg-card/35 hover:border-primary/35 hover:bg-accent/15 block h-full min-h-[14rem] rounded-[var(--radius-panel)] border p-5 shadow-xs transition-colors',
    'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none'
  );

  if (!item.url) {
    return <article className={className}>{content}</article>;
  }

  return (
    <AppAwareLink
      href={item.url}
      target={item.target || '_self'}
      className={className}
    >
      {content}
    </AppAwareLink>
  );
}

export function GuideHub({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const groups = (section.groups || []) as GuideGroup[];

  return (
    <section
      id={section.id}
      className={cn('relative py-14 md:py-20', section.className, className)}
    >
      <div className="via-border pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="container space-y-10 md:space-y-14">
        <ScrollAnimation>
          <SectionHeading
            label={section.label}
            title={section.title}
            description={section.description}
          />
        </ScrollAnimation>

        <div className="space-y-12">
          {groups.map((group, groupIndex) => (
            <ScrollAnimation key={groupIndex} delay={0.08 * groupIndex}>
              <div className="space-y-5">
                <div className="mx-auto max-w-3xl text-center">
                  {group.title ? (
                    <h2 className="text-2xl font-bold tracking-normal">
                      {group.title}
                    </h2>
                  ) : null}
                  {group.description ? (
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
                      {group.description}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items?.map((item, itemIndex) => (
                    <GuideCard key={itemIndex} item={item} />
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {section.buttons?.length ? (
          <ScrollAnimation delay={0.18}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {section.buttons.map((button, index) => (
                <Button
                  asChild
                  key={index}
                  size={button.size || 'default'}
                  variant={button.variant || 'default'}
                  className="h-10 px-4 whitespace-nowrap"
                >
                  <AppAwareLink
                    href={button.url || ''}
                    target={button.target || '_self'}
                  >
                    {typeof button.icon === 'string' ? (
                      <SmartIcon name={button.icon} />
                    ) : null}
                    <span>{button.title}</span>
                  </AppAwareLink>
                </Button>
              ))}
            </div>
          </ScrollAnimation>
        ) : null}
      </div>
    </section>
  );
}
