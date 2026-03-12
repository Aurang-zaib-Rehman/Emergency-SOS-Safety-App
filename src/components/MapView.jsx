import { useState } from 'react';
import { MapPin, Info, Shield, Heart, Wrench, Fuel, LayoutGrid } from 'lucide-react';

const FILTERS = [
  { id: 'all',     label: 'Show All',       icon: LayoutGrid, color: 'bg-gray-700 hover:bg-gray-600 text-white',          active: 'bg-gray-100 text-gray-900' },
  { id: 'police',  label: 'Police Stations', icon: Shield,     color: 'bg-blue-700 hover:bg-blue-600 text-white',           active: 'bg-blue-500 text-white' },
  { id: 'hospital',label: 'Hospitals',       icon: Heart,      color: 'bg-red-700 hover:bg-red-600 text-white',             active: 'bg-red-500 text-white' },
  { id: 'mechanic',label: 'Mechanics',       icon: Wrench,     color: 'bg-yellow-600 hover:bg-yellow-500 text-white',       active: 'bg-yellow-400 text-gray-900' },
  { id: 'petrol',  label: 'Petrol Pumps',    icon: Fuel,       color: 'bg-green-700 hover:bg-green-600 text-white',         active: 'bg-green-500 text-white' },
];

const LEGEND = [
  { label: 'Your Location',   color: 'bg-red-500' },
  { label: 'Police Stations', color: 'bg-blue-500' },
  { label: 'Hospitals',       color: 'bg-red-400' },
  { label: 'Mechanics',       color: 'bg-yellow-400' },
  { label: 'Petrol Pumps',    color: 'bg-green-500' },
];

export default function MapView() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Emergency Services Map</h1>
            <p className="text-gray-400 text-sm mt-1">
              Find nearby emergency services on the map. Use filters to search for specific locations.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm mb-3">How to use the map:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  Your current location is marked with a red pin
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  Click on a filter button to search nearby services
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  Click on any marker to see location details
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                  Configure Google Maps API key for full functionality
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-5">
          <div className="flex flex-wrap gap-3">
            {FILTERS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${activeFilter === id
                    ? 'ring-2 ring-white/30 scale-105 shadow-lg ' + color
                    : color + ' opacity-80'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden mb-5">
          <div className="h-96 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading map...</p>
            <p className="text-gray-600 text-xs">Google Maps will appear here</p>
          </div>
        </div>

        {/* Map Legend */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <p className="text-white font-bold text-base mb-4">Map Legend</p>
          <div className="flex flex-wrap gap-6">
            {LEGEND.map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded-full ${color} flex-shrink-0`}></div>
                <span className="text-gray-300 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}