import { envConfigs } from '@/config';
import { defaultLocale, locales } from '@/config/locale';

export type SeoPageGroup =
  | 'brand'
  | 'competitor'
  | 'comparison'
  | 'review'
  | 'tool';

export type SeoPageConfig = {
  path: string;
  group: SeoPageGroup;
  primaryKeyword: string;
  secondaryKeywords: string[];
  messageKey?: string;
  priority: number;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  index?: boolean;
};

export const seoPages: SeoPageConfig[] = [
  {
    path: '/',
    group: 'brand',
    primaryKeyword: 'Vellum & Line map poster maker',
    secondaryKeywords: [
      'Vellumline',
      'map poster maker',
      'custom map poster',
      'city map poster',
      'online map poster maker',
      'route poster maker',
      'printable map art',
    ],
    messageKey: 'pages.index.metadata',
    priority: 1,
    changeFrequency: 'weekly',
  },
  {
    path: '/terraink-alternative',
    group: 'competitor',
    primaryKeyword: 'Terraink alternative',
    secondaryKeywords: [
      'Terraink',
      'TerraInk',
      'Terraink map poster maker alternative',
      'Terraink app alternative',
      'Terraink-style map poster',
      'custom map poster maker',
    ],
    messageKey: 'pages.terraink-alternative.metadata',
    priority: 0.92,
    changeFrequency: 'weekly',
  },
  {
    path: '/terraink-map-poster-maker',
    group: 'competitor',
    primaryKeyword: 'Terraink map poster maker',
    secondaryKeywords: [
      'Terraink map poster',
      'Terraink custom map poster',
      'Terraink poster maker',
      'Terraink alternative',
    ],
    messageKey: 'pages.terraink-map-poster-maker.metadata',
    priority: 0.9,
    changeFrequency: 'weekly',
  },
  {
    path: '/terraink-app',
    group: 'competitor',
    primaryKeyword: 'Terraink app',
    secondaryKeywords: [
      'Terraink online app',
      'Terraink map app',
      'Terraink-style map poster app',
      'Vellum & Line studio',
    ],
    messageKey: 'pages.terraink-app.metadata',
    priority: 0.84,
    changeFrequency: 'weekly',
  },
  {
    path: '/terraink-review',
    group: 'review',
    primaryKeyword: 'Terraink review',
    secondaryKeywords: [
      'Terraink map poster review',
      'Terraink alternative review',
      'Terraink-style poster maker',
      'Vellum & Line review',
    ],
    messageKey: 'pages.terraink-review.metadata',
    priority: 0.84,
    changeFrequency: 'weekly',
  },
  {
    path: '/terraink-vs-vellum-line',
    group: 'comparison',
    primaryKeyword: 'Terraink vs Vellum & Line',
    secondaryKeywords: [
      'Terraink alternative',
      'Terraink comparison',
      'Vellum & Line map poster maker',
      'custom map poster comparison',
    ],
    messageKey: 'pages.terraink-vs-vellum-line.metadata',
    priority: 0.84,
    changeFrequency: 'weekly',
  },
];

export const indexedSeoPages = seoPages.filter((page) => page.index !== false);

export function normalizeSeoPath(path = '/') {
  if (!path || path === '/') {
    return '/';
  }

  const withoutQuery = path.split('?')[0].split('#')[0];
  const withLeadingSlash = withoutQuery.startsWith('/')
    ? withoutQuery
    : `/${withoutQuery}`;
  const withoutTrailingSlash =
    withLeadingSlash.length > 1
      ? withLeadingSlash.replace(/\/+$/, '')
      : withLeadingSlash;

  return withoutTrailingSlash || '/';
}

export function getSeoPageByPath(path: string) {
  const normalizedPath = normalizeSeoPath(path);
  return seoPages.find((page) => page.path === normalizedPath);
}

export function getPathFromSlug(slug?: string | string[]) {
  if (!slug) {
    return '/';
  }

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;
  return normalizeSeoPath(slugPath);
}

export function getLocalizedPath(path: string, locale = defaultLocale) {
  const normalizedPath = normalizeSeoPath(path);

  if (!locale || locale === defaultLocale) {
    return normalizedPath;
  }

  if (normalizedPath === '/') {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}

export function getSiteBaseUrl() {
  return (envConfigs.app_url || 'http://localhost:3000').replace(/\/+$/, '');
}

export function buildCanonicalUrl(path: string, locale = defaultLocale) {
  const localizedPath = getLocalizedPath(path, locale);
  return `${getSiteBaseUrl()}${localizedPath === '/' ? '/' : localizedPath}`;
}

export function getLanguageAlternates(path: string) {
  const languages = locales.reduce<Record<string, string>>((acc, locale) => {
    acc[locale] = buildCanonicalUrl(path, locale);
    return acc;
  }, {});

  return {
    ...languages,
    'x-default': buildCanonicalUrl(path, defaultLocale),
  };
}

export function keywordsToMeta(keywords: string[] = []) {
  return keywords.join(', ');
}
