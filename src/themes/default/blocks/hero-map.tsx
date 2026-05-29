'use client';

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Dices,
  Layers3,
  Map,
  MapPinned,
  Printer,
  Route,
  Search,
  type LucideIcon,
} from 'lucide-react';
import { useLocale } from 'next-intl';

import { Link, useRouter } from '@/core/i18n/navigation';
import { isAppHref } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

interface HeroMapInput {
  label?: string;
  placeholder?: string;
  helper?: string;
  dice_label?: string;
  action_title?: string;
  random_cities?: string[];
  meta?: string[];
}

interface HeroMapSection extends Section {
  title_line1?: string;
  title_line2?: string;
  city_input?: HeroMapInput;
}

const fallbackCities = [
  'New York, United States',
  'Kyoto, Japan',
  'Paris, France',
  'London, United Kingdom',
  'San Francisco, United States',
  'Hannover, Germany',
  'Barcelona, Spain',
  'Singapore',
];

const fallbackCitiesZh = [
  '纽约, 美国',
  '京都, 日本',
  '巴黎, 法国',
  '伦敦, 英国',
  '旧金山, 美国',
  '汉诺威, 德国',
  '巴塞罗那, 西班牙',
  '新加坡',
];

const floatingIcons: Array<{
  Icon: LucideIcon;
  className: string;
  delay: string;
  label: string;
}> = [
  {
    Icon: MapPinned,
    label: 'Place marker',
    delay: '0ms',
    className: 'left-[7%] top-[27%] hidden lg:flex',
  },
  {
    Icon: Route,
    label: 'Route line',
    delay: '900ms',
    className: 'left-[11%] bottom-[29%] hidden xl:flex',
  },
  {
    Icon: Layers3,
    label: 'Map layers',
    delay: '450ms',
    className: 'right-[8%] top-[26%] hidden lg:flex',
  },
  {
    Icon: Search,
    label: 'Search place',
    delay: '1250ms',
    className: 'right-[7%] bottom-[30%] hidden xl:flex',
  },
];

function buildStudioHref(baseUrl: string, city: string) {
  if (typeof window === 'undefined') {
    return baseUrl;
  }

  const target = new URL(
    baseUrl || '/app?utm_source=home_hero',
    window.location.origin
  );
  const normalizedCity = city.trim();

  if (normalizedCity) {
    target.searchParams.set('city', normalizedCity);
  }

  target.searchParams.set('utm_content', 'hero_city_prompt');

  return `${target.pathname}${target.search}${target.hash}`;
}

function splitTitle(section: HeroMapSection) {
  const title = section.title || 'Terraink Alternative by Vellum & Line';

  if (section.title_line1 || section.title_line2) {
    return {
      line1: section.title_line1 || title,
      line2: section.title_line2 || '',
    };
  }

  const separator = ' by ';
  if (title.includes(separator)) {
    const [line1, ...rest] = title.split(separator);
    return {
      line1,
      line2: `by ${rest.join(separator)}`,
    };
  }

  return {
    line1: title,
    line2: '',
  };
}

export function HeroMap({
  section,
  className,
}: {
  section: HeroMapSection;
  className?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rollTimerRef = useRef<number | null>(null);
  const [city, setCity] = useState('');
  const [hasUserEditedCity, setHasUserEditedCity] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [isDeletingCity, setIsDeletingCity] = useState(false);

  const isZh = locale === 'zh';
  const { line1, line2 } = splitTitle(section);
  const inputConfig = section.city_input || {};
  const citySamples = useMemo(
    () =>
      inputConfig.random_cities?.length
        ? inputConfig.random_cities
        : isZh
          ? fallbackCitiesZh
          : fallbackCities,
    [inputConfig.random_cities, isZh]
  );
  const primaryButton = section.buttons?.[0];
  const actionTitle =
    inputConfig.action_title ||
    primaryButton?.title ||
    (isZh ? '打开工作台' : 'Open Studio');
  const actionUrl = primaryButton?.url || '/app?utm_source=home_hero';
  const placeholder =
    inputConfig.placeholder ||
    (isZh
      ? '输入城市名称，例如 纽约, 美国'
      : 'Enter a city, for example New York, NY');
  const inputLabel =
    inputConfig.label || (isZh ? '地图海报城市' : 'Map poster city');
  const helperText =
    inputConfig.helper ||
    section.tip ||
    (isZh
      ? '输入一个城市，或用骰子随机选择地点。'
      : 'Type a city, or roll the dice for a place to map.');
  const diceLabel =
    inputConfig.dice_label || (isZh ? '随机选择城市' : 'Roll a random city');
  const metaItems =
    inputConfig.meta ||
    (isZh
      ? ['城市海报', '路线记忆', '可打印导出']
      : ['City posters', 'Route memories', 'Print-ready export']);

  useEffect(() => {
    return () => {
      if (rollTimerRef.current) {
        window.clearInterval(rollTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!citySamples.length || hasUserEditedCity || isRolling) {
      return;
    }

    const activeCity = citySamples[typingIndex % citySamples.length] || '';
    let timer: number;

    if (!isDeletingCity && city.length < activeCity.length) {
      timer = window.setTimeout(() => {
        setCity(activeCity.slice(0, city.length + 1));
      }, 54);
    } else if (!isDeletingCity && city.length === activeCity.length) {
      timer = window.setTimeout(() => {
        setIsDeletingCity(true);
      }, 1650);
    } else if (isDeletingCity && city.length > 0) {
      timer = window.setTimeout(() => {
        setCity(activeCity.slice(0, city.length - 1));
      }, 28);
    } else {
      timer = window.setTimeout(() => {
        setIsDeletingCity(false);
        setTypingIndex((current) => (current + 1) % citySamples.length);
      }, 180);
    }

    return () => window.clearTimeout(timer);
  }, [
    city,
    citySamples,
    hasUserEditedCity,
    isDeletingCity,
    isRolling,
    typingIndex,
  ]);

  if (section.disabled) {
    return null;
  }

  const submitCity = (nextCity: string) => {
    const fallbackCity =
      citySamples[Math.floor(Math.random() * citySamples.length)] || '';
    const targetCity = nextCity.trim() || fallbackCity;
    const href = buildStudioHref(actionUrl, targetCity);

    if (isAppHref(href)) {
      window.location.assign(href);
      return;
    }

    router.push(href as any);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitCity(city);
  };

  const rollCity = () => {
    if (rollTimerRef.current) {
      window.clearInterval(rollTimerRef.current);
    }

    setHasUserEditedCity(true);

    const currentCity = city.trim();
    const options =
      citySamples.length > 1
        ? citySamples.filter((item) => item !== currentCity)
        : citySamples;
    const finalCity =
      options[Math.floor(Math.random() * options.length)] ||
      citySamples[0] ||
      '';

    let ticks = 0;
    setIsRolling(true);

    rollTimerRef.current = window.setInterval(() => {
      const sample =
        citySamples[Math.floor(Math.random() * citySamples.length)] ||
        finalCity;
      setCity(sample);
      ticks += 1;

      if (ticks >= 9) {
        if (rollTimerRef.current) {
          window.clearInterval(rollTimerRef.current);
          rollTimerRef.current = null;
        }
        setCity(finalCity);
        setIsRolling(false);
        window.setTimeout(() => inputRef.current?.focus(), 0);
      }
    }, 58);
  };

  return (
    <section
      id={section.id}
      className={cn(
        'relative isolate overflow-hidden pt-26 pb-16 md:pt-[8.35rem] md:pb-20',
        'min-h-[calc(100dvh-4rem)]',
        section.className,
        className
      )}
    >
      {section.background_image?.src && (
        <div aria-hidden className="absolute inset-0 -z-20 overflow-hidden">
          <Image
            src={section.background_image.src}
            alt={section.background_image.alt || ''}
            fill
            priority
            sizes="100vw"
            quality={70}
            className="object-cover object-[center_38%] opacity-[0.68] brightness-[0.78] contrast-[1.06] saturate-[0.84]"
            unoptimized={section.background_image.src.startsWith('http')}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,oklch(12%_0.018_243_/_0.38)_24%,oklch(12%_0.018_243_/_0.72)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,oklch(12%_0.018_243_/_0.18)_24%,oklch(12%_0.018_243_/_0.18)_76%,var(--background)_100%)]" />
        </div>
      )}

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,oklch(76%_0.075_82_/_0.045)_1px,transparent_1px),linear-gradient(to_bottom,oklch(76%_0.075_82_/_0.04)_1px,transparent_1px)] bg-[size:64px_64px]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--color-rule-strong)] to-transparent"
      />

      {floatingIcons.map(({ Icon, className: iconClassName, delay, label }) => (
        <div
          key={label}
          aria-hidden
          className={cn(
            'vellum-hero-icon-shell border-primary/14 bg-card/18 text-primary/62 pointer-events-none absolute z-0 size-10 items-center justify-center rounded-[calc(var(--radius-panel)-4px)] border backdrop-blur-[2px] md:size-11',
            iconClassName
          )}
          style={{ animationDelay: delay }}
        >
          <Icon className="size-4.5 md:size-5" strokeWidth={1.45} />
        </div>
      ))}

      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {section.announcement?.title && (
            <Link
              href={section.announcement.url || '#terraink'}
              target={section.announcement.target || '_self'}
              className="border-primary/22 bg-card/48 text-foreground/86 hover:border-primary/38 hover:bg-card/62 mb-9 inline-flex max-w-full items-center gap-2 rounded-[var(--radius-panel)] border px-3 py-2 text-sm shadow-xs backdrop-blur-md"
            >
              <MapPinned className="text-primary size-4 shrink-0" />
              <span className="truncate">{section.announcement.title}</span>
              <ArrowRight className="text-muted-foreground size-3.5 shrink-0" />
            </Link>
          )}

          <h1 className="text-foreground max-w-4xl font-serif text-[clamp(2.35rem,4.65vw,4.75rem)] leading-[1.03] font-bold tracking-normal text-balance">
            <span className="block bg-[linear-gradient(92deg,var(--color-ink)_0%,var(--color-accent-strong)_54%,var(--color-memory)_100%)] bg-clip-text text-transparent">
              {line1}
            </span>
            {line2 && (
              <span className="text-foreground mt-2 block text-[0.66em]">
                {line2}
              </span>
            )}
          </h1>

          {section.description && (
            <p
              className="text-muted-foreground mt-7 max-w-5xl text-base leading-7 text-pretty md:text-lg md:leading-8"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-3xl"
            aria-label={inputLabel}
          >
            <div className="vellum-hero-prompt border-primary/30 bg-card/72 relative overflow-hidden rounded-[var(--radius-panel)] border px-3 py-3 shadow-lg backdrop-blur-xl md:px-4">
              <div
                aria-hidden
                className="via-primary/42 absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
              />
              <div className="relative flex min-h-[3.75rem] items-center gap-2 md:gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-primary mb-1 flex items-center justify-center gap-2 font-mono text-[0.62rem] font-semibold tracking-[0.12em] uppercase">
                    <span className="bg-primary size-1.5 rounded-full" />
                    {inputLabel}
                  </div>
                  <input
                    ref={inputRef}
                    value={city}
                    onFocus={() => {
                      if (!hasUserEditedCity) {
                        setCity(
                          citySamples[typingIndex % citySamples.length] || city
                        );
                        setHasUserEditedCity(true);
                      }
                    }}
                    onChange={(event) => {
                      setHasUserEditedCity(true);
                      setCity(event.target.value);
                    }}
                    placeholder={placeholder}
                    className="text-foreground placeholder:text-muted-foreground/62 h-8 w-full border-0 bg-transparent px-0 text-center font-sans text-xl font-semibold tracking-normal outline-none focus-visible:outline-none md:text-2xl"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <p className="text-muted-foreground/68 mt-0.5 truncate text-xs tracking-normal">
                    {helperText}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={rollCity}
                  className={cn(
                    'vellum-hero-dice border-primary/26 bg-background/72 text-primary hover:border-primary/42 hover:bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] border shadow-sm',
                    isRolling && 'border-primary/55 bg-primary/16 text-primary'
                  )}
                  aria-label={diceLabel}
                  title={diceLabel}
                >
                  <Dices className="size-5" />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 flex flex-col items-center gap-5">
            <button
              type="button"
              onClick={() => submitCity(city)}
              className="vellum-hero-primary bg-primary text-primary-foreground inline-flex h-[3.25rem] min-w-[10.5rem] items-center justify-center gap-2.5 rounded-full border px-6 text-[0.95rem] font-bold shadow-md hover:bg-[var(--color-accent-strong)] md:h-14 md:min-w-[11.25rem] md:px-8 md:text-base"
            >
              <Map className="size-4.5 md:size-5" />
              {actionTitle}
              <ArrowRight className="vellum-hero-primary-arrow size-4.5 md:size-5" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {metaItems.map((item, index) => {
                const MetaIcon = [MapPinned, Route, Printer, BadgeCheck][
                  index % 4
                ];

                return (
                  <span
                    key={item}
                    className="border-border/58 bg-card/38 text-foreground/78 inline-flex items-center gap-2 rounded-[var(--radius-panel)] border px-3 py-1.5 text-sm backdrop-blur-sm"
                  >
                    <MetaIcon
                      className="text-primary size-4"
                      strokeWidth={1.6}
                    />
                    {item}
                  </span>
                );
              })}
            </div>
          </div>

          {section.image?.src && (
            <div className="border-border/60 bg-card/40 mt-11 hidden w-full max-w-5xl overflow-hidden rounded-t-[var(--radius-sheet)] border shadow-xl backdrop-blur-sm md:block">
              <div className="relative h-48 overflow-hidden lg:h-[14.5rem]">
                <Image
                  src={section.image.src}
                  alt={section.image.alt || 'Vellum & Line studio preview'}
                  fill
                  priority
                  sizes="(max-width: 1280px) 84vw, 1024px"
                  quality={75}
                  className="object-cover object-top opacity-[0.82]"
                  unoptimized={section.image.src.startsWith('http')}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,var(--background)_102%)]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
