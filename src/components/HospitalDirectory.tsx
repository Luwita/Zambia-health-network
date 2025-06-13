import React, { useState } from 'react';
import { MapPin, Phone, Mail, Users, Bed, ChevronRight } from 'lucide-react';
import { Hospital } from '../types';
import { zambianHospitals } from '../data/hospitals';

interface HospitalDirectoryProps {
  onHospitalSelect: (hospital: Hospital) => void;
}

export const HospitalDirectory: React.FC<HospitalDirectoryProps> = ({ onHospitalSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');

  const provinces = ['All', ...new Set(zambianHospitals.map(h => h.province))];
  const types = ['All', 'public', 'private', 'mission'];

  const filteredHospitals = zambianHospitals.filter(hospital => {
    const provinceMatch = selectedProvince === 'All' || hospital.province === selectedProvince;
    const typeMatch = selectedType === 'All' || hospital.type === selectedType;
    return provinceMatch && typeMatch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'public': return 'bg-blue-100 text-blue-800';
      case 'private': return 'bg-green-100 text-green-800';
      case 'mission': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'tertiary': return 'bg-red-100 text-red-800';
      case 'secondary': return 'bg-yellow-100 text-yellow-800';
      case 'primary': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const occupancyRate = (hospital: Hospital) => 
    Math.round((hospital.currentOccupancy / hospital.capacity) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Zambian Hospitals & Clinics Directory
        </h2>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {provinces.map(province => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'All' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredHospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onHospitalSelect(hospital)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                    {hospital.name}
                  </h3>
                  <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {hospital.location}, {hospital.province}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {hospital.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {hospital.email}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(hospital.type)}`}>
                    {hospital.type.charAt(0).toUpperCase() + hospital.type.slice(1)}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(hospital.level)}`}>
                    {hospital.level.charAt(0).toUpperCase() + hospital.level.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Bed className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Capacity</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{hospital.capacity}</span>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Occupancy</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{occupancyRate(hospital)}%</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        occupancyRate(hospital) > 90 ? 'bg-red-500' :
                        occupancyRate(hospital) > 75 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${occupancyRate(hospital)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.slice(0, 3).map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{hospital.specialties.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};