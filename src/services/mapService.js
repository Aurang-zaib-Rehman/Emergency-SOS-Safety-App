// export const PLACE_TYPES = {
//   police:   { type: 'police',   keyword: 'police station', label: 'Police Stations' },
//   hospital: { type: 'hospital', keyword: 'hospital',       label: 'Hospitals'       },
//   mechanic: { type: 'car_repair', keyword: 'mechanic',     label: 'Mechanics'       },
//   petrol:   { type: 'gas_station', keyword: 'petrol pump', label: 'Petrol Pumps'    },
// };

// export const MARKER_COLORS = {
//   user:     '#ef4444', // red
//   police:   '#3b82f6', // blue
//   hospital: '#f87171', // light red
//   mechanic: '#facc15', // yellow
//   petrol:   '#22c55e', // green
// };

// export const searchNearbyPlaces = (map, service, location, type) => {
//   return new Promise((resolve, reject) => {
//     const request = {
//       location,
//       radius: 5000,
//       type: PLACE_TYPES[type]?.type,
//       keyword: PLACE_TYPES[type]?.keyword,
//     };
//     service.nearbySearch(request, (results, status) => {
//       if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//         resolve(results);
//       } else {
//         reject(new Error(`Places search failed: ${status}`));
//       }
//     });
//   });
// };



export const PLACE_TYPES = [
  { key: 'all', label: 'Show All', emoji: '📍' },
  { key: 'police', label: 'Police Stations', emoji: '🚔' },
  { key: 'hospital', label: 'Hospitals', emoji: '🏥' },
  { key: 'mechanic', label: 'Mechanics', emoji: '🔧' },
  { key: 'fuel', label: 'Petrol Pumps', emoji: '⛽' },
];

export const MARKER_COLORS = {
  police: '#3b82f6',
  hospital: '#ef4444',
  mechanic: '#f59e0b',
  fuel: '#10b981',
  user: '#dc2626',
};

export const searchNearbyPlaces = async (lat, lng, type) => {
  const query = encodeURIComponent(type);
  const url = `https://nominatim.openstreetmap.org/search?q=${query}&lat=${lat}&lon=${lng}&format=json&limit=10&bounded=1&viewbox=${lng - 0.05},${lat + 0.05},${lng + 0.05},${lat - 0.05}`;

  const response = await fetch(url, {
    headers: { 'Accept-Language': 'en' }
  });
  const data = await response.json();
  return data.map(place => ({
    id: place.place_id,
    name: place.display_name.split(',')[0],
    lat: parseFloat(place.lat),
    lng: parseFloat(place.lon),
    type,
    address: place.display_name,
  }));
};