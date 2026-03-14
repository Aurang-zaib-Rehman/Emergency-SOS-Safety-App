import { Mail, Phone, Pencil, Trash2 } from 'lucide-react';

export default function ContactCard({ contact, index, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <div className="flex items-start justify-between">

        {/* Left: Avatar + Info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-lg">
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="pt-0.5">
            <div className="flex items-center gap-2 mb-3">
              <p className="text-white font-bold text-base">{contact.name}</p>
              <span className="text-xs text-gray-600 bg-gray-800 px-2 py-0.5 rounded-full">
                #{index + 1}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
              <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
              </div>
              {contact.email}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
              </div>
              {contact.phone}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onEdit(contact)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 hover:bg-gray-800 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-gray-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}