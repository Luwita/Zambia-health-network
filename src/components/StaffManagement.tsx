import React, { useState } from 'react';
import { UserCog, Plus, Search, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import { Staff } from '../types';
import { mockStaff } from '../data/mockData';

export const StaffManagement: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'day': return 'bg-blue-50 text-blue-700';
      case 'night': return 'bg-purple-50 text-purple-700';
      case 'rotating': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const departments = [...new Set(staff.map(s => s.department))];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Staff Management</h2>
              <p className="text-gray-600">Manage hospital staff and personnel</p>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Staff
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search staff..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
              />
            </div>
          </div>
          
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Staff Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStaff.map((member) => (
            <div key={member.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <UserCog className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1).replace('-', ' ')}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <UserCog className="h-4 w-4 mr-2 text-gray-400" />
                  {member.department}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2 text-gray-400" />
                  {member.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  Joined: {new Date(member.joinDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded ${getShiftColor(member.shift)}`}>
                  {member.shift.charAt(0).toUpperCase() + member.shift.slice(1)} Shift
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                  K{member.salary.toLocaleString()}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Employee ID</span>
                  <span className="text-sm font-bold text-gray-900">{member.employeeId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="text-center py-12">
            <UserCog className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No staff members found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};