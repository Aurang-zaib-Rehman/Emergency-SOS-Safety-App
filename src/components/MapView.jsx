import { useState } from 'react';
import { MapPin, Info } from 'lucide-react';
import MapFilters from './MapFilters';

const LEGEND = [
  { label: 'Your Location',   color: 'bg-red-500'    },
  { label: 'Police Stations', color: 'bg-blue-500'   },
  { label: 'Hospitals',       color: 'bg-red-400'    },
  { label: 'Mechanics',       color: 'bg-yellow-400' },
  { label: 'Petrol Pumps',    color: 'bg-green-500'  },
];

export default function MapView() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center shrink-0">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Emergency Services Map</h1>
            <p className="text-gray-400 text-sm mt-1">
              Find nearby emergency services. Use filters to search for specific locations.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">How to use the map:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                {[
                  'Your current location is marked with a red pin',
                  'Click on a filter button to search nearby services',
                  'Click on any marker to see location details',
                  'Configure Google Maps API key for full functionality',
                ].map(tip => (
                  <div key={tip} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0"></span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons — uses MapFilters component */}
        <MapFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Map Area */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-5">
          <div className="h-96 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading map...</p>
            <p className="text-gray-600 text-xs">Google Maps will appear here</p>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-white font-bold text-base mb-4">Map Legend</p>
          <div className="flex flex-wrap gap-6">
            {LEGEND.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full ${color} shrink-0`}></div>
                <span className="text-gray-300 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}