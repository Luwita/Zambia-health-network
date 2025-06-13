import React, { useState } from 'react';
import { AlertTriangle, Clock, User, Activity, Heart, Thermometer, Plus } from 'lucide-react';
import { EmergencyCase } from '../types';
import { mockEmergencyCases } from '../data/mockData';

export const EmergencyManagement: React.FC = () => {
  const [emergencyCases, setEmergencyCases] = useState<EmergencyCase[]>(mockEmergencyCases);
  const [triageFilter, setTriageFilter] = useState<string>('all');

  const filteredCases = emergencyCases.filter(case_ => 
    triageFilter === 'all' || case_.triageLevel === triageFilter
  );

  const getTriageColor = (level: string) => {
    switch (level) {
      case 'red': return 'bg-red-500 text-white';
      case 'orange': return 'bg-orange-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'blue': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTriageLabel = (level: string) => {
    switch (level) {
      case 'red': return 'Critical';
      case 'orange': return 'Urgent';
      case 'yellow': return 'Less Urgent';
      case 'green': return 'Non-Urgent';
      case 'blue': return 'Minor';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'in-treatment': return 'bg-blue-100 text-blue-800';
      case 'admitted': return 'bg-green-100 text-green-800';
      case 'discharged': return 'bg-gray-100 text-gray-800';
      case 'transferred': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaitingTime = (arrivalTime: string) => {
    const arrival = new Date(arrivalTime);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - arrival.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} min`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emergency Department</h2>
              <p className="text-gray-600">Real-time emergency case management</p>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            New Case
          </button>
        </div>

        {/* Triage Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setTriageFilter('all')}
            className={`px-3 py-2 text-sm font-medium rounded-lg ${
              triageFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Cases ({emergencyCases.length})
          </button>
          {['red', 'orange', 'yellow', 'green', 'blue'].map(level => (
            <button
              key={level}
              onClick={() => setTriageFilter(level)}
              className={`px-3 py-2 text-sm font-medium rounded-lg ${
                triageFilter === level 
                  ? getTriageColor(level)
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getTriageLabel(level)} ({emergencyCases.filter(c => c.triageLevel === level).length})
            </button>
          ))}
        </div>

        {/* Emergency Cases */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCases.map((case_) => (
            <div key={case_.id} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{case_.patientName}</h3>
                    <p className="text-sm text-gray-600">{case_.age} years, {case_.gender}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${getTriageColor(case_.triageLevel)}`}>
                    {getTriageLabel(case_.triageLevel)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {getWaitingTime(case_.arrivalTime)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Chief Complaint:</p>
                <p className="text-sm text-gray-900">{case_.chiefComplaint}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Heart className="h-4 w-4 text-red-600 mr-1" />
                    <span className="text-xs font-medium text-red-700">BP/HR</span>
                  </div>
                  <p className="text-sm font-bold text-red-900">
                    {case_.vitals.bloodPressure}
                  </p>
                  <p className="text-sm font-bold text-red-900">
                    {case_.vitals.heartRate} bpm
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Thermometer className="h-4 w-4 text-blue-600 mr-1" />
                    <span className="text-xs font-medium text-blue-700">Temp/O2</span>
                  </div>
                  <p className="text-sm font-bold text-blue-900">
                    {case_.vitals.temperature}°C
                  </p>
                  <p className="text-sm font-bold text-blue-900">
                    {case_.vitals.oxygenSaturation}%
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  Nurse: {case_.assignedNurse}
                </div>
                {case_.assignedDoctor && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Activity className="h-4 w-4 mr-2 text-gray-400" />
                    Doctor: {case_.assignedDoctor}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(case_.status)}`}>
                  {case_.status.charAt(0).toUpperCase() + case_.status.slice(1).replace('-', ' ')}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(case_.arrivalTime).toLocaleTimeString()}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Disposition:</p>
                <p className="text-sm font-medium text-gray-900">{case_.disposition}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No emergency cases found for the selected triage level.</p>
          </div>
        )}
      </div>
    </div>
  );
};