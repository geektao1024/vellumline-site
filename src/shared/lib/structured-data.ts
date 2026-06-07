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
  const articleSection = Object.values(page.sections || {}).find(
    (section) => section?.block === 'article-guide'
  );
  const guideItems = Object.values(page.sections || {})
    .filter((section) => section?.block === 'guide-hub')
    .flatMap((section) => section.groups || [])
    .flatMap((group) => group.items || [])
    .filter((item) => item?.title && item?.url);

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

  if (articleSection) {
    const articleImage = articleSection.image?.src
      ? articleSection.image.src.startsWith('http')
        ? articleSection.image.src
        : `${getSiteBaseUrl()}${articleSection.image.src}`
      : undefined;

    graph.push({
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: articleSection.title || pageTitle,
      description: articleSection.description || pageDescription,
      image: articleImage ? [articleImage] : undefined,
      inLanguage: locale,
      mainEntityOfPage: {
        '@id': `${url}#webpage`,
      },
      author: {
        '@type': 'Organization',
        name: siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
      },
    });
  }

  const faqItems = [
    ...(page.sections?.faq?.items || []),
    ...(articleSection?.faq?.items || []),
  ];

  if (guideItems.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#guide-list`,
      name: pageTitle,
      itemListElement: guideItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.title,
        url: item.url?.startsWith('http')
          ? item.url
          : buildCanonicalUrl(item.url || '/', locale),
      })),
    });
  }

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
