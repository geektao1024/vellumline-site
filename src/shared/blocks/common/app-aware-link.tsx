import type { ComponentProps, ReactNode } from 'react';

import { Link } from '@/core/i18n/navigation';

type AppAwareLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
  children: ReactNode;
};

function isExternalHref(href: string) {
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

export function isAppHref(href: string) {
  return href === '/app' || /^\/app(?:[/?#]|$)/.test(href);
}

export function AppAwareLink({
  href,
  rel,
  target,
  children,
  ...props
}: AppAwareLinkProps) {
  const shouldUseAnchor = isAppHref(href) || isExternalHref(href);
  const safeRel = target === '_blank' && !rel ? 'noreferrer' : rel;

  if (shouldUseAnchor) {
    return (
      <a href={href} rel={safeRel} target={target} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} rel={safeRel} target={target} {...props}>
      {children}
    </Link>
  );
}
