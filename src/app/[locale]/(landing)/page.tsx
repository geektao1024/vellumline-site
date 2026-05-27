import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { JsonLd } from '@/shared/components/seo/json-ld';
import { getMetadata } from '@/shared/lib/seo';
import { getDynamicPageJsonLd } from '@/shared/lib/structured-data';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  metadataKey: 'pages.index.metadata',
  canonicalUrl: '/',
});

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.index');

  // get page data
  const page: DynamicPage = t.raw('page');

  // load page component
  const Page = await getThemePage('dynamic-page');

  return (
    <>
      <JsonLd
        data={getDynamicPageJsonLd({
          page,
          path: '/',
          locale,
        })}
      />
      <Page locale={locale} page={page} />
    </>
  );
}
