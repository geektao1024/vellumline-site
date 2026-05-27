'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { AppAwareLink } from '@/shared/blocks/common';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Showcases({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const groups = (section as any).groups || [];
  const [selectedGroup, setSelectedGroup] = useState<string>(
    groups.length > 0 ? groups[0].name : ''
  );

  const filteredItems = useMemo(() => {
    if (!section.items) return [];
    if (!selectedGroup || !groups.length) return section.items;
    if (selectedGroup === 'all') return section.items;
    return section.items.filter((item) => item.group === selectedGroup);
  }, [section.items, selectedGroup, groups.length]);

  return (
    <section
      id={section.id || section.name}
      className={cn('py-24 md:py-36', section.className, className)}
    >
      <motion.div
        className="container mb-12 max-w-5xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
      >
        {section.sr_only_title && (
          <h1 className="sr-only">{section.sr_only_title}</h1>
        )}
        <h2 className="mx-auto mb-6 max-w-full text-3xl font-bold tracking-normal text-pretty md:max-w-5xl lg:text-4xl">
          {section.title}
        </h2>
        <p className="text-muted-foreground text-md mx-auto mb-4 max-w-full leading-relaxed md:max-w-5xl">
          {section.description}
        </p>
      </motion.div>

      {groups.length > 0 && (
        <motion.div
          className="container mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          {groups.map(
            (group: { name: string; title: string }, index: number) => {
              const isSelected = selectedGroup === group.name;
              return (
                <motion.button
                  key={group.name}
                  onClick={() => setSelectedGroup(group.name)}
                  className={cn(
                    'relative rounded-[var(--radius-control)] border px-3 py-1.5 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-[var(--dur-short)]',
                    isSelected
                      ? 'border-primary/35 bg-primary text-primary-foreground shadow-xs'
                      : 'border-border/70 bg-card/45 text-foreground hover:border-primary/35 hover:bg-accent/25'
                  )}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                >
                  <span>{group.title}</span>
                </motion.button>
              );
            }
          )}
        </motion.div>
      )}

      <div className="container grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const hasButton = !!(item as any).button;
            const cardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <Card className="group hover:border-primary/35 hover:bg-accent/15 overflow-hidden p-0">
                  <CardContent className="p-0">
                    <motion.div className="relative aspect-16/10 w-full overflow-hidden">
                      <Image
                        src={item.image?.src ?? ''}
                        alt={item.image?.alt ?? ''}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        className="object-cover transition-opacity duration-[var(--dur-short)] group-hover:opacity-90"
                      />
                    </motion.div>
                    <div className="p-6">
                      <h3 className="mb-2 line-clamp-1 text-xl font-semibold text-balance">
                        {item.title}
                      </h3>
                      <p
                        className="text-muted-foreground line-clamp-3 text-sm"
                        dangerouslySetInnerHTML={{
                          __html: item.description ?? '',
                        }}
                      />
                      {hasButton && (
                        <div className="mt-4">
                          <Button
                            asChild
                            variant={(item as any).button.variant || 'default'}
                            size={(item as any).button.size || 'sm'}
                            className="h-8 w-full px-3 py-1.5 text-sm font-medium"
                          >
                            <AppAwareLink
                              href={(item as any).button.url || ''}
                              target={(item as any).button.target || '_self'}
                            >
                              {(item as any).button.icon && (
                                <SmartIcon
                                  name={(item as any).button.icon as string}
                                  className="text-white"
                                />
                              )}
                              {(item as any).button.title}
                            </AppAwareLink>
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );

            return hasButton ? (
              <div key={index}>{cardContent}</div>
            ) : (
              <AppAwareLink
                key={index}
                href={item.url || ''}
                target={item.target}
              >
                {cardContent}
              </AppAwareLink>
            );
          })
        ) : (
          <motion.div
            className="text-muted-foreground col-span-full text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            No items found in this category.
          </motion.div>
        )}
      </div>
    </section>
  );
}
