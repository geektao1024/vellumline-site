import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { envConfigs } from '@/config';
import {
  buildCanonicalUrl,
  getLanguageAlternates,
  getPathFromSlug,
  getSeoPageByPath,
  keywordsToMeta,
} from '@/config/seo/pages';
import { JsonLd } from '@/shared/components/seo/json-ld';
import { getDynamicPageJsonLd } from '@/shared/lib/structured-data';
import { getLocalPage } from '@/shared/models/post';

export const revalidate = 3600;

// dynamic page metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const { locale, slug } = await params;

  // metadata values
  let title = '';
  let description = '';
  let keywords = '';

  // 1. try to get static page metadata from
  // content/pages/**/*.mdx

  // static page slug
  const staticPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('/') || '';

  // filter invalid slug (files with extensions or dev server paths like @vite/client)
  if (staticPageSlug.includes('.') || staticPageSlug.startsWith('@')) {
    return;
  }

  // build canonical url
  const pagePath = getPathFromSlug(slug);
  const canonicalUrl = buildCanonicalUrl(pagePath, locale);
  const alternates = {
    canonical: canonicalUrl,
    languages: getLanguageAlternates(pagePath),
  };
  const seoPage = getSeoPageByPath(pagePath);

  // get static page content
  const staticPage = await getLocalPage({ slug: staticPageSlug, locale });

  // return static page metadata
  if (staticPage) {
    title = staticPage.title || '';
    description = staticPage.description || '';

    return {
      title,
      description,
      keywords: keywordsToMeta(seoPage?.secondaryKeywords),
      alternates,
      openGraph: getPageOpenGraph(locale, canonicalUrl, title, description),
      twitter: getPageTwitter(title, description),
    };
  }

  // 2. static page not found, try to get dynamic page metadata from
  // src/config/locale/messages/{locale}/pages/**/*.json

  // dynamic page slug
  const dynamicPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('.') || '';

  const messageKey = `pages.${dynamicPageSlug}`;
  const t = await getTranslations({ locale, namespace: messageKey });

  // return dynamic page metadata
  if (t.has('metadata')) {
    title = t.raw('metadata.title');
    description = t.raw('metadata.description');
    keywords = t.has('metadata.keywords')
      ? t.raw('metadata.keywords')
      : keywordsToMeta(
          [
            seoPage?.primaryKeyword || '',
            ...(seoPage?.secondaryKeywords || []),
          ].filter(Boolean)
        );

    return {
      title,
      description,
      keywords,
      alternates,
      openGraph: getPageOpenGraph(locale, canonicalUrl, title, description),
      twitter: getPageTwitter(title, description),
    };
  }

  // 3. return common metadata
  const tc = await getTranslations('common.metadata');

  title = tc('title');
  description = tc('description');

  return {
    title,
    description,
    keywords: keywordsToMeta(seoPage?.secondaryKeywords),
    alternates,
    openGraph: getPageOpenGraph(locale, canonicalUrl, title, description),
    twitter: getPageTwitter(title, description),
  };
}

function getPageOpenGraph(
  locale: string,
  url: string,
  title: string,
  description: string
) {
  return {
    type: 'website',
    locale,
    url,
    title,
    description,
    siteName: envConfigs.app_name,
    images: [resolveImageUrl(envConfigs.app_preview_image || '/preview.png')],
  };
}

function getPageTwitter(title: string, description: string) {
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [resolveImageUrl(envConfigs.app_preview_image || '/preview.png')],
    site: envConfigs.app_url,
  };
}

function resolveImageUrl(imageUrl: string) {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  return `${envConfigs.app_url}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string | string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // 1. try to get static page from
  // content/pages/**/*.mdx

  // static page slug
  const staticPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('/') || '';

  // filter invalid slug (files with extensions or dev server paths like @vite/client)
  if (staticPageSlug.includes('.') || staticPageSlug.startsWith('@')) {
    return notFound();
  }

  // get static page content
  const staticPage = await getLocalPage({ slug: staticPageSlug, locale });

  // return static page
  if (staticPage) {
    const Page = await getThemePage('static-page');

    return <Page locale={locale} post={staticPage} />;
  }

  // 2. static page not found
  // try to get dynamic page content from
  // src/config/locale/messages/{locale}/pages/**/*.json

  // dynamic page slug
  const dynamicPageSlug =
    typeof slug === 'string' ? slug : (slug as string[]).join('.') || '';
  const pagePath = getPathFromSlug(slug);

  const messageKey = `pages.${dynamicPageSlug}`;

  try {
    const t = await getTranslations({ locale, namespace: messageKey });

    // return dynamic page
    if (t.has('page')) {
      const page = t.raw('page');
      const Page = await getThemePage('dynamic-page');
      return (
        <>
          <JsonLd
            data={getDynamicPageJsonLd({
              page,
              path: pagePath,
              locale,
            })}
          />
          <Page locale={locale} page={page} />
        </>
      );
    }
  } catch (error) {
    // ignore error if translation not found
    return notFound();
  }

  // 3. page not found
  return notFound();
}
