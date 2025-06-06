'use client';

import L from 'leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Marker,
  useMap,
} from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 8);
    }
  }, [position, map]);

  return null;
}

export default function MapWithSearch({ location }) {
  const [events, setEvents] = useState([]);
  const [position, setPosition] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);



  useEffect(() => {
    async function loadCityAndAlerts() {
      try {
        if (location) {
          console.log('City fetched:', location);

          const res = await fetch('/cities.json');
          const cities = await res.json();

          const city = cities.find(
            (c) => c.name.toLowerCase() === location.toLowerCase()
          );

          if (city) {
            const lat = parseFloat(city.lat);
            const lon = parseFloat(city.lng); 
            setPosition([lat, lon]);
            setPlaceName(`${city.name}, ${city.admin1}`);
          } else {
            console.warn('City not found in cities.json');
            setNotFound(true);
            return;
          }

          const alertRes = await fetch(
            'https://eonet.gsfc.nasa.gov/api/v3/events?status=open'
          );
          const alertData = await alertRes.json();
          const filtered = alertData.events
            .map((event) => {
              const point = event.geometry.find((g) => g.type === 'Point');
              if (point) {
                return {
                  id: event.id,
                  title: event.title,
                  lat: point.coordinates[1],
                  lon: point.coordinates[0],
                };
              }
              return null;
            })
            .filter(Boolean);

          setEvents(filtered);
          setLoading(false);

        }
      } catch (err) {
        console.error('Error loading data:', err);
        setNotFound(true);
      }
    }

    loadCityAndAlerts();
  }, [location]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">High Alert Map</h2>
      <div className="h-[72vh] relative rounded-lg shadow overflow-hidden">
        {loading && (
          <div className="absolute h-full w-full inset-0 z-[5] flex items-center justify-center bg-white bg-opacity-80">
            <div className="text-lg font-semibold text-gray-700 animate-pulse">
              Loading map...
            </div>
          </div>
        )}

        <MapContainer
          center={[20, 0]}
          zoom={2}
          key={position ? position.join(',') : 'default'}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {position && (
            <>
              <FlyTo position={position} />
              <Marker position={position}>
                <Popup>{placeName || 'Selected location'}</Popup>
              </Marker>
            </>
          )}

          {events.map((event) => (
            <CircleMarker
              key={event.id}
              center={[event.lat, event.lon]}
              radius={10}
              pathOptions={{
                stroke: false,
                fillColor: 'red',
                fillOpacity: 0.4,
              }}
            >
              <Popup>{event.title}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
