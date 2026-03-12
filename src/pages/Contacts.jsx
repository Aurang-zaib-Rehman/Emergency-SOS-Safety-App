// pages/Contacts.jsx
import { useState, useEffect } from 'react';
import { Users, Plus, X, Check, AlertCircle, User, Mail, Phone } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import { getContacts, setContacts as saveContacts } from '../utils/localStorage';
import { isValidEmail, generateId } from '../utils/helpers';

const emptyForm = { name: '', email: '', phone: '' };

export default function Contacts() {
  const [contacts, setContacts] = useState(() => getContacts());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { saveContacts(contacts); }, [contacts]);

  const openAdd = () => {
    if (contacts.length >= 4) return;
    setForm(emptyForm); setEditingId(null); setError(''); setShowForm(true);
  };
  const openEdit = (contact) => {
    setForm({ name: contact.name, email: contact.email, phone: contact.phone });
    setEditingId(contact.id); setError(''); setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false); setEditingId(null); setForm(emptyForm); setError('');
  };
  const handleSave = (e) => {
    e.preventDefault(); setError('');
    if (!form.name.trim())  { setError('Name is required.'); return; }
    if (!form.email.trim()) { setError('Email is required.'); return; }
    if (!form.phone.trim()) { setError('Phone number is required.'); return; }
    if (!isValidEmail(form.email)) { setError('Enter a valid email address.'); return; }
    if (editingId) {
      setContacts(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c));
    } else {
      setContacts(prev => [...prev, { id: generateId(), name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() }]);
    }
    closeForm();
  };
  const handleDelete = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id)); setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Emergency Contacts</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your trusted contacts • Maximum {contacts.length}/4 contacts
            </p>
          </div>
          <button onClick={openAdd} disabled={contacts.length >= 4}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />Add Contact
          </button>
        </div>

        {contacts.length >= 4 && (
          <div className="flex items-center gap-2.5 bg-yellow-950/40 border border-yellow-800/40 text-yellow-400 text-sm px-4 py-3 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Maximum 4 contacts reached. Delete one to add another.
          </div>
        )}

        {/* Empty State */}
        {contacts.length === 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-5">
              <Users className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-white font-bold text-xl mb-2">No contacts yet</p>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Add your trusted emergency contacts who will receive SOS alerts when you need help.
            </p>
            <button onClick={openAdd}
              className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />Add Your First Contact
            </button>
          </div>
        )}

        {/* Contact Cards — uses ContactCard component */}
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              index={index}
              onEdit={openEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">{editingId ? 'Edit Contact' : 'Add New Contact'}</h2>
                <button onClick={closeForm} className="w-8 h-8 rounded-lg hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                  <div className="relative">
                    <input type="text" className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 pl-11 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      placeholder="Enter contact name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} autoFocus />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <input type="email" className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 pl-11 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      placeholder="Enter email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                  <div className="relative">
                    <input type="tel" className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 pl-11 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      placeholder="Enter phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                </div>
                {error && (
                  <div className="flex items-center gap-2.5 bg-red-950/50 border border-red-800/50 text-red-300 text-sm px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeForm} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl text-sm transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors">
                    <Check className="w-4 h-4" />{editingId ? 'Save Changes' : 'Add Contact'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <h2 className="text-white font-bold text-lg mb-2">Delete Contact?</h2>
              <p className="text-gray-400 text-sm mb-6">This contact will no longer receive your SOS alerts.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl text-sm transition-colors">Cancel</button>
                <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors">Delete</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}