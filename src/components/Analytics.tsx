import React from 'react';
import { Activity, TrendingUp, Users, Calendar, DollarSign, AlertTriangle, Heart, Stethoscope } from 'lucide-react';

export const Analytics: React.FC = () => {
  const stats = [
    {
      title: 'Total Patients',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Doctors',
      value: '156',
      change: '+3.2%',
      trend: 'up',
      icon: Stethoscope,
      color: 'green'
    },
    {
      title: 'Appointments Today',
      value: '89',
      change: '-5.1%',
      trend: 'down',
      icon: Calendar,
      color: 'purple'
    },
    {
      title: 'Revenue (Monthly)',
      value: 'K485,200',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'yellow'
    },
    {
      title: 'Emergency Cases',
      value: '23',
      change: '+8.3%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Bed Occupancy',
      value: '78.5%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      red: 'bg-red-50 text-red-600 border-red-200',
      teal: 'bg-teal-50 text-teal-600 border-teal-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const recentActivities = [
    {
      id: 1,
      type: 'admission',
      message: 'New patient admitted to ICU',
      time: '5 minutes ago',
      icon: Users,
      color: 'blue'
    },
    {
      id: 2,
      type: 'emergency',
      message: 'Emergency case: Chest pain patient',
      time: '12 minutes ago',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 3,
      type: 'discharge',
      message: 'Patient discharged from Medical Ward A',
      time: '25 minutes ago',
      icon: Heart,
      color: 'green'
    },
    {
      id: 4,
      type: 'appointment',
      message: 'Dr. Sarah Banda - 3 appointments scheduled',
      time: '1 hour ago',
      icon: Calendar,
      color: 'purple'
    }
  ];

  const hospitalPerformance = [
    { name: 'UTH', patients: 1420, capacity: 1800, occupancy: 78.9 },
    { name: 'Levy Mwanawasa', patients: 520, capacity: 650, occupancy: 80.0 },
    { name: 'Ndola Central', patients: 350, capacity: 400, occupancy: 87.5 },
    { name: 'Coptic Hospital', patients: 95, capacity: 120, occupancy: 79.2 },
    { name: 'Livingstone Central', patients: 245, capacity: 300, occupancy: 81.7 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600">Real-time insights and performance metrics</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-6 rounded-xl border-2 ${getColorClasses(stat.color)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-white`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 mr-1 ${
                      stat.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                    <div className={`p-2 rounded-lg ${getColorClasses(activity.color)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hospital Performance */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hospital Occupancy Rates</h3>
            <div className="space-y-4">
              {hospitalPerformance.map((hospital, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{hospital.name}</h4>
                    <span className="text-sm font-semibold text-gray-600">
                      {hospital.occupancy}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{hospital.patients} / {hospital.capacity} beds</span>
                    <span>{hospital.capacity - hospital.patients} available</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        hospital.occupancy > 90 ? 'bg-red-500' :
                        hospital.occupancy > 80 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${hospital.occupancy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};