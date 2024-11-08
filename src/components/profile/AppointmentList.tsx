import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Calendar } from 'lucide-react';
import NewAppointmentModal from './NewAppointmentModal';

export default function AppointmentList() {
  const { userProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Mes Rendez-vous</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Nouveau Rendez-vous</span>
          </button>
        </div>

        {userProfile?.appointments && userProfile.appointments.length > 0 ? (
          <div className="space-y-4">
            {userProfile.appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString('fr-FR')} à {appointment.time}
                    </p>
                    <p className="text-gray-600">{appointment.reason}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun rendez-vous</h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par créer un nouveau rendez-vous.
            </p>
          </div>
        )}
      </div>
      
      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}