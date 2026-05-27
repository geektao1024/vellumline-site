'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { AppAwareLink, LazyImage, SmartIcon } from '@/shared/blocks/common';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { Button } from '@/shared/components/ui/button';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { IconShell, SectionHeading } from './section-primitives';

export function FeaturesAccordion({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const [activeItem, setActiveItem] = useState<string>('item-1');

  const images: any = {};
  section.items?.forEach((item, idx) => {
    images[`item-${idx + 1}`] = {
      image: item.image?.src ?? '',
      alt: item.image?.alt || item.title || '',
    };
  });

  return (
    // overflow-x-hidden to prevent horizontal scroll
    <section
      id={section.id || section.name}
      className={cn(
        'border-border/45 relative overflow-x-hidden border-y py-14 md:py-20',
        section.className,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_25%,oklch(64%_0.11_150_/_0.07),transparent_26rem)]" />
      <div className="container space-y-10 overflow-x-hidden px-2 sm:px-6 md:space-y-16">
        <ScrollAnimation>
          <SectionHeading
            label={section.label}
            title={section.title}
            description={section.description}
          />
        </ScrollAnimation>

        <div className="grid min-w-0 gap-8 sm:px-6 md:grid-cols-2 lg:gap-14 lg:px-0">
          <ScrollAnimation delay={0.1} direction="left">
            <Accordion
              type="single"
              value={activeItem}
              onValueChange={(value) => setActiveItem(value as string)}
              className="border-border/65 bg-card/35 w-full overflow-hidden rounded-[var(--radius-panel)] border shadow-sm backdrop-blur-sm"
            >
              {section.items?.map((item, idx) => (
                <AccordionItem
                  value={`item-${idx + 1}`}
                  key={idx}
                  className="border-border/60 data-[state=open]:bg-accent/20 px-4 transition-colors"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3 text-left text-base">
                      <IconShell
                        name={item.icon as string}
                        size={16}
                        className="bg-background/60 size-9"
                      />
                      <span>{item.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollAnimation>

          <ScrollAnimation delay={0.2} direction="right">
            <div className="bg-card/40 border-border/70 relative flex min-w-0 flex-shrink overflow-hidden rounded-[var(--radius-sheet)] border p-2 shadow-lg backdrop-blur-sm">
              <div className="border-border/60 absolute inset-y-2 right-2 ml-auto w-14 rounded-[var(--radius-panel)] border-l bg-[repeating-linear-gradient(-45deg,var(--color-rule-soft),var(--color-rule-soft)_1px,transparent_1px,transparent_8px)]"></div>
              <div className="bg-background relative aspect-76/59 w-full min-w-0 rounded-[var(--radius-panel)] sm:w-[calc(3/4*100%+3rem)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeItem}-id`}
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="border-border/70 size-full overflow-hidden rounded-[var(--radius-panel)] border shadow-md"
                  >
                    <LazyImage
                      src={images[activeItem].image}
                      className="size-full object-cover object-left-top dark:mix-blend-lighten"
                      alt={images[activeItem].alt}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollAnimation>
        </div>

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
