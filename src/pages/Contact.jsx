import { useState, useEffect } from 'react';
import { Users, Plus, Pencil, Trash2, X, Phone, Mail, User, AlertCircle, Check } from 'lucide-react';

const STORAGE_KEY = 'sos_contacts';
const emptyForm = { name: '', email: '', phone: '' };

export default function Contacts() {
  const [contacts, setContacts] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

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
    if (!form.name.trim()) { setError('Name is required.'); return; }
    if (!form.email.trim()) { setError('Email is required.'); return; }
    if (!form.phone.trim()) { setError('Phone number is required.'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { setError('Enter a valid email address.'); return; }
    if (editingId) {
      setContacts(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c));
    } else {
      setContacts(prev => [...prev, {
        id: Date.now().toString(),
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
      }]);
    }
    closeForm();
  };
  const handleDelete = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id)); setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Emergency Contacts</h1>
            <p className="text-gray-400 text-sm mt-1">
              Manage your trusted contacts • Maximum {contacts.length}/4 contacts
            </p>
          </div>
          <button
            onClick={openAdd}
            disabled={contacts.length >= 4}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </button>
        </div>

        {/* Max limit warning */}
        {contacts.length >= 4 && (
          <div className="flex items-center gap-2.5 bg-yellow-950/40 border border-yellow-800/40 text-yellow-400 text-sm px-4 py-3 rounded-xl mb-5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
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
              Add your trusted emergency contacts who will receive SOS alerts when you need help. You can add up to 4 contacts.
            </p>
            <button
              onClick={openAdd}
              className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Contact
            </button>
          </div>
        )}

        {/* Contact Cards */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="flex items-start justify-between">

                {/* Left: Avatar + Info */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>

                  {/* Name + email + phone */}
                  <div className="pt-0.5">
                    <p className="text-white font-bold text-base mb-3">{contact.name}</p>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      {contact.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="w-7 h-7 rounded-md bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                      {contact.phone}
                    </div>
                  </div>
                </div>

                {/* Right: Edit + Delete */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => openEdit(contact)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-400 hover:bg-gray-800 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(contact.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-gray-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add / Edit Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">

              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">
                  {editingId ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                <button onClick={closeForm}
                  className="w-8 h-8 rounded-lg hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="Enter contact name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    autoFocus
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    placeholder="Enter phone number"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2.5 bg-red-950/50 border border-red-800/50 text-red-300 text-sm px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={closeForm}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl text-sm transition-colors">
                    Cancel
                  </button>
                  <button type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                    {editingId ? 'Save Changes' : 'Add Contact'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-red-600/20 border border-red-600/30 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-7 h-7 text-red-500" />
              </div>
              <h2 className="text-white font-bold text-lg mb-2">Delete Contact?</h2>
              <p className="text-gray-400 text-sm mb-6">
                This contact will no longer receive your SOS alerts.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-3 rounded-xl text-sm transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl text-sm transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}