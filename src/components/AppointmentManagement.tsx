import React, { useState } from 'react';
import { Calendar, Clock, Plus, Search, Filter, User, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Appointment } from '../types';
import { mockAppointments } from '../data/mockData';

export const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && appointment.date === new Date().toISOString().split('T')[0]) ||
                       (dateFilter === 'week' && new Date(appointment.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'no-show': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'cancelled': return XCircle;
      case 'no-show': return AlertCircle;
      default: return Clock;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'consultation': return 'bg-blue-50 text-blue-700';
      case 'follow-up': return 'bg-green-50 text-green-700';
      case 'emergency': return 'bg-red-50 text-red-700';
      case 'surgery': return 'bg-purple-50 text-purple-700';
      case 'diagnostic': return 'bg-yellow-50 text-yellow-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const updateAppointmentStatus = (appointmentId: string, newStatus: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus as any } : apt
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
              <p className="text-gray-600">Schedule and manage patient appointments</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
          </select>
        </div>

        {/* Appointments Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => {
            const StatusIcon = getStatusIcon(appointment.status);
            return (
              <div key={appointment.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.doctorName}</p>
                    </div>
                  </div>
                  <StatusIcon className="h-5 w-5 text-gray-400" />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    {new Date(appointment.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {appointment.time} ({appointment.duration} min)
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1).replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${getTypeColor(appointment.type)}`}>
                    {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Reason:</p>
                  <p className="text-sm font-medium text-gray-900">{appointment.reason}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">K{appointment.fee}</span>
                  <div className="flex space-x-2">
                    {appointment.status === 'scheduled' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200"
                      >
                        Confirm
                      </button>
                    )}
                    {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                        className="px-3 py-1 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No appointments found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};