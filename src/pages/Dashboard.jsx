import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, MapPin, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // Live clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const formatDate = (date) =>
    date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-600/30 flex items-center justify-center">
              <Shield className="w-7 h-7 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hello, {user?.name} 👋</h1>
              <p className="text-gray-400 text-sm mt-1">Your safety dashboard is active.</p>
            </div>
          </div>

          {/* Live Time - right side */}
          <div className="text-right hidden sm:block">
            <p className="text-2xl font-bold text-white tabular-nums">{formatTime(time)}</p>
            <p className="text-gray-500 text-xs mt-1">{formatDate(time)}</p>
          </div>
        </div>

        {/* SOS Button */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-6">Press in case of emergency</p>
          <button className="w-40 h-40 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-150 shadow-2xl shadow-red-900/60 border-4 border-red-400/20 text-white font-black text-3xl tracking-widest mx-auto flex items-center justify-center">
            SOS
          </button>
          <p className="text-xs text-gray-600 mt-5">Sends alert + location to all saved contacts</p>
        </div>

        {/* Quick Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">

          {/* Manage Contacts */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-white font-bold text-lg">Manage Contacts</h2>
            </div>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              Add, edit, or remove your emergency contacts. You can save up to 4 trusted contacts who will be alerted during emergencies.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Go to Contacts →
            </Link>
          </div>

          {/* Emergency Services Map */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-600/20 border border-green-600/30 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-white font-bold text-lg">Emergency Services Map</h2>
            </div>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              View your current location and quickly find nearby police stations, hospitals, mechanics, and petrol pumps on an interactive map.
            </p>
            <Link to="/map"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Open Map →
            </Link>
          </div>
        </div>

        {/* Setup & Important Information */}
        <div className="bg-yellow-950/30 border border-yellow-800/40 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl bg-yellow-600/20 border border-yellow-600/30 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
            </div>
            <h2 className="text-white font-bold text-base">Setup & Important Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 ml-12">
            {[
              'Add emergency contacts before using SOS feature',
              'Enable location permissions for accurate alerts',
              'Configure EmailJS credentials for email functionality',
              'Add Google Maps API key for map features',
              'Test SOS in safe environment before emergencies',
            ].map((tip) => (
              <div key={tip} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0 mt-1.5"></span>
                {tip}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}