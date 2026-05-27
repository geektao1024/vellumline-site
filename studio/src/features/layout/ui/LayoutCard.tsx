import type { CSSProperties } from "react";
import type { Layout } from "../domain/types";
import { formatLayoutDimensions } from "../infrastructure/layoutRepository";

function getLayoutFigureStyle(layoutOption: Layout): CSSProperties {
  const ratio = Math.max(
    0.18,
    Math.min(5.6, layoutOption.width / layoutOption.height),
  );
  const maxWidth = 70;
  const maxHeight = 38;
  let width = maxWidth;
  let height = width / ratio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * ratio;
  }

  return {
    "--layout-card-figure-width": `${Math.max(16, Math.round(width))}px`,
    "--layout-card-figure-height": `${Math.max(18, Math.round(height))}px`,
  } as CSSProperties;
}

interface LayoutCardProps {
  layoutOption: Layout | null;
  onClick?: () => void;
  isSelected?: boolean;
}

export default function LayoutCard({
  layoutOption,
  onClick,
  isSelected = false,
}: LayoutCardProps) {
  if (!layoutOption) {
    return null;
  }
  const className = ["layout-card", isSelected ? "is-selected" : ""]
    .filter(Boolean)
    .join(" ");
  const sizeText = formatLayoutDimensions(layoutOption);
  const figureStyle = getLayoutFigureStyle(layoutOption);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      <span
        className="layout-card-figure"
        style={figureStyle}
        aria-hidden="true"
      />
      <div className="layout-card-copy">
        <p className="layout-card-name">{layoutOption.name}</p>
        <p className="layout-card-meta">{sizeText}</p>
      </div>
    </button>
  );
}
