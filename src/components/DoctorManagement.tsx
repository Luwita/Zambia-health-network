import React, { useState } from 'react';
import { Plus, Search, Phone, Mail, User, Stethoscope, Clock } from 'lucide-react';
import { Doctor } from '../types';
import { mockDoctors } from '../data/mockData';

export const DoctorManagement: React.FC = () => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-red-100 text-red-800';
      case 'off-duty': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available': return '🟢';
      case 'busy': return '🔴';
      case 'off-duty': return '⚫';
      default: return '⚫';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Doctor Management</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Doctor
          </button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                  </div>
                </div>
                <span className="text-lg">
                  {getAvailabilityIcon(doctor.availability)}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Stethoscope className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.specialization}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.experience} years experience
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {doctor.email}
                </div>
              </div>

              <div className="mb-4">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAvailabilityColor(doctor.availability)}`}>
                  {doctor.availability.charAt(0).toUpperCase() + doctor.availability.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Active Patients</span>
                  <span className="text-sm font-bold text-gray-900">{doctor.patients.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No doctors found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};