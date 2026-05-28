import type { MetadataRoute } from 'next';

import { locales } from '@/config/locale';
import {
  buildCanonicalUrl,
  getLanguageAlternates,
  indexedSeoPages,
} from '@/config/seo/pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const studioAppEntry: MetadataRoute.Sitemap[number] = {
    url: buildCanonicalUrl('/app'),
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.88,
  };

  return [
    ...indexedSeoPages.flatMap((page) =>
      locales.map((locale) => ({
        url: buildCanonicalUrl(page.path, locale),
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: Number(
          (locale === 'en'
            ? page.priority
            : Math.max(page.priority - 0.08, 0.1)
          ).toFixed(2)
        ),
        alternates: {
          languages: getLanguageAlternates(page.path),
        },
      }))
    ),
    studioAppEntry,
  ];
}
