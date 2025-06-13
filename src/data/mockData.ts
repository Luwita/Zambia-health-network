import { Patient, Doctor, Diagnosis, Appointment, LabResult, Bill, Inventory, Staff, Ward, EmergencyCase } from '../types';

export const mockPatients: Patient[] = [
  {
    id: '1',
    patientNumber: 'UTH-2024-001',
    name: 'Chanda Mwale',
    age: 45,
    dateOfBirth: '1979-03-15',
    gender: 'male',
    phone: '+260-977-123456',
    email: 'chanda.mwale@email.com',
    address: 'Plot 123, Kabwata, Lusaka',
    nationalId: '123456/78/1',
    nextOfKin: {
      name: 'Grace Mwale',
      relationship: 'Wife',
      phone: '+260-977-654321',
      address: 'Plot 123, Kabwata, Lusaka'
    },
    admissionDate: '2024-01-15',
    diagnosis: 'Hypertension with complications',
    status: 'current',
    assignedDoctor: 'Dr. Sarah Banda',
    ward: 'Medical Ward A',
    bedNumber: 'A-15',
    emergencyContact: 'Grace Mwale - 0977-654321',
    medicalHistory: ['Diabetes Type 2', 'High Cholesterol', 'Family history of heart disease'],
    allergies: ['Penicillin', 'Shellfish'],
    currentMedications: ['Amlodipine 5mg', 'Metformin 500mg', 'Atorvastatin 20mg'],
    bloodType: 'O+',
    insurance: {
      provider: 'NHIMA',
      policyNumber: 'NH123456789',
      validUntil: '2024-12-31'
    },
    vitals: {
      bloodPressure: '150/95',
      temperature: 36.8,
      heartRate: 78,
      respiratoryRate: 18,
      oxygenSaturation: 98,
      weight: 85.5,
      height: 175,
      lastUpdated: '2024-01-22T08:30:00Z'
    },
    labResults: [
      {
        id: 'lab1',
        testName: 'Complete Blood Count',
        testType: 'Hematology',
        result: 'Normal',
        normalRange: 'Within normal limits',
        status: 'normal',
        date: '2024-01-20',
        technician: 'Lab Tech A'
      }
    ],
    appointments: [],
    bills: []
  },
  {
    id: '2',
    patientNumber: 'UTH-2024-002',
    name: 'Mary Phiri',
    age: 28,
    dateOfBirth: '1996-07-22',
    gender: 'female',
    phone: '+260-966-789012',
    address: 'House 45, Chilenje, Lusaka',
    nationalId: '789012/96/1',
    nextOfKin: {
      name: 'John Phiri',
      relationship: 'Husband',
      phone: '+260-966-321987',
      address: 'House 45, Chilenje, Lusaka'
    },
    admissionDate: '2024-01-10',
    dischargeDate: '2024-01-20',
    diagnosis: 'Acute Appendicitis - Post Surgical',
    status: 'discharged',
    assignedDoctor: 'Dr. James Mulenga',
    ward: 'Surgical Ward B',
    bedNumber: 'B-08',
    emergencyContact: 'John Phiri - 0966-321987',
    medicalHistory: ['No significant medical history'],
    allergies: ['None known'],
    currentMedications: ['Paracetamol 500mg PRN', 'Amoxicillin 500mg TDS'],
    bloodType: 'A+',
    insurance: {
      provider: 'Madison Insurance',
      policyNumber: 'MAD987654321',
      validUntil: '2024-12-31'
    },
    vitals: {
      bloodPressure: '120/80',
      temperature: 36.5,
      heartRate: 72,
      respiratoryRate: 16,
      oxygenSaturation: 99,
      weight: 65.0,
      height: 165,
      lastUpdated: '2024-01-20T10:00:00Z'
    },
    labResults: [],
    appointments: [],
    bills: []
  },
  {
    id: '3',
    patientNumber: 'UTH-2024-003',
    name: 'Peter Banda',
    age: 35,
    dateOfBirth: '1989-11-08',
    gender: 'male',
    phone: '+260-955-456789',
    address: 'Plot 67, Matero, Lusaka',
    nationalId: '456789/89/1',
    nextOfKin: {
      name: 'Alice Banda',
      relationship: 'Sister',
      phone: '+260-955-987654',
      address: 'Plot 70, Matero, Lusaka'
    },
    admissionDate: '2024-01-25',
    diagnosis: 'Chest Pain - Under Investigation',
    status: 'incoming',
    assignedDoctor: 'Dr. Ruth Tembo',
    ward: 'Emergency Department',
    emergencyContact: 'Alice Banda - 0955-987654',
    medicalHistory: ['Smoking history - 10 pack years'],
    allergies: ['Aspirin'],
    currentMedications: ['None'],
    bloodType: 'B+',
    vitals: {
      bloodPressure: '140/90',
      temperature: 37.2,
      heartRate: 95,
      respiratoryRate: 20,
      oxygenSaturation: 96,
      weight: 78.0,
      height: 180,
      lastUpdated: '2024-01-25T14:30:00Z'
    },
    labResults: [],
    appointments: [],
    bills: []
  }
];

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    employeeId: 'UTH-DOC-001',
    name: 'Dr. Sarah Banda',
    specialization: 'Internal Medicine',
    qualification: 'MBBS, MMed (Internal Medicine)',
    experience: 12,
    availability: 'available',
    phone: '+260-977-111222',
    email: 'sarah.banda@uth.gov.zm',
    patients: ['1', '4', '7'],
    schedule: [
      { day: 'Monday', startTime: '08:00', endTime: '17:00', location: 'Medical Ward A' },
      { day: 'Tuesday', startTime: '08:00', endTime: '17:00', location: 'Medical Ward A' },
      { day: 'Wednesday', startTime: '08:00', endTime: '17:00', location: 'Outpatient Clinic' },
      { day: 'Thursday', startTime: '08:00', endTime: '17:00', location: 'Medical Ward A' },
      { day: 'Friday', startTime: '08:00', endTime: '17:00', location: 'Medical Ward A' }
    ],
    consultationFee: 150,
    languages: ['English', 'Bemba', 'Nyanja'],
    licenseNumber: 'MCZ-2012-0156',
    department: 'Internal Medicine',
    position: 'consultant',
    joinDate: '2012-03-15'
  },
  {
    id: '2',
    employeeId: 'UTH-DOC-002',
    name: 'Dr. James Mulenga',
    specialization: 'General Surgery',
    qualification: 'MBBS, FCS (General Surgery)',
    experience: 15,
    availability: 'busy',
    phone: '+260-966-333444',
    email: 'james.mulenga@uth.gov.zm',
    patients: ['2', '5', '8'],
    schedule: [
      { day: 'Monday', startTime: '07:00', endTime: '16:00', location: 'Operating Theatre' },
      { day: 'Tuesday', startTime: '07:00', endTime: '16:00', location: 'Surgical Ward B' },
      { day: 'Wednesday', startTime: '07:00', endTime: '16:00', location: 'Operating Theatre' },
      { day: 'Thursday', startTime: '07:00', endTime: '16:00', location: 'Surgical Ward B' },
      { day: 'Friday', startTime: '07:00', endTime: '16:00', location: 'Operating Theatre' }
    ],
    consultationFee: 200,
    languages: ['English', 'Bemba', 'Tonga'],
    licenseNumber: 'MCZ-2009-0089',
    department: 'Surgery',
    position: 'consultant',
    joinDate: '2009-07-20'
  },
  {
    id: '3',
    employeeId: 'UTH-DOC-003',
    name: 'Dr. Ruth Tembo',
    specialization: 'Emergency Medicine',
    qualification: 'MBBS, DEM (Emergency Medicine)',
    experience: 8,
    availability: 'available',
    phone: '+260-955-555666',
    email: 'ruth.tembo@uth.gov.zm',
    patients: ['3', '6'],
    schedule: [
      { day: 'Monday', startTime: '06:00', endTime: '18:00', location: 'Emergency Department' },
      { day: 'Tuesday', startTime: '18:00', endTime: '06:00', location: 'Emergency Department' },
      { day: 'Wednesday', startTime: '06:00', endTime: '18:00', location: 'Emergency Department' },
      { day: 'Thursday', startTime: '18:00', endTime: '06:00', location: 'Emergency Department' }
    ],
    consultationFee: 180,
    languages: ['English', 'Nyanja', 'Tumbuka'],
    licenseNumber: 'MCZ-2016-0234',
    department: 'Emergency Medicine',
    position: 'specialist',
    joinDate: '2016-01-10'
  },
  {
    id: '4',
    employeeId: 'UTH-DOC-004',
    name: 'Dr. Michael Zulu',
    specialization: 'Cardiology',
    qualification: 'MBBS, MMed (Cardiology), FACC',
    experience: 18,
    availability: 'available',
    phone: '+260-977-777888',
    email: 'michael.zulu@uth.gov.zm',
    patients: ['9', '10'],
    schedule: [
      { day: 'Monday', startTime: '08:00', endTime: '17:00', location: 'Cardiology Unit' },
      { day: 'Tuesday', startTime: '08:00', endTime: '17:00', location: 'Cardiology Unit' },
      { day: 'Wednesday', startTime: '08:00', endTime: '12:00', location: 'Cardiac Cath Lab' },
      { day: 'Thursday', startTime: '08:00', endTime: '17:00', location: 'Cardiology Unit' },
      { day: 'Friday', startTime: '08:00', endTime: '17:00', location: 'Outpatient Clinic' }
    ],
    consultationFee: 300,
    languages: ['English', 'Bemba', 'Lozi'],
    licenseNumber: 'MCZ-2006-0045',
    department: 'Cardiology',
    position: 'head-of-department',
    joinDate: '2006-09-01'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Chanda Mwale',
    doctorId: '1',
    doctorName: 'Dr. Sarah Banda',
    date: '2024-01-26',
    time: '09:00',
    type: 'follow-up',
    status: 'scheduled',
    reason: 'Hypertension follow-up',
    duration: 30,
    fee: 150
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Mary Phiri',
    doctorId: '2',
    doctorName: 'Dr. James Mulenga',
    date: '2024-01-28',
    time: '14:00',
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Post-operative check-up',
    duration: 20,
    fee: 100
  }
];

export const mockDiagnoses: Diagnosis[] = [
  {
    id: '1',
    patientName: 'Anonymous Patient',
    age: 32,
    gender: 'male',
    symptoms: ['Fever', 'Headache', 'Body aches', 'Chills'],
    preliminaryDiagnosis: 'Possible Malaria',
    recommendations: [
      'Blood test for malaria parasites (RDT and microscopy)',
      'Complete blood count',
      'Rest and adequate fluid intake',
      'Paracetamol for fever and pain relief',
      'Anti-malarial medication if test positive'
    ],
    severity: 'medium',
    followUp: true,
    timestamp: '2024-01-22T10:30:00Z',
    doctorReviewed: true,
    doctorNotes: 'Patient presents with classic malaria symptoms. Recommend immediate testing.',
    prescriptions: ['Paracetamol 500mg TDS', 'ORS sachets'],
    referrals: ['Laboratory for malaria testing']
  },
  {
    id: '2',
    patientName: 'Anonymous Patient',
    age: 45,
    gender: 'female',
    symptoms: ['Persistent cough', 'Weight loss', 'Night sweats', 'Fatigue'],
    preliminaryDiagnosis: 'Possible Tuberculosis',
    recommendations: [
      'Chest X-ray',
      'Sputum test for TB (3 samples)',
      'HIV test',
      'TB clinic referral for further evaluation',
      'Contact tracing if TB confirmed'
    ],
    severity: 'high',
    followUp: true,
    timestamp: '2024-01-21T14:15:00Z',
    doctorReviewed: true,
    doctorNotes: 'High suspicion for pulmonary TB. Urgent investigation required.',
    prescriptions: ['Vitamin supplements'],
    referrals: ['TB Clinic', 'Radiology Department']
  }
];

export const mockInventory: Inventory[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg Tablets',
    category: 'medication',
    currentStock: 5000,
    minimumStock: 1000,
    unitPrice: 0.50,
    supplier: 'Medical Stores Limited',
    expiryDate: '2025-12-31',
    batchNumber: 'PAR2024001',
    location: 'Pharmacy Store A',
    status: 'in-stock'
  },
  {
    id: '2',
    name: 'Surgical Gloves (Box of 100)',
    category: 'supplies',
    currentStock: 50,
    minimumStock: 100,
    unitPrice: 25.00,
    supplier: 'Medical Supplies Co.',
    location: 'Supply Room 1',
    status: 'low-stock'
  },
  {
    id: '3',
    name: 'Blood Pressure Monitor',
    category: 'equipment',
    currentStock: 0,
    minimumStock: 5,
    unitPrice: 150.00,
    supplier: 'Medical Equipment Ltd',
    location: 'Equipment Store',
    status: 'out-of-stock'
  }
];

export const mockStaff: Staff[] = [
  {
    id: '1',
    employeeId: 'UTH-NUR-001',
    name: 'Sister Grace Mwanza',
    role: 'Senior Nurse',
    department: 'Medical Ward A',
    phone: '+260-977-111333',
    email: 'grace.mwanza@uth.gov.zm',
    shift: 'day',
    status: 'active',
    joinDate: '2015-06-01',
    salary: 8500
  },
  {
    id: '2',
    employeeId: 'UTH-LAB-001',
    name: 'Mr. Joseph Banda',
    role: 'Laboratory Technician',
    department: 'Laboratory',
    phone: '+260-966-222444',
    email: 'joseph.banda@uth.gov.zm',
    shift: 'rotating',
    status: 'active',
    joinDate: '2018-03-15',
    salary: 6500
  }
];

export const mockWards: Ward[] = [
  {
    id: '1',
    name: 'Medical Ward A',
    type: 'general',
    capacity: 40,
    currentOccupancy: 35,
    nurseInCharge: 'Sister Grace Mwanza',
    beds: [
      {
        id: 'bed1',
        number: 'A-01',
        type: 'standard',
        status: 'occupied',
        patientId: '1',
        dailyRate: 50
      },
      {
        id: 'bed2',
        number: 'A-02',
        type: 'standard',
        status: 'available',
        dailyRate: 50
      }
    ]
  },
  {
    id: '2',
    name: 'ICU',
    type: 'icu',
    capacity: 12,
    currentOccupancy: 8,
    nurseInCharge: 'Sister Mary Phiri',
    beds: [
      {
        id: 'icu1',
        number: 'ICU-01',
        type: 'icu',
        status: 'occupied',
        patientId: '5',
        dailyRate: 200
      }
    ]
  }
];

export const mockEmergencyCases: EmergencyCase[] = [
  {
    id: '1',
    patientName: 'John Mwale',
    age: 35,
    gender: 'male',
    arrivalTime: '2024-01-25T14:30:00Z',
    triageLevel: 'orange',
    chiefComplaint: 'Chest pain and shortness of breath',
    vitals: {
      bloodPressure: '160/100',
      heartRate: 110,
      temperature: 37.2,
      respiratoryRate: 24,
      oxygenSaturation: 94
    },
    assignedNurse: 'Nurse Jane Banda',
    assignedDoctor: 'Dr. Ruth Tembo',
    status: 'in-treatment',
    disposition: 'Admitted to Medical Ward'
  },
  {
    id: '2',
    patientName: 'Alice Phiri',
    age: 28,
    gender: 'female',
    arrivalTime: '2024-01-25T16:15:00Z',
    triageLevel: 'yellow',
    chiefComplaint: 'Abdominal pain',
    vitals: {
      bloodPressure: '120/80',
      heartRate: 85,
      temperature: 36.8,
      respiratoryRate: 18,
      oxygenSaturation: 98
    },
    assignedNurse: 'Nurse Peter Zulu',
    status: 'waiting',
    disposition: 'Pending evaluation'
  }
];