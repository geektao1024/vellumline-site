import { useEffect } from "react";
import {
  DEFAULT_LAT,
  DEFAULT_LON,
  DEFAULT_CITY,
  DEFAULT_COUNTRY,
} from "@/core/config";
import type { PosterAction } from "@/features/poster/application/posterReducer";

/**
 * Initializes the map with the configured default location.
 * Browser geolocation is only requested from explicit user actions.
 */
export function useGeolocation(dispatch: React.Dispatch<PosterAction>) {
  useEffect(() => {
    let cancelled = false;
    const defaultLocationLabel =
      "New York, New York, United States";

    const applyFallback = () => {
      if (cancelled) return;
      dispatch({ type: "SET_USER_LOCATION", location: null });
      dispatch({
        type: "SET_FORM_FIELDS",
        resetDisplayNameOverrides: true,
        fields: {
          location: defaultLocationLabel,
          latitude: DEFAULT_LAT.toFixed(6),
          longitude: DEFAULT_LON.toFixed(6),
          displayCity: DEFAULT_CITY,
          displayCountry: DEFAULT_COUNTRY,
          displayContinent: "North America",
        },
      });
    };

    applyFallback();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);
}
