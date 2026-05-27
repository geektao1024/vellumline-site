import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

import { AppAwareLink, SmartIcon } from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import { Highlighter } from '@/shared/components/ui/highlighter';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

import { SocialAvatars } from './social-avatars';

export function Hero({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  const highlightText = section.highlight_text ?? '';
  let texts = null;
  if (highlightText) {
    texts = section.title?.split(highlightText, 2);
  }

  return (
    <section
      id={section.id}
      className={cn(
        'relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-14',
        section.className,
        className
      )}
    >
      <div className="relative mx-auto max-w-full px-4 text-center md:max-w-5xl md:text-left">
        {section.announcement && (
          <AppAwareLink
            href={section.announcement.url || ''}
            target={section.announcement.target || '_self'}
            className="hover:border-primary/35 hover:bg-accent/35 bg-card/70 group border-border/70 mx-auto mb-8 flex w-fit max-w-full items-center gap-4 rounded-[var(--radius-panel)] border p-1 pl-4 shadow-xs backdrop-blur-sm transition-colors duration-300 md:mx-0"
          >
            <span className="text-foreground min-w-0 truncate text-sm">
              {section.announcement.title}
            </span>
            <span className="dark:border-background block h-4 w-0.5 shrink-0 border-l bg-white dark:bg-zinc-700"></span>

            <div className="bg-background group-hover:bg-muted size-6 shrink-0 overflow-hidden rounded-[var(--radius-control)] duration-500">
              <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
              </div>
            </div>
          </AppAwareLink>
        )}

        {texts && texts.length > 0 ? (
          <h1 className="text-foreground text-4xl font-bold tracking-normal text-balance sm:text-6xl">
            {texts[0]}
            <Highlighter action="underline" color="oklch(72% 0.16 47)">
              {highlightText}
            </Highlighter>
            {texts[1]}
          </h1>
        ) : (
          <h1 className="text-foreground text-4xl font-bold tracking-normal text-balance sm:text-6xl">
            {section.title}
          </h1>
        )}

        <p
          className="text-muted-foreground mt-8 mb-8 max-w-3xl text-lg leading-relaxed text-balance md:mx-0"
          dangerouslySetInnerHTML={{ __html: section.description ?? '' }}
        />

        {section.buttons && (
          <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
            {section.buttons.map((button, idx) => (
              <Button
                asChild
                size={button.size || 'default'}
                variant={button.variant || 'default'}
                className="h-10 px-4 text-sm"
                key={idx}
              >
                <AppAwareLink
                  href={button.url ?? ''}
                  target={button.target ?? '_self'}
                >
                  {button.icon && <SmartIcon name={button.icon as string} />}
                  <span>{button.title}</span>
                </AppAwareLink>
              </Button>
            ))}
          </div>
        )}

        {section.tip && (
          <p
            className="text-muted-foreground mt-6 block text-center text-sm md:text-left"
            dangerouslySetInnerHTML={{ __html: section.tip ?? '' }}
          />
        )}

        {section.show_avatars && (
          <SocialAvatars tip={section.avatars_tip || ''} />
        )}
      </div>

      {(section.image?.src || section.image_invert?.src) && (
        <div className="border-border/50 relative mt-10 border-y sm:mt-16">
          <div className="border-border/50 relative z-10 mx-auto max-w-6xl border-x px-3">
            <div className="border-border/70 bg-card/55 overflow-hidden rounded-[var(--radius-panel)] border shadow-xl backdrop-blur-sm">
              <div
                aria-hidden
                className="h-3 w-full bg-[repeating-linear-gradient(-45deg,var(--color-foreground),var(--color-foreground)_1px,transparent_1px,transparent_4px)] opacity-5"
              />
              {section.image_invert?.src && (
                <Image
                  className="relative z-2 hidden w-full dark:block"
                  src={section.image_invert.src}
                  alt={section.image_invert.alt || section.image?.alt || ''}
                  width={
                    section.image_invert.width || section.image?.width || 1200
                  }
                  height={
                    section.image_invert.height || section.image?.height || 630
                  }
                  sizes="(max-width: 768px) 100vw, 1200px"
                  loading="lazy"
                  fetchPriority="high"
                  quality={75}
                  unoptimized={section.image_invert.src.startsWith('http')}
                />
              )}
              {section.image?.src && (
                <Image
                  className={cn(
                    'relative z-2 w-full',
                    section.image_invert?.src ? 'block dark:hidden' : 'block'
                  )}
                  src={section.image.src}
                  alt={section.image.alt || section.image_invert?.alt || ''}
                  width={
                    section.image.width || section.image_invert?.width || 1200
                  }
                  height={
                    section.image.height || section.image_invert?.height || 630
                  }
                  sizes="(max-width: 768px) 100vw, 1200px"
                  loading="lazy"
                  fetchPriority="high"
                  quality={75}
                  unoptimized={section.image.src.startsWith('http')}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {section.background_image?.src && (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
          <div className="from-background/70 via-background/78 to-background absolute inset-0 z-10 bg-gradient-to-b" />
          <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_28%_26%,transparent_0%,transparent_24%,var(--background)_78%)] opacity-45" />
          <Image
            src={section.background_image.src}
            alt={section.background_image.alt || ''}
            className="object-cover opacity-90 blur-[0px]"
            fill
            loading="lazy"
            sizes="100vw"
            quality={70}
            unoptimized={section.background_image.src.startsWith('http')}
          />
        </div>
      )}
    </section>
  );
}
