import React, { useState } from 'react';
import { ArrowLeft, Users, UserCheck, Calendar, Bed, Activity } from 'lucide-react';
import { Hospital } from '../types';
import { PatientManagement } from './PatientManagement';
import { DoctorManagement } from './DoctorManagement';

interface HospitalDashboardProps {
  hospital: Hospital;
  onBack: () => void;
}

export const HospitalDashboard: React.FC<HospitalDashboardProps> = ({ hospital, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'patients' | 'doctors'>('overview');

  const occupancyRate = Math.round((hospital.currentOccupancy / hospital.capacity) * 100);

  const stats = [
    {
      label: 'Total Capacity',
      value: hospital.capacity.toString(),
      icon: Bed,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      label: 'Current Patients',
      value: hospital.currentOccupancy.toString(),
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      label: 'Occupancy Rate',
      value: `${occupancyRate}%`,
      icon: Activity,
      color: occupancyRate > 90 ? 'text-red-600 bg-red-100' : 'text-yellow-600 bg-yellow-100'
    },
    {
      label: 'Available Beds',
      value: (hospital.capacity - hospital.currentOccupancy).toString(),
      icon: Calendar,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Directory
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{hospital.name}</h1>
            <p className="text-gray-600 mt-1">{hospital.location}, {hospital.province}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'patients', label: 'Patient Management' },
              { id: 'doctors', label: 'Doctor Management' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600">Type:</span>
                <span className="ml-2 text-sm text-gray-900 capitalize">{hospital.type}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Level:</span>
                <span className="ml-2 text-sm text-gray-900 capitalize">{hospital.level}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <span className="ml-2 text-sm text-gray-900">{hospital.phone}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <span className="ml-2 text-sm text-gray-900">{hospital.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'patients' && <PatientManagement />}
      {activeTab === 'doctors' && <DoctorManagement />}
    </div>
  );
};