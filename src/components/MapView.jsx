// import { useState } from 'react';
// import { MapPin, Info } from 'lucide-react';
// import MapFilters from './MapFilters';

// const LEGEND = [
//   { label: 'Your Location',   color: 'bg-red-500'    },
//   { label: 'Police Stations', color: 'bg-blue-500'   },
//   { label: 'Hospitals',       color: 'bg-red-400'    },
//   { label: 'Mechanics',       color: 'bg-yellow-400' },
//   { label: 'Petrol Pumps',    color: 'bg-green-500'  },
// ];

// export default function MapView() {
//   const [activeFilter, setActiveFilter] = useState('all');

//   return (
//     <div className="min-h-screen bg-gray-950 px-6 py-10">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center shrink-0">
//             <MapPin className="w-7 h-7 text-white" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white">Emergency Services Map</h1>
//             <p className="text-gray-400 text-sm mt-1">
//               Find nearby emergency services. Use filters to search for specific locations.
//             </p>
//           </div>
//         </div>

//         {/* Info Box */}
//         <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
//           <div className="flex items-start gap-3">
//             <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0 mt-0.5">
//               <Info className="w-4 h-4 text-blue-400" />
//             </div>
//             <div>
//               <p className="text-white font-semibold text-sm mb-3">How to use the map:</p>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
//                 {[
//                   'Your current location is marked with a red pin',
//                   'Click on a filter button to search nearby services',
//                 ].map(tip => (
//                   <div key={tip} className="flex items-center gap-2 text-gray-400 text-sm">
//                     <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0"></span>
//                     {tip}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filter Buttons — uses MapFilters component */}
//         <MapFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

//         {/* Map Area */}
//         <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-5">
//           <div className="h-96 flex flex-col items-center justify-center gap-3">
//             <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
//             <p className="text-gray-400 text-sm">Loading map...</p>
//             <p className="text-gray-600 text-xs">Google Maps will appear here</p>
//           </div>
//         </div>

//         {/* Legend */}
//         <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
//           <p className="text-white font-bold text-base mb-4">Map Legend</p>
//           <div className="flex flex-wrap gap-6">
//             {LEGEND.map(({ label, color }) => (
//               <div key={label} className="flex items-center gap-2.5">
//                 <div className={`w-4 h-4 rounded-full ${color} shrink-0`}></div>
//                 <span className="text-gray-300 text-sm">{label}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }




import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';
import { getCurrentLocation } from '../services/locationService';
import { PLACE_TYPES, MARKER_COLORS, searchNearbyPlaces } from '../services/mapService';

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom colored marker
const createColoredIcon = (color) => L.divIcon({
  className: '',
  html: `<div style="
    width: 28px; height: 28px;
    background: ${color};
    border: 3px solid white;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 2px 8px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

// User location marker
const userIcon = L.divIcon({
  className: '',
  html: `<div style="
    width: 20px; height: 20px;
    background: #dc2626;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 0 4px rgba(220,38,38,0.3);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// Component to fly to location
function FlyToLocation({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.flyTo([location.lat, location.lng], 14, { duration: 1.5 });
  }, [location, map]);
  return null;
}

export default function MapView() {
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user location on mount
  useEffect(() => {
    getCurrentLocation()
      .then(loc => {
        setUserLocation(loc);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not get your location. Please enable location permissions.');
        setLoading(false);
      });
  }, []);

  // Search nearby places when filter changes
  useEffect(() => {
    if (!userLocation) return;
    if (activeFilter === 'all') {
      fetchAllPlaces();
    } else {
      fetchPlaces(activeFilter);
    }
  }, [userLocation, activeFilter]);

  const fetchPlaces = async (type) => {
    setSearchLoading(true);
    try {
      const results = await searchNearbyPlaces(userLocation.lat, userLocation.lng, type);
      setPlaces(results.map(p => ({ ...p, type })));
    } catch {
      setPlaces([]);
    }
    setSearchLoading(false);
  };

  const fetchAllPlaces = async () => {
    setSearchLoading(true);
    try {
      const types = ['police', 'hospital', 'fuel'];
      const results = await Promise.allSettled(
        types.map(type => searchNearbyPlaces(userLocation.lat, userLocation.lng, type)
          .then(places => places.map(p => ({ ...p, type })))
        )
      );
      const allPlaces = results
        .filter(r => r.status === 'fulfilled')
        .flatMap(r => r.value);
      setPlaces(allPlaces);
    } catch {
      setPlaces([]);
    }
    setSearchLoading(false);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Getting your location...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-8 text-center max-w-md">
        <MapPin className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-300">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-600/20 border border-green-600/30 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">Emergency Services Map</h1>
            <p className="text-gray-400 text-xs mt-0.5">Nearby emergency services around you</p>
          </div>
          {searchLoading && (
            <div className="ml-auto flex items-center gap-2 text-gray-400 text-sm">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Searching...
            </div>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {PLACE_TYPES.map(({ key, label, emoji }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${activeFilter === key
                  ? 'bg-red-600 text-white border border-red-500'
                  : 'bg-gray-900 text-gray-400 border border-gray-700 hover:border-gray-500'
                }`}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={14}
            style={{ height: '500px', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FlyToLocation location={userLocation} />

            {/* User location */}
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>
                <div className="text-center font-semibold">📍 You are here</div>
              </Popup>
            </Marker>

            {/* Accuracy circle */}
            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={200}
              pathOptions={{ color: '#dc2626', fillColor: '#dc2626', fillOpacity: 0.1, weight: 1 }}
            />

            {/* Nearby places */}
            {places.map(place => (
              <Marker
                key={`${place.id}-${place.type}`}
                position={[place.lat, place.lng]}
                icon={createColoredIcon(MARKER_COLORS[place.type] || '#6b7280')}
              >
                <Popup>
                  <div>
                    <p className="font-bold text-sm">{place.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{place.address}</p>
                    <p className="text-xs mt-1 capitalize">
                      {place.type === 'police' ? '🚔' : place.type === 'hospital' ? '🏥' : place.type === 'fuel' ? '⛽' : '🔧'} {place.type}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-gray-400 text-xs">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-gray-400 text-xs">Police</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-400 text-xs">Hospital</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-400 text-xs">Petrol Pump</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-gray-400 text-xs">Mechanic</span>
          </div>
        </div>

      </div>
    </div>
  );
}