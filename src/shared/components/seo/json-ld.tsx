export function JsonLd({ data }: { data: unknown[] }) {
  const graph = data.filter(Boolean);

  if (graph.length === 0) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graph,
        }),
      }}
    />
  );
}
