"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

const icon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function InteractiveMap() {
  return (
    <div className="h-[600px] w-full rounded-[40px] overflow-hidden">

      <MapContainer
        center={[17.3411358, -88.5513154]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-full w-full z-10"
      >

        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[17.3411358, -88.5513154]}
          icon={icon}
        >

          <Popup>
            <div className="text-black">
              <strong>Elva&apos;s Cafe</strong>

              <br />

              Coastal Highway

              <br />

              La Democracia Village

              <br />

              Belize
            </div>
          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}