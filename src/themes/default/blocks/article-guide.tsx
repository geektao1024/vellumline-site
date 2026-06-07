import { AppAwareLink, SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

type GuideButton = {
  title?: string;
  url?: string;
  target?: string;
  icon?: unknown;
  variant?: string;
};

type GuideLink = GuideButton & {
  description?: string;
};

function HtmlText({
  value,
  className,
}: {
  value?: string;
  className?: string;
}) {
  if (!value) {
    return null;
  }

  return (
    <p
      className={className}
      dangerouslySetInnerHTML={{
        __html: value,
      }}
    />
  );
}

function GuideCta({ button }: { button: GuideButton }) {
  if (!button.title || !button.url) {
    return null;
  }

  const iconName = typeof button.icon === 'string' ? button.icon : undefined;

  return (
    <AppAwareLink
      href={button.url}
      target={button.target || '_self'}
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-[var(--radius-control)] border px-4 text-sm font-semibold transition-colors',
        button.variant === 'outline'
          ? 'border-border/70 bg-background/70 text-foreground hover:border-primary/40 hover:bg-accent/35'
          : 'border-primary/70 bg-primary text-primary-foreground hover:bg-primary/90'
      )}
    >
      {iconName ? <SmartIcon name={iconName} size={18} /> : null}
      <span>{button.title}</span>
    </AppAwareLink>
  );
}

function LinkListCard({ item }: { item: GuideLink }) {
  const iconName = typeof item.icon === 'string' ? item.icon : undefined;

  return (
    <article className="border-border/60 bg-card/35 hover:border-primary/35 hover:bg-accent/15 rounded-[var(--radius-panel)] border p-5 transition-colors">
      <div className="flex items-start gap-3">
        {iconName ? (
          <span className="border-primary/25 bg-primary/10 text-primary inline-flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] border">
            <SmartIcon name={iconName} size={16} />
          </span>
        ) : null}
        <div className="min-w-0">
          <h3 className="text-sm leading-snug font-semibold">
            {item.url ? (
              <AppAwareLink href={item.url} target={item.target || '_self'}>
                {item.title}
              </AppAwareLink>
            ) : (
              item.title
            )}
          </h3>
          {item.description ? (
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ArticleGuide({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const toc = section.toc?.items || [];
  const reasons = section.why?.items || [];
  const rows = section.comparison?.rows || [];
  const columns = section.comparison?.columns || [];
  const steps = section.steps?.items || [];
  const faqItems = section.faq?.items || [];
  const relatedLinks = section.related_links?.items || [];
  const sources = section.sources?.items || [];

  return (
    <article
      id={section.id}
      className={cn('relative overflow-x-hidden py-12 md:py-16', className)}
    >
      <div className="container">
        <div className="mx-auto max-w-5xl">
          <header className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start">
            <div>
              {section.label ? (
                <span className="border-primary/25 bg-primary/10 text-primary inline-flex rounded-[var(--radius-control)] border px-3 py-1 font-mono text-xs font-semibold">
                  {section.label}
                </span>
              ) : null}

              <h1 className="mt-5 text-4xl leading-tight font-bold tracking-normal text-balance md:text-5xl">
                {section.title}
              </h1>

              <HtmlText
                value={section.description}
                className="text-muted-foreground mt-5 max-w-3xl text-base leading-relaxed md:text-lg"
              />

              {section.disclaimer ? (
                <p className="border-border/70 bg-card/35 text-muted-foreground mt-5 rounded-[var(--radius-panel)] border p-4 text-sm leading-relaxed">
                  {section.disclaimer}
                </p>
              ) : null}

              {section.buttons?.length ? (
                <div className="mt-7 flex flex-wrap gap-3">
                  {section.buttons.map((button, index: number) => (
                    <GuideCta key={index} button={button} />
                  ))}
                </div>
              ) : null}
            </div>

            <aside className="border-border/60 bg-card/35 rounded-[var(--radius-panel)] border p-5">
              {section.tldr?.title ? (
                <h2 className="text-sm font-semibold">{section.tldr.title}</h2>
              ) : null}
              <HtmlText
                value={section.tldr?.description}
                className="text-muted-foreground mt-3 text-sm leading-relaxed"
              />

              {toc.length > 0 ? (
                <nav aria-label="Guide contents" className="mt-6">
                  <h2 className="text-sm font-semibold">Contents</h2>
                  <ol className="mt-3 space-y-2 text-sm">
                    {toc.map((item: GuideLink, index: number) => (
                      <li key={index}>
                        <AppAwareLink
                          href={item.url || '#'}
                          className="text-muted-foreground hover:text-primary inline-flex items-start gap-2"
                        >
                          <span className="text-primary font-mono text-xs">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{item.title}</span>
                        </AppAwareLink>
                      </li>
                    ))}
                  </ol>
                </nav>
              ) : null}
            </aside>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
            <div className="min-w-0 space-y-12">
              {section.what ? (
                <section id={section.what.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-normal">
                    {section.what.title}
                  </h2>
                  <HtmlText
                    value={section.what.description}
                    className="text-muted-foreground mt-4 text-base leading-relaxed"
                  />
                </section>
              ) : null}

              {section.why ? (
                <section id={section.why.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-normal">
                    {section.why.title}
                  </h2>
                  <HtmlText
                    value={section.why.description}
                    className="text-muted-foreground mt-4 text-base leading-relaxed"
                  />

                  {reasons.length > 0 ? (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {reasons.map((item: GuideLink, index: number) => (
                        <LinkListCard key={index} item={item} />
                      ))}
                    </div>
                  ) : null}
                </section>
              ) : null}

              {section.comparison ? (
                <section id={section.comparison.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-normal">
                    {section.comparison.title}
                  </h2>
                  <HtmlText
                    value={section.comparison.description}
                    className="text-muted-foreground mt-4 text-base leading-relaxed"
                  />

                  {columns.length > 0 && rows.length > 0 ? (
                    <div className="border-border/70 mt-6 overflow-x-auto rounded-[var(--radius-panel)] border">
                      <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                        <thead className="bg-card/60 text-foreground">
                          <tr>
                            {columns.map((column: string, index: number) => (
                              <th
                                key={index}
                                className="border-border/60 border-b px-4 py-3 font-semibold"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.map((row: any, rowIndex: number) => (
                            <tr
                              key={rowIndex}
                              className="border-border/50 border-b last:border-b-0"
                            >
                              {(row.cells || []).map(
                                (cell: string, cellIndex: number) => (
                                  <td
                                    key={cellIndex}
                                    className="text-muted-foreground px-4 py-4 align-top leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: cell }}
                                  />
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </section>
              ) : null}

              {section.steps ? (
                <section id={section.steps.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-normal">
                    {section.steps.title}
                  </h2>
                  <HtmlText
                    value={section.steps.description}
                    className="text-muted-foreground mt-4 text-base leading-relaxed"
                  />

                  {steps.length > 0 ? (
                    <ol className="mt-6 space-y-4">
                      {steps.map((step: GuideLink, index: number) => (
                        <li
                          key={index}
                          className="border-border/60 bg-card/30 rounded-[var(--radius-panel)] border p-5"
                        >
                          <div className="flex gap-4">
                            <span className="border-primary/30 text-primary flex size-9 shrink-0 items-center justify-center rounded-full border font-mono text-xs font-semibold">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="text-sm font-semibold">
                                {step.title}
                              </h3>
                              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </section>
              ) : null}

              {faqItems.length > 0 ? (
                <section id={section.faq.id} className="scroll-mt-24">
                  <h2 className="text-2xl font-bold tracking-normal">
                    {section.faq.title}
                  </h2>
                  <div className="mt-6 space-y-4">
                    {faqItems.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="border-border/60 bg-card/30 rounded-[var(--radius-panel)] border p-5"
                      >
                        <h3 className="text-sm font-semibold">
                          {item.question}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24">
              {relatedLinks.length > 0 ? (
                <section className="border-border/60 bg-card/35 rounded-[var(--radius-panel)] border p-4">
                  <h2 className="text-sm font-semibold">
                    {section.related_links?.title || 'Related guides'}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {relatedLinks.map((item: GuideLink, index: number) => (
                      <AppAwareLink
                        key={index}
                        href={item.url || '#'}
                        target={item.target || '_self'}
                        className="hover:border-primary/35 hover:bg-accent/15 border-border/50 block rounded-[var(--radius-control)] border p-3 transition-colors"
                      >
                        <span className="text-sm font-semibold">
                          {item.title}
                        </span>
                        {item.description ? (
                          <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
                            {item.description}
                          </span>
                        ) : null}
                      </AppAwareLink>
                    ))}
                  </div>
                </section>
              ) : null}

              {sources.length > 0 ? (
                <section className="border-border/60 bg-card/25 mt-4 rounded-[var(--radius-panel)] border p-4">
                  <h2 className="text-sm font-semibold">
                    {section.sources?.title || 'References'}
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {sources.map((item: GuideLink, index: number) => (
                      <li key={index}>
                        <AppAwareLink
                          href={item.url || '#'}
                          target={item.target || '_blank'}
                          className="text-muted-foreground hover:text-primary"
                        >
                          {item.title}
                        </AppAwareLink>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
