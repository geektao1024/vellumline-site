import { useEffect } from "react";
import { ensureGoogleFont } from "@/core/services";
import type { PosterForm } from "@/features/poster/application/posterReducer";
import { POSTER_TITLE_FONT_STACK, type FontOption } from "@/core/config";
import {
  PLACEHOLDER_EXAMPLE_CITY,
  PLACEHOLDER_EXAMPLE_COUNTRY,
} from "@/features/location/ui/constants";

interface TypographySectionProps {
  form: PosterForm;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  fontOptions: FontOption[];
}


export default function TypographySection({
  form,
  onChange,
  fontOptions,
}: TypographySectionProps) {
  useEffect(() => {
    const families = fontOptions
      .map((option) => String(option.value || "").trim())
      .filter(Boolean);

    void Promise.allSettled(families.map((family) => ensureGoogleFont(family)));
  }, [fontOptions]);

  return (
    <>
      <section className="panel-block typography-panel">
        <p className="section-summary-label">STYLE</p>
        <div className="typography-toggle-stack">
          <label className="toggle-field">
            <span>Poster text</span>
            <span className="theme-switch">
              <input
                type="checkbox"
                name="showPosterText"
                checked={Boolean(form.showPosterText)}
                onChange={onChange}
              />
              <span className="theme-switch-track" aria-hidden="true" />
            </span>
          </label>
          <label className="toggle-field">
            <span>Overlay layer</span>
            <span className="theme-switch">
              <input
                type="checkbox"
                name="showMarkers"
                checked={Boolean(form.showMarkers)}
                onChange={onChange}
              />
              <span className="theme-switch-track" aria-hidden="true" />
            </span>
          </label>
        </div>

        <div className="field-grid keep-two-mobile">
          <label>
            Display city
            <input
              className="form-control-tall"
              name="displayCity"
              value={form.displayCity}
              onChange={onChange}
              placeholder={PLACEHOLDER_EXAMPLE_CITY}
            />
          </label>
          <label>
            Display country
            <input
              className="form-control-tall"
              name="displayCountry"
              value={form.displayCountry}
              onChange={onChange}
              placeholder={PLACEHOLDER_EXAMPLE_COUNTRY}
            />
          </label>
        </div>
        <label className="typography-font-field">
          Font
          <select
            className="form-control-tall"
            name="fontFamily"
            value={form.fontFamily}
            onChange={onChange}
          >
            {fontOptions.map((fontOption) => (
              <option
                key={fontOption.value || "default"}
                value={fontOption.value}
                style={{
                  fontFamily: fontOption.value
                    ? `"${fontOption.value}", ${POSTER_TITLE_FONT_STACK}`
                    : POSTER_TITLE_FONT_STACK,
                }}
              >
                {fontOption.label}
              </option>
            ))}
          </select>
        </label>

      </section>
    </>
  );
}
