import { useEffect, useMemo, useRef, useState } from "react";
import {
  AddIcon,
  ChevronDownIcon,
  FacebookIcon,
  LinkedInIcon,
  MenuIcon,
  RedditIcon,
  ShareIcon,
  XIcon,
} from "@/shared/ui/Icons";
import SocialLinkGroup from "@/shared/ui/SocialLinkGroup";

interface GeneralHeaderProps {
  onMenuToggle?: () => void;
  onNewDesign?: () => void;
  panelOpen?: boolean;
}

export default function GeneralHeader({
  onMenuToggle,
  onNewDesign,
  panelOpen,
}: GeneralHeaderProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement | null>(null);
  const shareMenuId = "workspace-share-popover";
  const isPanelToggleAvailable = typeof onMenuToggle === "function";

  useEffect(() => {
    if (!isShareOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (shareMenuRef.current?.contains(event.target as Node)) return;
      setIsShareOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsShareOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isShareOpen]);

  const shareOptions = useMemo(() => {
    const pageUrl =
      typeof window === "undefined" ? "https://vellumline.app" : window.location.href;
    const shareTitle = "Vellum & Line";
    const shareText = "Custom map art for meaningful places.";
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(`${shareTitle} - ${shareText}`);

    return [
      {
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        Icon: XIcon,
        label: "X / Twitter",
      },
      {
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        Icon: FacebookIcon,
        label: "Facebook",
      },
      {
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        Icon: LinkedInIcon,
        label: "LinkedIn",
      },
      {
        href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
        Icon: RedditIcon,
        label: "Reddit",
      },
    ];
  }, []);

  return (
    <header className="general-header">
      <div className="workspace-header-left">
        <button
          type="button"
          className={`workspace-icon-btn workspace-menu-btn${panelOpen ? " is-active" : ""}`}
          onClick={onMenuToggle}
          aria-label={panelOpen ? "Collapse editor panel" : "Open editor panel"}
          title={panelOpen ? "Collapse editor panel" : "Open editor panel"}
          aria-expanded={isPanelToggleAvailable ? Boolean(panelOpen) : undefined}
          aria-controls={isPanelToggleAvailable ? "desktop-settings-panel" : undefined}
        >
          <MenuIcon />
        </button>

        <a
          className="desktop-brand"
          href="/"
          aria-label="Back to Vellum & Line homepage"
        >
          <img
            className="desktop-brand-logo brand-logo"
            src={`${import.meta.env.BASE_URL}assets/logo.svg`}
            alt="Vellum & Line logo"
          />
          <div className="desktop-brand-copy brand-copy">
            <h1 className="desktop-brand-title">Vellum & Line</h1>
            <p className="desktop-brand-kicker app-kicker">
              Custom Map Art for Meaningful Places
            </p>
          </div>
        </a>
      </div>

      <div className="workspace-toolbar" aria-label="Design actions">
        <button
          type="button"
          className="workspace-tool-btn"
          onClick={onNewDesign}
          title="Start a new design"
        >
          <AddIcon />
          <span>New map</span>
        </button>
      </div>

      <div className="general-header-actions">
        <SocialLinkGroup variant="header" />
        <div
          className={`workspace-share-menu${isShareOpen ? " is-open" : ""}`}
          ref={shareMenuRef}
        >
          <button
            type="button"
            className="workspace-action-btn workspace-share-trigger"
            onClick={() => setIsShareOpen((open) => !open)}
            aria-label="Share"
            title="Share"
            aria-expanded={isShareOpen}
            aria-haspopup="menu"
            aria-controls={isShareOpen ? shareMenuId : undefined}
          >
            <ShareIcon />
            <span>Share</span>
            <ChevronDownIcon className="workspace-share-chevron" />
          </button>
          {isShareOpen ? (
            <div
              id={shareMenuId}
              className="workspace-share-popover"
              role="menu"
              aria-label="Share"
            >
              {shareOptions.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  className="workspace-share-option"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  role="menuitem"
                  onClick={() => setIsShareOpen(false)}
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
