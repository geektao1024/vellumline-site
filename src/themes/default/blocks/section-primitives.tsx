import { SmartIcon } from '@/shared/blocks/common';
import { cn } from '@/shared/lib/utils';

export function SectionHeading({
  label,
  title,
  description,
  className,
}: {
  label?: string;
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('mx-auto max-w-3xl text-center text-balance', className)}
    >
      {label && (
        <span className="border-primary/25 bg-primary/10 text-primary inline-flex items-center rounded-[var(--radius-control)] border px-3 py-1 font-mono text-xs font-semibold">
          {label}
        </span>
      )}
      {title && (
        <h2 className="text-foreground mt-4 text-3xl font-bold tracking-normal md:text-4xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function IconShell({
  name,
  size = 18,
  className,
}: {
  name?: string;
  size?: number;
  className?: string;
}) {
  if (!name) {
    return null;
  }

  return (
    <span
      className={cn(
        'border-primary/25 bg-primary/10 text-primary inline-flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] border shadow-xs',
        className
      )}
    >
      <SmartIcon name={name} size={size} />
    </span>
  );
}
