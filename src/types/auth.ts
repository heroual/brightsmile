export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    medicalHistory: string[];
    appointments: Appointment[];
  }
  
  export interface Appointment {
    id: string;
    date: string;
    time: string;
    reason: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    notes?: string;
  }