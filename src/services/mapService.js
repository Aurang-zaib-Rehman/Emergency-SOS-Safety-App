// services/mapService.js
// Google Maps Places API helpers

export const PLACE_TYPES = {
  police:   { type: 'police',   keyword: 'police station', label: 'Police Stations' },
  hospital: { type: 'hospital', keyword: 'hospital',       label: 'Hospitals'       },
  mechanic: { type: 'car_repair', keyword: 'mechanic',     label: 'Mechanics'       },
  petrol:   { type: 'gas_station', keyword: 'petrol pump', label: 'Petrol Pumps'    },
};

export const MARKER_COLORS = {
  user:     '#ef4444', // red
  police:   '#3b82f6', // blue
  hospital: '#f87171', // light red
  mechanic: '#facc15', // yellow
  petrol:   '#22c55e', // green
};

export const searchNearbyPlaces = (map, service, location, type) => {
  return new Promise((resolve, reject) => {
    const request = {
      location,
      radius: 5000,
      type: PLACE_TYPES[type]?.type,
      keyword: PLACE_TYPES[type]?.keyword,
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        reject(new Error(`Places search failed: ${status}`));
      }
    });
  });
};