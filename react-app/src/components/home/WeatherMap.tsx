'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const SOLANO_COORDS: [number, number] = [16.5167, 121.1833];

export default function WeatherMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="section weather-map-section">
      <div className="container">
        <div className="home-stats-v2-header">
          <h2>Weather and Map of Solano</h2>
        </div>
        <div className="weather-map-grid">
          <div className="weather-column">
            <div id="weather-container" aria-live="polite">
              {/* Weather widget - implement with actual API */}
              <div className="weather-card">
                <div className="weather-main">
                  <i className="bi bi-cloud-sun weather-icon" />
                  <span className="weather-temp">28°C</span>
                </div>
                <div className="weather-details">
                  <p className="weather-desc">Partly Cloudy</p>
                  <p className="weather-location">Solano, Nueva Vizcaya</p>
                </div>
              </div>
            </div>
          </div>

          <div className="map-column">
            <div className="map-card">
              <div id="map-container" role="application" aria-label="Interactive map of Solano, Nueva Vizcaya">
                {mounted && (
                  <MapContainer
                    center={SOLANO_COORDS}
                    zoom={13}
                    style={{ height: '300px', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={SOLANO_COORDS}>
                      <Popup>Solano Municipal Hall</Popup>
                    </Marker>
                  </MapContainer>
                )}
              </div>
              <p className="map-attribution">
                <i className="bi bi-geo-alt" aria-hidden="true" /> Solano Municipal Hall, Nueva Vizcaya 3708
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
