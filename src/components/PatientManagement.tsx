import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Phone, MapPin, User } from 'lucide-react';
import { Patient } from '../types';
import { mockPatients } from '../data/mockData';

export const PatientManagement: React.FC = () => {
  const [patients] = useState<Patient[]>(mockPatients);
  const [activeFilter, setActiveFilter] = useState<'all' | 'current' | 'discharged' | 'incoming'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredPatients = patients.filter(patient => {
    const matchesFilter = activeFilter === 'all' || patient.status === activeFilter;
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-green-100 text-green-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      case 'incoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusCounts = () => {
    return {
      all: patients.length,
      current: patients.filter(p => p.status === 'current').length,
      discharged: patients.filter(p => p.status === 'discharged').length,
      incoming: patients.filter(p => p.status === 'incoming').length
    };
  };

  const counts = getStatusCounts();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Patient Management</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'All', count: counts.all },
              { key: 'current', label: 'Current', count: counts.current },
              { key: 'discharged', label: 'Discharged', count: counts.discharged },
              { key: 'incoming', label: 'Incoming', count: counts.incoming }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key as any)}
                className={`px-4 py-2 text-sm font-medium rounded-md border ${
                  activeFilter === filter.key
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Admission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Diagnosis
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} years, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                        {patient.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center mb-1">
                        <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                        {new Date(patient.admissionDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">{patient.ward}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.diagnosis}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {patient.assignedDoctor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No patients found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};