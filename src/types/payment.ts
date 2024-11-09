export interface Payment {
    id: string;
    patientId: string;
    amount: number;
    date: string;
    paymentMethod: 'cash' | 'card' | 'insurance';
    status: 'completed' | 'pending' | 'refunded';
    description: string;
    invoiceNumber: string;
    treatments: Treatment[];
    insuranceClaim?: InsuranceClaim;
  }
  
  export interface Treatment {
    name: string;
    code: string;
    price: number;
    quantity: number;
  }
  
  export interface InsuranceClaim {
    provider: string;
    policyNumber: string;
    coveragePercentage: number;
    status: 'pending' | 'approved' | 'rejected';
    claimNumber?: string;
  }