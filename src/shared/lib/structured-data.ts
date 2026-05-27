import { envConfigs } from '@/config';
import { buildCanonicalUrl, getSiteBaseUrl } from '@/config/seo/pages';
import type { DynamicPage } from '@/shared/types/blocks/landing';

export function getDynamicPageJsonLd({
  page,
  path,
  locale,
}: {
  page: DynamicPage;
  path: string;
  locale: string;
}) {
  const url = buildCanonicalUrl(path, locale);
  const siteName = envConfigs.app_name || 'Vellum & Line';
  const pageTitle = page.title || siteName;
  const pageDescription = page.description || '';

  const graph: unknown[] = [
    {
      '@type': 'WebSite',
      '@id': `${getSiteBaseUrl()}/#website`,
      name: siteName,
      url: `${getSiteBaseUrl()}/`,
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: pageTitle,
      description: pageDescription,
      inLanguage: locale,
      isPartOf: {
        '@id': `${getSiteBaseUrl()}/#website`,
      },
    },
  ];

  if (path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: siteName,
          item: buildCanonicalUrl('/', locale),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: pageTitle,
          item: url,
        },
      ],
    });
  }

  const faqItems = page.sections?.faq?.items || [];
  if (faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqItems
        .filter((item) => item.question && item.answer)
        .map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
    });
  }

  return graph;
}
