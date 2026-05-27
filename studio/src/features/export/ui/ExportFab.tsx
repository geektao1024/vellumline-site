import { useEffect, useRef, useState } from "react";
import { useExport } from "@/features/export/application/useExport";
import type { ExportFormat } from "@/features/export/domain/types";
import {
  ChevronDownIcon,
  CloseIcon,
  DownloadIcon,
  LoaderIcon,
} from "@/shared/ui/Icons";
import SocialLinkGroup from "@/shared/ui/SocialLinkGroup";

const FORMAT_OPTIONS: { format: ExportFormat; label: string }[] = [
  { format: "png", label: "PNG" },
  { format: "pdf", label: "PDF" },
  { format: "svg", label: "RSVG" },
];

interface ExportFabProps {
  isMobile: boolean;
}

export default function ExportFab({ isMobile }: ExportFabProps) {
  const { isExporting, exportPoster } = useExport();
  const [isOpen, setIsOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState<ExportFormat | null>(null);
  const [isTriggerVisible, setIsTriggerVisible] = useState(true);
  const desktopMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isExporting && activeFormat) {
      setActiveFormat(null);
      setIsOpen(false);
    }
  }, [isExporting, activeFormat]);

  useEffect(() => {
    if (!isMobile) return;

    const FOOTER_OVERLAP_THRESHOLD_PX = 140;

    const updateVisibility = () => {
      const doc = document.documentElement;
      const scrolledToBottom =
        window.scrollY + window.innerHeight >=
        doc.scrollHeight - FOOTER_OVERLAP_THRESHOLD_PX;
      setIsTriggerVisible(!scrolledToBottom);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile || !isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (desktopMenuRef.current?.contains(event.target as Node)) return;
      if (!isExporting) setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isExporting) setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExporting, isMobile, isOpen]);

  const runExport = (format: ExportFormat) => {
    setActiveFormat(format);
    void exportPoster(format);
  };

  const triggerClass = isMobile
    ? `mobile-export-fab-trigger${isTriggerVisible ? "" : " is-hidden"}`
    : "export-fab-trigger-desktop";

  if (!isMobile) {
    return (
      <div
        className={`desktop-export-control${isOpen ? " is-open" : ""}`}
        ref={desktopMenuRef}
      >
        <button
          type="button"
          className={triggerClass}
          aria-label="Export poster"
          title="Export poster"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <DownloadIcon />
          <span>Export</span>
          <ChevronDownIcon className="desktop-export-chevron" />
        </button>

        {isOpen ? (
          <div className="desktop-export-menu" role="menu" aria-label="Export formats">
            {FORMAT_OPTIONS.map(({ format, label }) => (
              <button
                key={format}
                type="button"
                className={`desktop-export-menu-item desktop-export-menu-item--${format}`}
                onClick={() => runExport(format)}
                disabled={isExporting}
                role="menuitem"
              >
                {isExporting && activeFormat === format ? (
                  <LoaderIcon className="desktop-export-menu-icon is-spinning" />
                ) : (
                  <DownloadIcon className="desktop-export-menu-icon" />
                )}
                <span>{label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        className={triggerClass}
        aria-label="Export poster"
        title="Export poster"
        onClick={() => setIsOpen(true)}
        tabIndex={isMobile && !isTriggerVisible ? -1 : 0}
        aria-hidden={isMobile && !isTriggerVisible}
      >
        <DownloadIcon />
        {!isMobile && <span>Export</span>}
      </button>

      {isOpen ? (
        <div
          className="export-modal-backdrop"
          role="presentation"
          onClick={() => !isExporting && setIsOpen(false)}
        >
          <div
            className="export-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="export-modal-header">
              <h3 id="export-modal-title">Download Poster</h3>
              <button
                type="button"
                className="export-modal-close"
                onClick={() => !isExporting && setIsOpen(false)}
                aria-label="Close export options"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="export-modal-actions">
              {FORMAT_OPTIONS.map(({ format, label }) => (
                <button
                  key={format}
                  type="button"
                  className={`export-modal-option export-modal-option--${format}`}
                  onClick={() => runExport(format)}
                  disabled={isExporting}
                >
                  {isExporting && activeFormat === format ? (
                    <LoaderIcon className="export-modal-option-icon is-spinning" />
                  ) : (
                    <DownloadIcon className="export-modal-option-icon" />
                  )}
                  <span>{label}</span>
                </button>
              ))}
            </div>
            <p className="export-modal-support-label">Support the project</p>
            <SocialLinkGroup variant="mobile-export" />
          </div>
        </div>
      ) : null}
    </>
  );
}
