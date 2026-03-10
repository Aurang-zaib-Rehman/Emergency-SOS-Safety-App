import { Users } from 'lucide-react';

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center">
            <Users className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Trusted Contacts</h1>
            <p className="text-gray-500 text-xs">Up to 4 emergency contacts</p>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 text-center text-gray-500 text-sm">
          Contact management coming soon…
        </div>
      </div>
    </div>
  );
}