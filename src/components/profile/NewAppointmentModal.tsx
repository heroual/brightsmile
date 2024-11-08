import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../firebase';
import { X } from 'lucide-react';
import { Appointment } from '../../types/auth';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewAppointmentModal({ isOpen, onClose }: NewAppointmentModalProps) {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        status: 'pending'
      };

      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        appointments: arrayUnion(newAppointment)
      });

      onClose();
    } catch (error) {
      console.error('Error creating appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="relative bg-white rounded-lg max-w-md w-full">
          <div className="absolute right-0 top-0 p-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Nouveau Rendez-vous
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Heure
                </label>
                <input
                  type="time"
                  id="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Motif
                </label>
                <input
                  type="text"
                  id="reason"
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Ex: Consultation, Contrôle..."
                />
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Création...' : 'Créer le rendez-vous'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}