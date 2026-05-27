import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { usePosterContext } from "./PosterContext";
import { useMapSync } from "@/features/map/application/useMapSync";
import MapPreview from "@/features/map/ui/MapPreview";
import AdUnit from "@/shared/ui/AdUnit";
import { AD_SLOT_SIDEBAR } from "@/core/config";
import MarkerOverlay from "@/features/markers/ui/MarkerOverlay";
import RouteOverlay from "@/features/routes/ui/RouteOverlay";
import RouteEndpointsOverlay from "@/features/routes/ui/RouteEndpointsOverlay";
import GradientFades from "./GradientFades";
import PosterTextOverlay from "./PosterTextOverlay";
import SettingsInfo from "./SettingsInfo";
import MapPrimaryControls from "./MapPrimaryControls";
import {
  PlusIcon,
  MinusIcon,
  RotateIcon,
  ResetIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/shared/ui/Icons";
import {
  MAP_BUTTON_ZOOM_DURATION_MS,
  MAP_BUTTON_ZOOM_STEP,
} from "@/features/map/infrastructure";
import {
  DEFAULT_POSTER_WIDTH_CM,
  DEFAULT_POSTER_HEIGHT_CM,
  DEFAULT_DISTANCE_METERS,
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_CITY,
  DEFAULT_COUNTRY,
} from "@/core/config";
import { ensureGoogleFont, reverseGeocodeCoordinates } from "@/core/services";
import {
  createCustomLayoutOption,
  formatLayoutDimensions,
  getLayoutOption,
} from "@/features/layout/infrastructure/layoutRepository";
import type { PosterForm } from "@/features/poster/application/posterReducer";

const LOCKED_HINT = "Map is locked to prevent unintended movement.";
const UNLOCK_HINT = `${LOCKED_HINT}\nClick to unlock map editing.`;
const RECENTER_HINT = "Recenter map to the current location";
const COUNTRY_VIEW_ZOOM_LEVEL = 10;
const CONTINENT_VIEW_ZOOM_LEVEL = 6;
const DEFAULT_LOCATION_LABEL =
  "New York, New York, United States";
const RIGHT_PANEL_COLLAPSE_LABEL = "Collapse right sidebar";
const RIGHT_PANEL_EXPAND_LABEL = "Expand right sidebar";

export default function PreviewPanel() {
  const { state, dispatch, effectiveTheme, mapStyle, mapRef } =
    usePosterContext();
  const {
    form,
    selectedLocation,
    userLocation,
    isMarkerEditorActive,
    activeMarkerId,
  } = state;
  const hasVisibleMarkers = form.showMarkers && state.markers.length > 0;
  const {
    mapCenter,
    mapZoom,
    mapMinZoom,
    mapMaxZoom,
    handleMove,
    handleMoveEnd,
    setContainerWidth,
    overzoomScale,
  } = useMapSync(state, dispatch, mapRef);

  const frameRef = useRef<HTMLDivElement | null>(null);
  const ghostCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [mapBearing, setMapBearing] = useState(0);
  const [isRotationEnabled, setIsRotationEnabled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(true);
  const [previewZoom, setPreviewZoom] = useState(mapZoom);
  const rightPanelToggleLabel = isPropertiesPanelOpen
    ? RIGHT_PANEL_COLLAPSE_LABEL
    : RIGHT_PANEL_EXPAND_LABEL;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(
      "(max-width: 768px), (hover: none) and (pointer: coarse)",
    );
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);
    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    setPreviewZoom(mapZoom);
  }, [mapZoom]);

  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [setContainerWidth]);

  useEffect(() => {
    const family = form.fontFamily.trim();
    if (!family) return;

    void ensureGoogleFont(family).catch(() => {
      // Ignore font loading failures; fallback stack remains in place.
    });
  }, [form.fontFamily]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const syncBearing = () => {
      setMapBearing(map.getBearing());
    };

    map.on("rotate", syncBearing);
    return () => {
      map.off("rotate", syncBearing);
    };
  }, [mapRef]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const syncGhostCanvas = () => {
      const ghost = ghostCanvasRef.current;
      if (!ghost) return;
      const src = map.getCanvas();
      if (!src) return;

      if (ghost.width !== src.width || ghost.height !== src.height) {
        ghost.width = src.width;
        ghost.height = src.height;
      }

      const ctx = ghost.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(src, 0, 0);
    };

    map.on("render", syncGhostCanvas);
    return () => {
      map.off("render", syncGhostCanvas);
    };
  }, [mapRef]);

  useEffect(() => {
    if (!isMarkerEditorActive) {
      return;
    }
    setIsEditing(false);
    setIsRotationEnabled(false);
  }, [isMarkerEditorActive]);

  const widthCm = Number(form.width) || DEFAULT_POSTER_WIDTH_CM;
  const heightCm = Number(form.height) || DEFAULT_POSTER_HEIGHT_CM;
  const aspect = widthCm / heightCm;
  const formLat = Number(form.latitude) || 0;
  const formLon = Number(form.longitude) || 0;
  const layoutOption =
    getLayoutOption(form.layout) ?? createCustomLayoutOption(widthCm, heightCm);
  const posterSizeLabel = formatLayoutDimensions(layoutOption);
  const layoutLabel = `${layoutOption.name} (${formatLayoutDimensions(layoutOption)})`;
  const infoLocationLabel =
    [form.displayCity, form.displayCountry].filter(Boolean).join(", ") ||
    form.location ||
    DEFAULT_LOCATION_LABEL;
  const infoLayoutLabel = layoutOption.name;
  const markerCount = state.markers.length;
  const markersLabel = `${markerCount} marker${markerCount === 1 ? "" : "s"}`;
  const coordinatesLabel = `${formLat.toFixed(4)}, ${formLon.toFixed(4)}`;
  const isCityCountryView = mapZoom >= COUNTRY_VIEW_ZOOM_LEVEL;
  const isCountryContinentView =
    mapZoom >= CONTINENT_VIEW_ZOOM_LEVEL && mapZoom < COUNTRY_VIEW_ZOOM_LEVEL;
  const cityLabel = isCityCountryView
    ? form.displayCity || form.location || "New York"
    : isCountryContinentView
      ? form.displayCountry || "United States"
      : form.displayContinent || "Earth";
  const countryLabel = isCityCountryView
    ? form.displayCountry || "United States"
    : isCountryContinentView
      ? form.displayContinent || "North America"
      : "Earth";

  const handleStartEditing = useCallback(() => {
    setIsEditing(true);
    const map = mapRef.current;
    if (map) {
      setMapBearing(map.getBearing());
    }
  }, [mapRef]);

  const handleFinishEditing = useCallback(() => {
    setIsEditing(false);
    setIsRotationEnabled(false);
  }, []);

  const handleToggleRotation = useCallback(() => {
    setIsRotationEnabled((prev) => !prev);
  }, []);

  const handleTogglePropertiesPanel = useCallback(() => {
    setIsPropertiesPanelOpen((current) => !current);
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || typeof window === "undefined") return;

    const delays = [0, 80, 180, 280];
    const timeoutIds = delays.map((delay) =>
      window.setTimeout(() => {
        map.resize();
      }, delay),
    );

    return () => {
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, [isPropertiesPanelOpen, mapRef]);

  const handleZoomIn = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextZoom = Math.min(map.getZoom() + MAP_BUTTON_ZOOM_STEP, mapMaxZoom);
    if (Math.abs(nextZoom - map.getZoom()) < 0.0001) return;

    setPreviewZoom(nextZoom);
    map.zoomTo(nextZoom, { duration: MAP_BUTTON_ZOOM_DURATION_MS });
  }, [mapRef, mapMaxZoom]);

  const handleZoomOut = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextZoom = Math.max(map.getZoom() - MAP_BUTTON_ZOOM_STEP, mapMinZoom);
    if (Math.abs(nextZoom - map.getZoom()) < 0.0001) return;

    setPreviewZoom(nextZoom);
    map.zoomTo(nextZoom, { duration: MAP_BUTTON_ZOOM_DURATION_MS });
  }, [mapRef, mapMinZoom]);

  const handleRotationSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const map = mapRef.current;
      if (!map) return;
      const nextBearing = Number(event.target.value);
      if (!Number.isFinite(nextBearing)) return;
      setMapBearing(nextBearing);
      map.rotateTo(nextBearing, { duration: MAP_BUTTON_ZOOM_DURATION_MS });
    },
    [mapRef],
  );

  const handleResetRotation = useCallback(
    () => {
      const map = mapRef.current;
      if (!map) return;
      setMapBearing(0);
      map.rotateTo(0, { duration: MAP_BUTTON_ZOOM_DURATION_MS });
    },
    [mapRef],
  );

  const handleRecenter = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const target = selectedLocation ||
      userLocation || {
        id: "fallback:default",
        label: DEFAULT_LOCATION_LABEL,
        city: DEFAULT_CITY,
        country: DEFAULT_COUNTRY,
        continent: "North America",
        lat: DEFAULT_LAT,
        lon: DEFAULT_LON,
      };
    const applyTarget = (
      city: string,
      country: string,
      continent: string,
      label: string,
      includeCoordinates = true,
    ) => {
      dispatch({
        type: "SET_FORM_FIELDS",
        resetDisplayNameOverrides: true,
        fields: {
          ...(includeCoordinates
            ? {
                location: label,
                latitude: target.lat.toFixed(6),
                longitude: target.lon.toFixed(6),
                distance: String(DEFAULT_DISTANCE_METERS),
              }
            : { location: label }),
          displayCity: city,
          displayCountry: country,
          displayContinent: continent,
        },
      });
    };

    const city = String(target.city ?? "").trim();
    const country = String(target.country ?? "").trim();
    const continent = String(target.continent ?? "").trim();
    const label = String(target.label ?? "").trim() || DEFAULT_LOCATION_LABEL;
    map.stop();
    map.jumpTo({
      bearing: 0,
      pitch: 0,
    });
    setMapBearing(0);

    if (city && country) {
      // All display names known — single dispatch with coordinates + correct names.
      applyTarget(city, country, continent || "North America", label, true);
      return;
    }

    // Coordinates known but names aren't — set coordinates with fallback names
    // immediately, then overwrite names once reverse-geocoding resolves.
    applyTarget(DEFAULT_CITY, DEFAULT_COUNTRY, "North America", label, true);

    void reverseGeocodeCoordinates(target.lat, target.lon)
      .then((resolved) => {
        dispatch({ type: "SET_USER_LOCATION", location: resolved });
        dispatch({
          type: "SET_FORM_FIELDS",
          resetDisplayNameOverrides: true,
          fields: {
            displayCity: String(resolved.city ?? "").trim() || DEFAULT_CITY,
            displayCountry:
              String(resolved.country ?? "").trim() || DEFAULT_COUNTRY,
            displayContinent:
              String(resolved.continent ?? "").trim() || "North America",
          },
        });
      })
      .catch(() => {
        // fallback names already applied above — nothing more to do.
      });
  }, [mapRef, selectedLocation, userLocation, dispatch]);

  const handleMarkerPositionChange = useCallback(
    (markerId: string, lat: number, lon: number) => {
      dispatch({
        type: "UPDATE_MARKER",
        markerId,
        changes: { lat, lon },
      });
    },
    [dispatch],
  );

  const handleMarkerActiveChange = useCallback(
    (markerId: string | null) => {
      dispatch({ type: "SET_ACTIVE_MARKER", markerId });
    },
    [dispatch],
  );

  const handleMarkerSizeChange = useCallback(
    (markerId: string, size: number) => {
      dispatch({
        type: "UPDATE_MARKER",
        markerId,
        changes: { size },
      });
    },
    [dispatch],
  );

  const propertyToggles: Array<{
    field: keyof PosterForm;
    group: string;
    label: string;
    checked: boolean;
  }> = [
    {
      field: "showPosterText",
      group: "Card",
      label: "Poster Text",
      checked: form.showPosterText,
    },
    {
      field: "includeCredits",
      group: "Card",
      label: "Credits",
      checked: form.includeCredits,
    },
    {
      field: "showMarkers",
      group: "Card",
      label: "Overlay",
      checked: form.showMarkers,
    },
    {
      field: "includeWater",
      group: "Map Layers",
      label: "Water",
      checked: form.includeWater,
    },
    {
      field: "includeLandcover",
      group: "Map Layers",
      label: "Landcover",
      checked: form.includeLandcover,
    },
    {
      field: "includeParks",
      group: "Map Layers",
      label: "Parks",
      checked: form.includeParks,
    },
    {
      field: "includeBuildings",
      group: "Map Layers",
      label: "Buildings",
      checked: form.includeBuildings,
    },
    {
      field: "includeRoads",
      group: "Map Layers",
      label: "Roads",
      checked: form.includeRoads,
    },
    {
      field: "includeRail",
      group: "Map Layers",
      label: "Rail",
      checked: form.includeRail,
    },
    {
      field: "includeAeroway",
      group: "Map Layers",
      label: "Aeroway",
      checked: form.includeAeroway,
    },
    {
      field: "includeRoadPath",
      group: "Road Detail",
      label: "Paths",
      checked: form.includeRoadPath,
    },
    {
      field: "includeRoadMinorLow",
      group: "Road Detail",
      label: "Minor Roads",
      checked: form.includeRoadMinorLow,
    },
    {
      field: "includeRoadOutline",
      group: "Road Detail",
      label: "Outlines",
      checked: form.includeRoadOutline,
    },
    {
      field: "showRoutes",
      group: "Data Overlays",
      label: "GPX Routes",
      checked: form.showRoutes,
    },
  ];

  const handlePropertyToggle = useCallback(
    (field: keyof PosterForm, checked: boolean) => {
      dispatch({
        type: "SET_FORM_FIELDS",
        fields: { [field]: checked } as Partial<PosterForm>,
      });
    },
    [dispatch],
  );

  const zoomProgress = Math.max(
    0,
    Math.min(
      100,
      ((previewZoom - mapMinZoom) / Math.max(mapMaxZoom - mapMinZoom, 1)) * 100,
    ),
  );
  const zoomDisplayValue = Math.round(previewZoom * 10);
  const canZoomOut = previewZoom > mapMinZoom + 0.001;
  const canZoomIn = previewZoom < mapMaxZoom - 0.001;
  const rotationDisplayValue = Math.max(
    -180,
    Math.min(180, Math.round(mapBearing)),
  );
  const rotationProgress = ((rotationDisplayValue + 180) / 360) * 100;
  const canResetRotation = Math.abs(mapBearing) > 0.5;

  const zoomControls = !isMobileViewport ? (
    <div
      className="map-control-group map-control-zoom-stepper"
      style={
        {
          "--zoom-progress": `${zoomProgress}%`,
        } as CSSProperties
      }
      role="group"
      aria-label="Zoom controls"
    >
      <button
        type="button"
        className="map-control-btn map-control-zoom-btn"
        onClick={handleZoomOut}
        disabled={!canZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
      >
        <MinusIcon />
      </button>
      <div
        className="map-control-zoom-readout"
        aria-label={`Zoom level ${zoomDisplayValue}`}
        aria-live="polite"
      >
        <span className="map-control-zoom-label">Zoom</span>
        <span className="map-control-zoom-value">{zoomDisplayValue}</span>
        <span className="map-control-zoom-meter" aria-hidden="true" />
      </div>
      <button
        type="button"
        className="map-control-btn map-control-zoom-btn"
        onClick={handleZoomIn}
        disabled={!canZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
      >
        <PlusIcon />
      </button>
    </div>
  ) : null;

  return (
    <section
      className="preview-panel"
      data-properties-panel={isPropertiesPanelOpen ? "open" : "closed"}
    >
      <div className="poster-viewport">
        {/* Desktop ghost layer: canvas clone of the main map at reduced opacity */}
        <div className="poster-ghost-layer" aria-hidden="true">
          <canvas
            ref={ghostCanvasRef}
            className="poster-ghost-canvas"
          />
        </div>
        <div className="desktop-layout-label" aria-hidden="true">
          {layoutLabel}
        </div>
        <div
          ref={frameRef}
          className="poster-frame"
          style={
            {
              "--poster-aspect": `${aspect}`,
              "--poster-bg": effectiveTheme.ui.bg,
            } as CSSProperties
          }
        >
          <MapPreview
            style={mapStyle}
            center={mapCenter}
            zoom={mapZoom}
            mapRef={mapRef}
            interactive={isEditing && !isMarkerEditorActive}
            allowRotation={isEditing && isRotationEnabled}
            minZoom={mapMinZoom}
            maxZoom={mapMaxZoom}
            overzoomScale={overzoomScale}
            onMove={handleMove}
            onMoveEnd={handleMoveEnd}
          />
          {form.showMarkers ? (
            <GradientFades color={effectiveTheme.ui.bg} />
          ) : null}
          <RouteOverlay
            routes={state.routes}
            mapRef={mapRef}
            visible={form.showRoutes}
            overzoomScale={overzoomScale}
          />
          <RouteEndpointsOverlay
            routes={state.routes}
            customIcons={state.customMarkerIcons}
            mapRef={mapRef}
            visible={form.showRoutes}
            overzoomScale={overzoomScale}
          />
          {hasVisibleMarkers ? (
            <MarkerOverlay
              markers={state.markers}
              customIcons={state.customMarkerIcons}
              mapRef={mapRef}
              isMarkerEditMode={isMarkerEditorActive}
              activeMarkerId={activeMarkerId}
              onActiveMarkerChange={handleMarkerActiveChange}
              onMarkerPositionChange={handleMarkerPositionChange}
              onMarkerSizeChange={handleMarkerSizeChange}
              overzoomScale={overzoomScale}
            />
          ) : null}
          <PosterTextOverlay
            city={cityLabel}
            country={countryLabel}
            lat={formLat}
            lon={formLon}
            fontFamily={form.fontFamily}
            textColor={effectiveTheme.ui.text}
            landColor={effectiveTheme.map.land}
            showPosterText={form.showPosterText}
            includeCredits={form.includeCredits}
            showOverlay={form.showMarkers}
          />

          <div className="map-controls" aria-label="Map controls">
            {!isEditing ? (
              <>
                <div className="map-control-group">
                  <MapPrimaryControls
                    isMapEditing={false}
                    isMarkerEditorActive={isMarkerEditorActive}
                    recenterHint={RECENTER_HINT}
                    unlockHint={UNLOCK_HINT}
                    onRecenter={handleRecenter}
                    onStartEditing={handleStartEditing}
                    onFinishEditing={handleFinishEditing}
                  />
                </div>
                {zoomControls}
              </>
            ) : (
              <>
                <div className="map-control-group">
                  <MapPrimaryControls
                    isMapEditing
                    isMarkerEditorActive={isMarkerEditorActive}
                    recenterHint={RECENTER_HINT}
                    unlockHint={UNLOCK_HINT}
                    onRecenter={handleRecenter}
                    onStartEditing={handleStartEditing}
                    onFinishEditing={handleFinishEditing}
                  />
                  {isMobileViewport ? (
                    <button
                      type="button"
                      className={`map-control-btn${isRotationEnabled ? " is-active" : ""}`}
                      onClick={handleToggleRotation}
                      title={
                        isRotationEnabled
                          ? "Disable rotation"
                          : "Enable rotation"
                      }
                    >
                      <RotateIcon />
                      <span>
                        {isRotationEnabled
                          ? "Disable Rotation"
                          : "Enable Rotation"}
                      </span>
                    </button>
                  ) : null}
                </div>
                {!isMobileViewport ? (
                  <div className="map-control-group">
                    <button
                      type="button"
                      className={`map-control-btn${isRotationEnabled ? " is-active" : ""}`}
                      onClick={handleToggleRotation}
                      title={
                        isRotationEnabled
                          ? "Disable rotation"
                          : "Enable rotation"
                      }
                    >
                      <RotateIcon />
                      <span>
                        {isRotationEnabled
                          ? "Disable Rotation"
                          : "Enable Rotation"}
                      </span>
                    </button>
                  </div>
                ) : null}
                {zoomControls}
                {!isMobileViewport && isRotationEnabled ? (
                  <div
                    className="map-control-group map-control-slider-row map-control-rotation-row"
                    style={
                      {
                        "--rotation-progress": `${rotationProgress}%`,
                      } as CSSProperties
                    }
                  >
                    <input
                      className="map-control-slider"
                      type="range"
                      min={-180}
                      max={180}
                      step={15}
                      value={rotationDisplayValue}
                      onChange={handleRotationSliderChange}
                      aria-label="Rotation angle"
                      aria-valuetext={`${rotationDisplayValue} degrees`}
                    />
                    <span
                      className="map-control-rotation-value"
                      aria-live="polite"
                    >
                      {rotationDisplayValue}°
                    </span>
                    <button
                      type="button"
                      className="map-control-btn map-control-rotation-reset"
                      onClick={handleResetRotation}
                      disabled={!canResetRotation}
                      title="Reset rotation"
                      aria-label="Reset rotation"
                    >
                      <ResetIcon />
                    </button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="desktop-right-panel-edge-toggle"
        onClick={handleTogglePropertiesPanel}
        aria-controls="desktop-properties-panel"
        aria-expanded={isPropertiesPanelOpen}
        aria-label={rightPanelToggleLabel}
        title={rightPanelToggleLabel}
        data-tooltip={rightPanelToggleLabel}
      >
        {isPropertiesPanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>

      <div
        id="desktop-properties-panel"
        className="desktop-right-panel"
        aria-hidden={!isPropertiesPanelOpen}
      >
        <SettingsInfo
          location={infoLocationLabel}
          theme={effectiveTheme.name}
          layout={infoLayoutLabel}
          posterSize={posterSizeLabel}
          markers={markersLabel}
          coordinates={coordinatesLabel}
          toggles={propertyToggles}
          onToggle={handlePropertyToggle}
        />
        <AdUnit slot={AD_SLOT_SIDEBAR} format="rectangle" className="sidebar-ad-slot" />
      </div>
    </section>
  );
}
