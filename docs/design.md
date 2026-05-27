# Design — Vellum & Line

A locked Hallmark design system for the app. Every frontend redesign should
read this file before emitting page or component code. Extend this file when the
system needs to grow; do not invent a new visual language per surface.

## Genre

modern-minimal workbench, tuned for a map-art creator.

## Macrostructure Family

- Marketing pages: Workbench with real product captures and restrained proof.
- App pages: Workbench / Map Studio OS. The poster canvas is primary; controls
  sit in quiet rails and sheets around it.
- Content pages: Long Document with the same tokens, no alternate theme.

## Theme — Soft Brass

- `--color-paper`: oklch(12% 0.018 243)
- `--color-paper-2`: oklch(16% 0.022 243)
- `--color-paper-3`: oklch(21% 0.026 243)
- `--color-ink`: #f4eddd
- `--color-ink-2`: #cfc2a3
- `--color-muted`: #8f8777
- `--color-rule`: oklch(62% 0.055 78 / 0.28)
- `--color-rule-soft`: oklch(62% 0.055 78 / 0.16)
- `--color-rule-strong`: oklch(76% 0.075 82 / 0.42)
- `--color-accent`: oklch(82% 0.10 84)
- `--color-accent-strong`: oklch(89% 0.10 86)
- `--color-accent-pressed`: oklch(69% 0.12 68)
- `--color-accent-ink`: oklch(16% 0.035 72)
- `--color-memory`: oklch(72% 0.16 47)
- `--color-focus`: oklch(82% 0.10 84)
- `--color-danger`: oklch(72% 0.16 32)

Soft Brass is the locked accent direction for the app chrome. The map poster may
use brighter gold linework, but workspace controls should use lower-saturation
champagne and bronze tones so the interface supports the artwork instead of
competing with it.

## Typography

- Brand / poster display: Literata, weight 600-800 for the wordmark and city
  title moments.
- Display: Manrope, weight 650-800 for product and panel headings.
- Body: Manrope, weight 400-600.
- Mono: Spline Sans Mono, weight 400-600 for coordinates, dimensions,
  compact numeric values, group codes, and counts.
- Poster default: Literata for city/country, Spline Sans Mono for
  coordinates and credits.
- Display tracking: 0.
- Feature labels and menu commands use Manrope. Uppercase mono is reserved for
  compact group codes and real data labels, not decorative eyebrows.
- App chrome must not introduce ad hoc Georgia/Times, Space Grotesk, IBM Plex,
  or system monospace stacks. Add or change font roles here before styling a
  component.

## Spacing

4-point named scale. Code should use named tokens instead of raw values when
new styles are added.

## Motion

- Motion stance: motion-cut.
- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.
- UI transitions: background, border-color, color, opacity, transform only.
- Reduced motion: opacity-only or instant state.

## Microinteractions

- Success stays quiet unless the result is not visible.
- Focus appears immediately with a 2px outline.
- Hover is a small surface/border change, never scale.
- Disabled controls need opacity, cursor, and muted surface.

## CTA Voice

- Primary action: compact filled Soft Brass control with `--color-accent-ink`.
- Secondary action: outlined dark control.
- Export is the strongest action in the workspace and should remain visually
  findable without covering the poster.

## Per-Page Allowances

- App pages must not add decorative hero art. The map/poster is the art.
- Background texture may exist only as low-contrast workbench grid/noise.
- Marketing captures may use real app screenshots, never fake browser chrome.

## What Pages Must Share

- Wordmark and V monogram.
- Dark paper, Soft Brass action, warm memory line.
- Literata + Manrope + Spline Sans Mono.
- 8px to 14px control radii; no round card-heavy SaaS surfaces.
- Poster canvas as the primary visual signal.

## What Pages May Differ On

- Marketing pages may include guided screenshot sequences.
- App pages may vary rail density and panel placement by viewport.
- Content pages may use prose rhythm but keep the same tokens.

## Navigation Rules

- Top navigation is a quiet workbench rail, not a set of boxed buttons.
- Brand, design actions, and external/share actions are separate groups with
  visible rhythm; separators are hairlines or spacing, never chunky frames.
- The menu button always reflects the left panel state with `aria-expanded`.
- Share is a disclosed menu with explicit `aria-controls`; platform links stay
  secondary to Export.
- Left and mobile navigation items are stateful panel toggles. Active items may
  collapse their panel; labels and ARIA must describe that behavior.
- Navigation hover/focus uses brass surface changes only. No scale, bounce,
  cyan glow, or one-sided decorative tab borders.

## Location Search

- Location search is part of the workbench chrome, not an alert panel. Expanded
  states use dark paper glass, brass hairlines, and champagne text.
- Permission and loading messages should stay calm: brass/bronze status markers,
  no saturated blue panels, no red error blocks unless the action is destructive.
- Search input and location suggestions use Manrope. Spline Sans Mono is
  reserved for latitude/longitude fields and compact numeric readouts.
- First-run location choice lives inside the Place panel. The poster opens
  immediately with a default place; no modal or floating prompt should compete
  with the canvas.

## Left Panel Navigation

- The left rail is the only primary module switcher. Do not repeat Palette /
  Format style tabs inside the panel heading.
- Each panel starts with the desktop eyebrow/title and a single brass divider,
  then moves directly into compact controls. Internal all-caps labels are used
  only when they add grouping clarity.
- Selection inside dense option grids should be quiet: use a subtle fill,
  hairline border, or small status dot instead of stacked glow and heavy outer
  rings.

## Exports

### tokens.css

```css
:root {
  --color-paper: oklch(12% 0.018 243);
  --color-paper-2: oklch(16% 0.022 243);
  --color-paper-3: oklch(21% 0.026 243);
  --color-ink: #f4eddd;
  --color-ink-2: #cfc2a3;
  --color-muted: #8f8777;
  --color-rule: oklch(62% 0.055 78 / 0.28);
  --color-rule-soft: oklch(62% 0.055 78 / 0.16);
  --color-rule-strong: oklch(76% 0.075 82 / 0.42);
  --color-accent: oklch(82% 0.10 84);
  --color-accent-strong: oklch(89% 0.10 86);
  --color-accent-pressed: oklch(69% 0.12 68);
  --color-accent-ink: oklch(16% 0.035 72);
  --color-memory: oklch(72% 0.16 47);
  --color-focus: oklch(82% 0.10 84);

  --font-display: "Manrope", sans-serif;
  --font-body: "Manrope", sans-serif;
  --font-mono: "Spline Sans Mono", monospace;
  --font-brand: "Literata", serif;

  --space-3xs: 0.125rem;
  --space-2xs: 0.25rem;
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-short: 160ms;
  --radius-control: 8px;
  --radius-panel: 14px;
  --radius-sheet: 18px;
}
```
