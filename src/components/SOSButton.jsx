// components/SOSButton.jsx
import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { getCurrentLocation, buildGoogleMapsLink } from '../services/locationService';
import { sendSOSToAllContacts } from '../services/emailService';
import { getContacts } from '../utils/localStorage';
import { useAuth } from '../context/AuthContext';

export default function SOSButton() {
  const { user } = useAuth();
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSOS = async () => {
    if (status === 'loading') return;

    const contacts = getContacts();
    if (contacts.length === 0) {
      setStatus('error');
      setMessage('No contacts found. Please add at least one contact first.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const location = await getCurrentLocation();
      const locationLink = buildGoogleMapsLink(location.lat, location.lng);

      await sendSOSToAllContacts({
        contacts,
        fromName: user?.name || 'User',
        locationLink,
      });

      setStatus('success');
      setMessage(`Alert sent to ${contacts.length} contact${contacts.length > 1 ? 's' : ''}!`);

      // Reset after 5 seconds
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 5000);
    } catch (err) {
      setStatus('error');
      setMessage(err.message || 'Failed to send SOS alert. Please try again.');
      setTimeout(() => { setStatus('idle'); setMessage(''); }, 5000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* SOS Button */}
      <button
        onClick={handleSOS}
        disabled={status === 'loading'}
        className={`w-40 h-40 rounded-full border-4 text-white font-black text-3xl tracking-widest
          flex items-center justify-center transition-all duration-150 shadow-2xl
          ${status === 'loading'
            ? 'bg-gray-600 border-gray-500/20 cursor-not-allowed'
            : status === 'success'
            ? 'bg-green-600 border-green-400/20 shadow-green-900/60'
            : 'bg-red-600 hover:bg-red-500 active:scale-95 border-red-400/20 shadow-red-900/60'
          }`}
      >
        {status === 'loading' ? (
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
        ) : status === 'success' ? (
          <CheckCircle className="w-14 h-14" />
        ) : (
          'SOS'
        )}
      </button>

      {/* Status message */}
      {message && (
        <div className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border
          ${status === 'success'
            ? 'bg-green-950/50 border-green-800/50 text-green-300'
            : 'bg-red-950/50 border-red-800/50 text-red-300'
          }`}>
          {status === 'success'
            ? <CheckCircle className="w-4 h-4 shrink-0" />
            : <AlertCircle className="w-4 h-4 shrink-0" />
          }
          {message}
        </div>
      )}

      <p className="text-xs text-gray-600">Sends alert + location to all saved contacts</p>
    </div>
  );
}