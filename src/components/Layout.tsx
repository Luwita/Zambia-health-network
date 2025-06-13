import React from 'react';
import { Building2, Users, UserCheck, Stethoscope, Calendar, Package, UserCog, Activity, AlertTriangle } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const navItems = [
    { id: 'hospitals', label: 'Hospitals', icon: Building2 },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'doctors', label: 'Doctors', icon: UserCheck },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'diagnosis', label: 'Online Diagnosis', icon: Stethoscope },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'staff', label: 'Staff', icon: UserCog },
    { id: 'analytics', label: 'Analytics', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    Zambia Health Network
                  </h1>
                  <p className="text-xs text-gray-500">Comprehensive Hospital Management System</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentView === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};