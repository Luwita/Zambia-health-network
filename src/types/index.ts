export interface Hospital {
  id: string;
  name: string;
  location: string;
  province: string;
  district: string;
  type: 'public' | 'private' | 'mission' | 'military';
  level: 'tertiary' | 'secondary' | 'primary' | 'clinic';
  phone: string;
  email: string;
  website?: string;
  capacity: number;
  currentOccupancy: number;
  specialties: string[];
  services: string[];
  emergencyServices: boolean;
  ambulanceServices: boolean;
  laboratoryServices: boolean;
  pharmacyServices: boolean;
  bloodBank: boolean;
  operatingRooms: number;
  icuBeds: number;
  maternityBeds: number;
  pediatricBeds: number;
  establishedYear: number;
  accreditation: string[];
  insuranceAccepted: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Patient {
  id: string;
  patientNumber: string;
  name: string;
  age: number;
  dateOfBirth: string;
  gender: 'male' | 'female';
  phone: string;
  email?: string;
  address: string;
  nationalId: string;
  nextOfKin: {
    name: string;
    relationship: string;
    phone: string;
    address: string;
  };
  admissionDate: string;
  dischargeDate?: string;
  diagnosis: string;
  status: 'current' | 'discharged' | 'incoming' | 'transferred' | 'deceased';
  assignedDoctor: string;
  ward: string;
  bedNumber?: string;
  emergencyContact: string;
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  bloodType: string;
  insurance?: {
    provider: string;
    policyNumber: string;
    validUntil: string;
  };
  vitals: {
    bloodPressure?: string;
    temperature?: number;
    heartRate?: number;
    respiratoryRate?: number;
    oxygenSaturation?: number;
    weight?: number;
    height?: number;
    lastUpdated: string;
  };
  labResults: LabResult[];
  appointments: Appointment[];
  bills: Bill[];
}

export interface Doctor {
  id: string;
  employeeId: string;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
  availability: 'available' | 'busy' | 'off-duty' | 'on-leave';
  phone: string;
  email: string;
  patients: string[];
  schedule: DoctorSchedule[];
  consultationFee: number;
  languages: string[];
  licenseNumber: string;
  department: string;
  position: 'consultant' | 'specialist' | 'resident' | 'intern' | 'head-of-department';
  joinDate: string;
  profileImage?: string;
}

export interface DoctorSchedule {
  day: string;
  startTime: string;
  endTime: string;
  location: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'consultation' | 'follow-up' | 'emergency' | 'surgery' | 'diagnostic';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
  duration: number;
  fee: number;
}

export interface Diagnosis {
  id: string;
  patientName: string;
  patientId?: string;
  age: number;
  gender: string;
  symptoms: string[];
  preliminaryDiagnosis: string;
  recommendations: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  followUp: boolean;
  timestamp: string;
  doctorReviewed: boolean;
  doctorNotes?: string;
  prescriptions?: string[];
  referrals?: string[];
}

export interface LabResult {
  id: string;
  testName: string;
  testType: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'critical';
  date: string;
  technician: string;
  notes?: string;
}

export interface Bill {
  id: string;
  patientId: string;
  items: BillItem[];
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'partial' | 'paid' | 'overdue';
  dueDate: string;
  createdDate: string;
  paymentMethod?: string;
}

export interface BillItem {
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: 'consultation' | 'medication' | 'procedure' | 'accommodation' | 'laboratory' | 'other';
}

export interface Inventory {
  id: string;
  name: string;
  category: 'medication' | 'equipment' | 'supplies' | 'consumables';
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  supplier: string;
  expiryDate?: string;
  batchNumber?: string;
  location: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}

export interface Staff {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  shift: 'day' | 'night' | 'rotating';
  status: 'active' | 'on-leave' | 'inactive';
  joinDate: string;
  salary: number;
}

export interface Ward {
  id: string;
  name: string;
  type: 'general' | 'icu' | 'maternity' | 'pediatric' | 'surgical' | 'emergency';
  capacity: number;
  currentOccupancy: number;
  nurseInCharge: string;
  beds: Bed[];
}

export interface Bed {
  id: string;
  number: string;
  type: 'standard' | 'icu' | 'isolation' | 'maternity';
  status: 'occupied' | 'available' | 'maintenance' | 'reserved';
  patientId?: string;
  dailyRate: number;
}

export interface EmergencyCase {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  arrivalTime: string;
  triageLevel: 'red' | 'orange' | 'yellow' | 'green' | 'blue';
  chiefComplaint: string;
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  assignedNurse: string;
  assignedDoctor?: string;
  status: 'waiting' | 'in-treatment' | 'admitted' | 'discharged' | 'transferred';
  disposition: string;
}