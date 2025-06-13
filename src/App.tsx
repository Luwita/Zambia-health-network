import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { HospitalDirectory } from './components/HospitalDirectory';
import { HospitalDashboard } from './components/HospitalDashboard';
import { PatientManagement } from './components/PatientManagement';
import { DoctorManagement } from './components/DoctorManagement';
import { AppointmentManagement } from './components/AppointmentManagement';
import { OnlineDiagnosis } from './components/OnlineDiagnosis';
import { EmergencyManagement } from './components/EmergencyManagement';
import { InventoryManagement } from './components/InventoryManagement';
import { StaffManagement } from './components/StaffManagement';
import { Analytics } from './components/Analytics';
import { Hospital } from './types';

type View = 'hospitals' | 'patients' | 'doctors' | 'appointments' | 'diagnosis' | 'emergency' | 'inventory' | 'staff' | 'analytics';

function App() {
  const [currentView, setCurrentView] = useState<View>('hospitals');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const handleViewChange = (view: string) => {
    setCurrentView(view as View);
    setSelectedHospital(null);
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    setSelectedHospital(hospital);
  };

  const handleBackToDirectory = () => {
    setSelectedHospital(null);
  };

  const renderContent = () => {
    if (selectedHospital) {
      return (
        <HospitalDashboard
          hospital={selectedHospital}
          onBack={handleBackToDirectory}
        />
      );
    }

    switch (currentView) {
      case 'hospitals':
        return <HospitalDirectory onHospitalSelect={handleHospitalSelect} />;
      case 'patients':
        return <PatientManagement />;
      case 'doctors':
        return <DoctorManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'diagnosis':
        return <OnlineDiagnosis />;
      case 'emergency':
        return <EmergencyManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'analytics':
        return <Analytics />;
      default:
        return <HospitalDirectory onHospitalSelect={handleHospitalSelect} />;
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={handleViewChange}>
      {renderContent()}
    </Layout>
  );
}

export default App;