// components/MapFilters.jsx
import { LayoutGrid, Shield, Heart, Wrench, Fuel } from 'lucide-react';

const FILTERS = [
  { id: 'all',      label: 'Show All',        icon: LayoutGrid, style: 'bg-gray-700 hover:bg-gray-600' },
  { id: 'police',   label: 'Police Stations', icon: Shield,     style: 'bg-blue-700 hover:bg-blue-600' },
  { id: 'hospital', label: 'Hospitals',       icon: Heart,      style: 'bg-red-700 hover:bg-red-600'   },
  { id: 'mechanic', label: 'Mechanics',       icon: Wrench,     style: 'bg-yellow-600 hover:bg-yellow-500' },
  { id: 'petrol',   label: 'Petrol Pumps',    icon: Fuel,       style: 'bg-green-700 hover:bg-green-600'  },
];

export default function MapFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-5">
      <div className="flex flex-wrap gap-3">
        {FILTERS.map(({ id, label, icon: Icon, style }) => (
          <button
            key={id}
            onClick={() => onFilterChange(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all
              ${style}
              ${activeFilter === id ? 'ring-2 ring-white/30 scale-105 shadow-lg' : 'opacity-80'}`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}