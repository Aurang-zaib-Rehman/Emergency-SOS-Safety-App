import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, Map, Phone, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-600/20 border border-red-600/30 mb-4">
            <Shield className="w-7 h-7 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white">Hello, {user?.name}</h1>
          <p className="text-gray-400 text-sm mt-1">Your safety dashboard is active.</p>
        </div>

        {/* SOS Button */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6 text-center">
          <p className="text-gray-400 text-sm mb-6">Press in case of emergency</p>
          <button className="w-36 h-36 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition-all duration-150 shadow-lg shadow-red-900/50 border-4 border-red-400/20 text-white font-black text-2xl tracking-widest mx-auto flex items-center justify-center">
            SOS
          </button>
          <p className="text-xs text-gray-600 mt-5">Sends alert + location to all contacts</p>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/contacts"
            className="bg-gray-900 border border-gray-800 hover:border-red-800/60 rounded-2xl p-5 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center mb-3">
              <Users className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-white font-semibold text-sm">Contacts</p>
            <p className="text-gray-500 text-xs mt-1">Manage trusted contacts</p>
          </Link>

          <Link to="/map"
            className="bg-gray-900 border border-gray-800 hover:border-red-800/60 rounded-2xl p-5 transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-600/20 flex items-center justify-center mb-3">
              <Map className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-white font-semibold text-sm">Live Map</p>
            <p className="text-gray-500 text-xs mt-1">Find nearby services</p>
          </Link>
        </div>

      </div>
    </div>
  );
}