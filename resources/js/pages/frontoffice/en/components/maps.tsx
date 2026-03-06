import React, { useEffect, useMemo, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";

// Tipe data sesuai API
interface MasterItem {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

interface DataItem {
  provinsi1: number;
  number: number;
}

export default function EnSectionMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k", // Ganti dengan key kamu
  });

  const center = useMemo(() => ({ lat: -2.2331, lng: 117.2841 }), []);
  const [master, setMaster] = useState<MasterItem[]>([]);
  const [data, setData] = useState<DataItem[]>([]);
  const [mapTooltip, setMapTooltip] = useState<MasterItem | null>(null);

  useEffect(() => {
    const start = "2025-01-01";
    const end = "2025-06-17";
    const url = `https://simpusaka.lpsk.go.id/layanan/permohonan/dashboard/provinsi1?startdate=${start}&enddate=${end}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setMaster(json.master ?? []);
        setData(json.data ?? []);
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="container mx-auto px-4">
      <div className="w-full h-[600px] rounded-xl mt-4 overflow-hidden">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={5.5}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            scrollwheel: false,
          }}
        >
          {master.map((item) => {
            const totalPermohonan = data
              .filter((d) => d.provinsi1 === item.id)
              .reduce((sum, d) => sum + d.number, 0);

            return (
              <Marker
                key={item.id}
                icon={{
                  path: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
                  fillColor: "#0ea5e9",
                  fillOpacity: 1,
                  strokeWeight: 1,
                  scale: 1.4,
                  anchor: new google.maps.Point(12, 24),
                }}
                position={{
                  lat: parseFloat(item.latitude),
                  lng: parseFloat(item.longitude),
                }}
                onClick={() => setMapTooltip(item)}
              >
                {mapTooltip?.id === item.id && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(item.latitude),
                      lng: parseFloat(item.longitude),
                    }}
                    onCloseClick={() => setMapTooltip(null)}
                  >
                    <div className="text-black" style={{ maxWidth: 200 }}>
                      <strong>{item.name}</strong>
                      <p>
                        Total Application: <strong>{totalPermohonan}</strong>
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
        </GoogleMap>
      </div>
    </div>
  );
}
