import { useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

type MapComponentProps = {
  latitude?: number;
  longitude?: number;
  address?: string;
  title?: string;
  height?: string;
  zoom?: number;
};

const MapComponent = ({
  latitude = 28.6139,
  longitude = 77.209,
  address,
  title = "SwachhPooja Location",
  height = "400px",
  zoom = 15,
}: MapComponentProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${latitude},${longitude}`)}`;

  const { isLoaded, loadError } = useJsApiLoader({
    id: "swachhpooja-google-map",
    googleMapsApiKey: apiKey,
  });

  const defaultCenter = useMemo(() => ({ lat: latitude, lng: longitude }), [latitude, longitude]);
  const [resolvedCenter, setResolvedCenter] = useState(defaultCenter);

  useEffect(() => {
    setResolvedCenter(defaultCenter);
  }, [defaultCenter]);

  useEffect(() => {
    if (!isLoaded || !address || typeof google === "undefined") {
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results?.[0]?.geometry?.location) {
        const loc = results[0].geometry.location;
        setResolvedCenter({ lat: loc.lat(), lng: loc.lng() });
      }
    });
  }, [isLoaded, address]);

  if (!apiKey) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-xl shadow-md bg-muted text-muted-foreground flex items-center justify-center text-center p-6"
      >
        Google Maps API key not configured.
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-xl shadow-md bg-muted text-muted-foreground flex items-center justify-center text-center p-6"
      >
        Unable to load Google Maps.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div
        style={{ height }}
        className="w-full rounded-xl shadow-md bg-muted text-muted-foreground flex items-center justify-center text-center p-6"
      >
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl shadow-md overflow-hidden" style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={resolvedCenter}
        zoom={zoom}
        options={{
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT,
          },
          fullscreenControl: true,
          streetViewControl: false,
          keyboardShortcuts: false,
          clickableIcons: false,
        }}
      >
        <MarkerF
          position={resolvedCenter}
          title={title}
          label={{ text: "SwachhPooja", color: "#b91c1c", fontWeight: "700" }}
          options={{ icon: { url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png" } }}
        />
      </GoogleMap>
      <div className="border-t bg-background/95 px-3 py-2 flex justify-end">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapComponent;
