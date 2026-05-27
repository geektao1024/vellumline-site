import { useEffect, useRef, useState } from "react";
import { ADSENSE_AD_CLIENT } from "@/core/config";

interface AdUnitProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  label?: string;
  className?: string;
}

const HIDE_AFTER_MS = 10_000;
const ADSENSE_SCRIPT_ID = "adsense-runtime-script";

function ensureAdsenseScript(client: string) {
  if (typeof document === "undefined") return;
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return;

  const script = document.createElement("script");
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.appendChild(script);
}

export default function AdUnit({
  slot,
  format = "auto",
  label = "Ads keep Vellum & Line free",
  className,
}: AdUnitProps) {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!slot || !ADSENSE_AD_CLIENT) return;

    ensureAdsenseScript(ADSENSE_AD_CLIENT);

    // Push the ad unit only once per mount.
    if (!pushed.current) {
      pushed.current = true;
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // Ignore ad blockers or a script that has not loaded yet.
      }
    }

    const ins = insRef.current;
    if (!ins) return;

    // Watch for Google inserting an iframe. If it does, the ad is filled.
    // Cancel the timeout so the slot is never hidden.
    const observer = new MutationObserver(() => {
      if (ins.childElementCount > 0) {
        clearTimeout(timer);
        observer.disconnect();
      }
    });
    observer.observe(ins, { childList: true });

    // After 10s, if still empty, hide the whole slot (label + ins).
    // This only runs if the observer never detected a fill.
    const timer = setTimeout(() => {
      observer.disconnect();
      if (ins.childElementCount === 0) setHidden(true);
    }, HIDE_AFTER_MS);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [slot]);

  if (!ADSENSE_AD_CLIENT || !slot || hidden) return null;

  return (
    <div className={`ad-unit-slot${className ? ` ${className}` : ""}`}>
      <p className="panel-ad-label">{label}</p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
