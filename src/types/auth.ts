export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    medicalHistory: MedicalRecord[];
    appointments: Appointment[];
    role: 'doctor' | 'patient';
  }
  
  export interface Appointment {
    id: string;
    date: string;
    time: string;
    reason: string;
    symptoms?: string;
    urgency?: 'normal' | 'urgent' | 'emergency';
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
  }
  
  export interface MedicalRecord {
    date: string;
    note: string;
    doctor: string;
    isNew?: boolean;
  }