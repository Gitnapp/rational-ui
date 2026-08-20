import type { ReactNode } from "react";

// Shared layout primitives for every component demo section in the gallery.
// Keep these dumb — no design decisions belong here beyond what design.md
// already encodes in @garage/design-tokens (spacing scale, card surface).

export function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly children: ReactNode;
}) {
  return (
    // content-visibility defers off-screen sections' layout/paint — with 41
    // of these stacked on one page, that's most of them at any given scroll
    // position (vercel react-best-practices: rendering-content-visibility).
    // `auto` in contain-intrinsic-size remembers each section's real height
    // after it's first measured, so the 400px guess only matters pre-render.
    <section
      id={id}
      className="scroll-mt-20 space-y-4 [content-visibility:auto] [contain-intrinsic-size:auto_400px]"
    >
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      <div className="rounded-lg border bg-card p-6 text-card-foreground">{children}</div>
    </section>
  );
}

// One labeled example (e.g. a single button variant). Stack multiple inside
// a <VariantRow> to lay them out like a swatch grid.
export function Variant({
  label,
  children,
}: {
  readonly label: string;
  readonly children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export function VariantRow({ children }: { readonly children: ReactNode }) {
  return <div className="flex flex-wrap items-start gap-6">{children}</div>;
}

// Vertical stack for demos that don't fit the swatch-grid shape (forms,
// tables, calendars, long-form content).
export function Stack({ children }: { readonly children: ReactNode }) {
  return <div className="flex flex-col items-start gap-4">{children}</div>;
}
