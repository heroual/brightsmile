import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar, Clock, User, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const q = query(collection(db, 'users'));
    const querySnapshot = await getDocs(q);
    const patientsList = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.role === 'patient');
    setPatients(patientsList);
  };

  const handleAppointmentStatus = async (patientId: string, appointmentId: string, newStatus: string) => {
    const patientRef = doc(db, 'users', patientId);
    const patient = patients.find(p => p.id === patientId);
    
    if (patient) {
      const updatedAppointments = patient.appointments.map((apt: any) => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      );

      await updateDoc(patientRef, {
        appointments: updatedAppointments
      });

      // Update local state
      setPatients(patients.map(p => 
        p.id === patientId ? { ...p, appointments: updatedAppointments } : p
      ));
    }
  };

  const updateMedicalHistory = async (patientId: string, newRecord: string) => {
    const patientRef = doc(db, 'users', patientId);
    const patient = patients.find(p => p.id === patientId);
    
    if (patient) {
      const updatedHistory = [...(patient.medicalHistory || []), newRecord];
      await updateDoc(patientRef, {
        medicalHistory: updatedHistory
      });

      // Update local state
      setPatients(patients.map(p => 
        p.id === patientId ? { ...p, medicalHistory: updatedHistory } : p
      ));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold text-gray-900">Tableau de bord du Docteur</h1>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patients List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Patients</h2>
            <div className="space-y-4">
              {patients.map(patient => (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`p-4 rounded-lg cursor-pointer transition ${
                    selectedPatient?.id === patient.id
                      ? 'bg-blue-50 border-blue-500'
                      : 'hover:bg-gray-50 border-gray-200'
                  } border`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{patient.displayName}</p>
                      <p className="text-sm text-gray-500">{patient.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Details */}
          {selectedPatient && (
            <>
              {/* Appointments */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Rendez-vous</h2>
                <div className="space-y-4">
                  {selectedPatient.appointments?.map((apt: any) => (
                    <div key={apt.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-blue-500" />
                          <span>{apt.date} à {apt.time}</span>
                        </div>
                        <select
                          value={apt.status}
                          onChange={(e) => handleAppointmentStatus(selectedPatient.id, apt.id, e.target.value)}
                          className="rounded-md border-gray-300 text-sm"
                        >
                          <option value="pending">En attente</option>
                          <option value="confirmed">Confirmé</option>
                          <option value="cancelled">Annulé</option>
                        </select>
                      </div>
                      <p className="text-gray-600">{apt.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Dossier Médical</h2>
                <div className="space-y-4">
                  {selectedPatient.medicalHistory?.map((record: string, index: number) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>{record}</span>
                      </div>
                    </div>
                  ))}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const input = e.currentTarget.elements.namedItem('newRecord') as HTMLInputElement;
                      if (input.value.trim()) {
                        updateMedicalHistory(selectedPatient.id, input.value);
                        input.value = '';
                      }
                    }}
                    className="mt-4"
                  >
                    <input
                      type="text"
                      name="newRecord"
                      placeholder="Ajouter une note médicale..."
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                      Ajouter
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}