import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FileText } from 'lucide-react';

export default function MedicalHistory() {
  const { userProfile } = useAuth();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Dossier Médical</h2>

        {userProfile?.medicalHistory && userProfile.medicalHistory.length > 0 ? (
          <div className="space-y-4">
            {userProfile.medicalHistory.map((record, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-gray-900">{record}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun antécédent médical</h3>
            <p className="mt-1 text-sm text-gray-500">
              Votre historique médical apparaîtra ici.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}