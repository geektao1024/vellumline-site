'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { IconShell, SectionHeading } from './section-primitives';

export function Faq({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('relative py-14 md:py-20', section.className, className)}
    >
      <div className="via-border pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="container">
        <ScrollAnimation>
          <SectionHeading
            label={section.label}
            title={section.title}
            description={section.description}
          />
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="mx-auto mt-12 max-w-4xl">
            <Accordion
              type="single"
              collapsible
              className="border-border/70 bg-card/35 w-full rounded-[var(--radius-panel)] border p-1 shadow-sm backdrop-blur-sm"
            >
              {section.items?.map((item, idx) => (
                <div className="group" key={idx}>
                  <AccordionItem
                    value={item.question || item.title || ''}
                    className="peer data-[state=open]:bg-accent/25 rounded-[var(--radius-control)] border-none px-4 py-1 data-[state=open]:border-none data-[state=open]:shadow-xs md:px-6"
                  >
                    <AccordionTrigger className="cursor-pointer text-left text-base font-semibold hover:no-underline">
                      <span className="flex min-w-0 items-start gap-3">
                        <IconShell
                          name="CircleHelp"
                          size={15}
                          className="bg-background/60 mt-0.5 size-8"
                        />
                        <span className="min-w-0 break-words">
                          {item.question || item.title || ''}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground pl-11 text-base leading-relaxed max-sm:pl-0">
                        {item.answer || item.description || ''}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <hr className="border-border/60 mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                </div>
              ))}
            </Accordion>

            <p
              className="text-muted-foreground mt-6 px-8"
              dangerouslySetInnerHTML={{ __html: section.tip || '' }}
            />
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
