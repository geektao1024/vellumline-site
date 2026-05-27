import { useState } from "react";
import { usePosterContext } from "@/features/poster/ui/PosterContext";
import { useFormHandlers } from "@/features/poster/application/useFormHandlers";
import { useLocationAutocomplete } from "@/features/location/application/useLocationAutocomplete";
import { useCurrentLocation } from "@/features/location/application/useCurrentLocation";
import { useMapSync } from "@/features/map/application/useMapSync";
import type { MobileTab } from "@/shared/ui/MobileNavBar";

import LocationSection from "@/features/location/ui/LocationSection";
import MapSettingsSection from "@/features/map/ui/MapSettingsSection";
import LayersSection from "@/features/map/ui/LayersSection";
import MarkersSection from "@/features/markers/ui/MarkersSection";
import RoutesSection from "@/features/routes/ui/RoutesSection";
import TypographySection from "@/features/poster/ui/TypographySection";
import {
  LocationIcon,
  ThemeIcon,
  LayoutIcon,
  LayersIcon,
  MarkersIcon,
  RouteIcon,
  StyleIcon,
  ChevronDownIcon,
} from "@/shared/ui/Icons";

import { themeOptions } from "@/features/theme/infrastructure/themeRepository";
import { layoutGroups } from "@/features/layout/infrastructure/layoutRepository";
import {
  MIN_POSTER_CM,
  MAX_POSTER_CM,
  FONT_OPTIONS,
} from "@/core/config";
import type { SearchResult } from "@/features/location/domain/types";

type SectionId =
  | "location"
  | "theme"
  | "layout"
  | "layers"
  | "markers"
  | "routes"
  | "style";

const accordionSections: {
  id: SectionId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "location", label: "Location", Icon: LocationIcon },
  { id: "theme", label: "Theme", Icon: ThemeIcon },
  { id: "layout", label: "Layout", Icon: LayoutIcon },
  { id: "layers", label: "Layers", Icon: LayersIcon },
  { id: "markers", label: "Markers", Icon: MarkersIcon },
  { id: "routes", label: "Routes", Icon: RouteIcon },
  { id: "style", label: "Style", Icon: StyleIcon },
];

const desktopPanelCopy: Record<MobileTab, { title: string; eyebrow: string }> = {
  location: { title: "Place", eyebrow: "Location" },
  theme: { title: "Palette", eyebrow: "Template" },
  layout: { title: "Format", eyebrow: "Template" },
  style: { title: "Style", eyebrow: "Properties" },
  layers: { title: "Layers", eyebrow: "Properties" },
  markers: { title: "Markers", eyebrow: "Properties" },
  routes: { title: "Routes", eyebrow: "Properties" },
};

const getAccordionHeaderId = (id: SectionId) => `settings-section-${id}-header`;
const getAccordionBodyId = (id: SectionId) => `settings-section-${id}-panel`;

export default function SettingsPanel({
  mobileTab,
}: {
  mobileTab?: MobileTab;
}) {
  const { state, dispatch, mapRef, selectedTheme } = usePosterContext();
  const {
    handleChange,
    handleNumericFieldBlur,
    handleThemeChange,
    handleLayoutChange,
    handleColorChange,
    handleResetColors,
    handleLocationSelect,
    handleClearLocation,
    setLocationFocused,
    handleCreditsChange,
  } = useFormHandlers();
  const { locationSuggestions, isLocationSearching, searchNow } = useLocationAutocomplete(
    state.form.location,
    state.isLocationFocused,
  );
  const { flyToLocation } = useMapSync(state, dispatch, mapRef);
  const { handleUseCurrentLocation, isLocatingUser, locationPermissionMessage } =
    useCurrentLocation(flyToLocation);

  const [isColorEditorActive, setIsColorEditorActive] = useState(false);
  const [openSections, setOpenSections] = useState<Set<SectionId>>(
    new Set(["location", "theme", "layout", "style"]),
  );

  const isAuxEditorActive = isColorEditorActive;
  const showLocationSuggestions =
    state.isLocationFocused && locationSuggestions.length > 0;
  const desktopCopy = desktopPanelCopy[mobileTab ?? "theme"];

  const toggleSection = (id: SectionId) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const onLocationSelect = (location: SearchResult) => {
    handleLocationSelect(location);
    flyToLocation(location.lat, location.lon);
  };

  return (
    <form
      className="settings-panel"
      aria-label={`${desktopCopy.title} settings`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="desktop-panel-heading">
        <p className="desktop-panel-eyebrow">{desktopCopy.eyebrow}</p>
        <h2>{desktopCopy.title}</h2>
      </div>

      <div
        className={`mobile-section mobile-section--location accordion-item${openSections.has("location") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="location"
          label={accordionSections[0].label}
          Icon={accordionSections[0].Icon}
          isOpen={openSections.has("location")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("location")}
          aria-labelledby={getAccordionHeaderId("location")}
          className={`accordion-body${openSections.has("location") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isColorEditorActive ? (
              <LocationSection
                form={state.form}
                onChange={handleChange}
                onLocationFocus={() => setLocationFocused(true)}
                onLocationBlur={() => setLocationFocused(false)}
                searchNow={searchNow}
                showLocationSuggestions={showLocationSuggestions}
                locationSuggestions={locationSuggestions}
                isLocationSearching={isLocationSearching}
                onLocationSelect={onLocationSelect}
                onClearLocation={handleClearLocation}
                onUseCurrentLocation={handleUseCurrentLocation}
                isLocatingUser={isLocatingUser}
                locationPermissionMessage={locationPermissionMessage}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={`mobile-section mobile-section--theme-settings accordion-item${openSections.has("theme") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="theme"
          label={accordionSections[1].label}
          Icon={accordionSections[1].Icon}
          isOpen={openSections.has("theme")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("theme")}
          aria-labelledby={getAccordionHeaderId("theme")}
          className={`accordion-body${openSections.has("theme") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isColorEditorActive ? (
              <MapSettingsSection
                activeMobileTab={mobileTab}
                form={state.form}
                onChange={handleChange}
                onNumericFieldBlur={handleNumericFieldBlur}
                onThemeChange={handleThemeChange}
                onLayoutChange={handleLayoutChange}
                selectedTheme={selectedTheme}
                themeOptions={themeOptions}
                layoutGroups={layoutGroups}
                minPosterCm={MIN_POSTER_CM}
                maxPosterCm={MAX_POSTER_CM}
                customColors={state.customColors}
                onColorChange={handleColorChange}
                onResetColors={handleResetColors}
                onColorEditorActiveChange={setIsColorEditorActive}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={`mobile-section mobile-section--layout-settings accordion-item${openSections.has("layout") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="layout"
          label={accordionSections[2].label}
          Icon={accordionSections[2].Icon}
          isOpen={openSections.has("layout")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("layout")}
          aria-labelledby={getAccordionHeaderId("layout")}
          className={`accordion-body${openSections.has("layout") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isColorEditorActive ? (
              <MapSettingsSection
                activeMobileTab={mobileTab}
                form={state.form}
                onChange={handleChange}
                onNumericFieldBlur={handleNumericFieldBlur}
                onThemeChange={handleThemeChange}
                onLayoutChange={handleLayoutChange}
                selectedTheme={selectedTheme}
                themeOptions={themeOptions}
                layoutGroups={layoutGroups}
                minPosterCm={MIN_POSTER_CM}
                maxPosterCm={MAX_POSTER_CM}
                customColors={state.customColors}
                onColorChange={handleColorChange}
                onResetColors={handleResetColors}
                onColorEditorActiveChange={setIsColorEditorActive}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={`mobile-section mobile-section--layers accordion-item${openSections.has("layers") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="layers"
          label={accordionSections[3].label}
          Icon={accordionSections[3].Icon}
          isOpen={openSections.has("layers")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("layers")}
          aria-labelledby={getAccordionHeaderId("layers")}
          className={`accordion-body${openSections.has("layers") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isAuxEditorActive ? (
              <LayersSection
                form={state.form}
                onChange={handleChange}
                minPosterCm={MIN_POSTER_CM}
                maxPosterCm={MAX_POSTER_CM}
                onNumericFieldBlur={handleNumericFieldBlur}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div
        className={`mobile-section mobile-section--markers accordion-item${openSections.has("markers") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="markers"
          label={accordionSections[4].label}
          Icon={accordionSections[4].Icon}
          isOpen={openSections.has("markers")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("markers")}
          aria-labelledby={getAccordionHeaderId("markers")}
          className={`accordion-body${openSections.has("markers") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isColorEditorActive ? <MarkersSection /> : null}
          </div>
        </div>
      </div>

      <div
        className={`mobile-section mobile-section--routes accordion-item${openSections.has("routes") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="routes"
          label={accordionSections[5].label}
          Icon={accordionSections[5].Icon}
          isOpen={openSections.has("routes")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("routes")}
          aria-labelledby={getAccordionHeaderId("routes")}
          className={`accordion-body${openSections.has("routes") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isColorEditorActive ? <RoutesSection /> : null}
          </div>
        </div>
      </div>

      <div
        className={`mobile-section mobile-section--style accordion-item${openSections.has("style") ? " accordion-item--open" : ""}`}
      >
        <AccordionHeader
          sectionId="style"
          label={accordionSections[6].label}
          Icon={accordionSections[6].Icon}
          isOpen={openSections.has("style")}
          onToggle={toggleSection}
        />
        <div
          id={getAccordionBodyId("style")}
          aria-labelledby={getAccordionHeaderId("style")}
          className={`accordion-body${openSections.has("style") ? " is-open" : ""}`}
        >
          <div className="accordion-body-inner">
            {!isAuxEditorActive ? (
              <TypographySection
                form={state.form}
                onChange={handleChange}
                fontOptions={FONT_OPTIONS}
              />
            ) : null}
          </div>
        </div>
      </div>

      {!isAuxEditorActive && state.error ? <p className="error">{state.error}</p> : null}
    </form>
  );
}

function AccordionHeader({
  sectionId,
  label,
  Icon,
  isOpen,
  onToggle,
}: {
  sectionId: SectionId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  isOpen: boolean;
  onToggle: (id: SectionId) => void;
}) {
  return (
    <button
      type="button"
      id={getAccordionHeaderId(sectionId)}
      className={`accordion-header${isOpen ? " is-open" : ""}`}
      onClick={() => onToggle(sectionId)}
      aria-expanded={isOpen}
      aria-controls={getAccordionBodyId(sectionId)}
    >
      <Icon className="accordion-icon" />
      <span className="accordion-label">{label}</span>
      <ChevronDownIcon className="accordion-chevron" />
    </button>
  );
}
