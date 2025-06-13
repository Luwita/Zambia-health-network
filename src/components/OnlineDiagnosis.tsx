import React, { useState } from 'react';
import { Stethoscope, AlertTriangle, CheckCircle, Clock, Send } from 'lucide-react';
import { Diagnosis } from '../types';
import { mockDiagnoses } from '../data/mockData';

export const OnlineDiagnosis: React.FC = () => {
  const [diagnoses] = useState<Diagnosis[]>(mockDiagnoses);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    duration: '',
    severity: 'medium',
    medicalHistory: ''
  });
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '',
      symptoms: '',
      duration: '',
      severity: 'medium',
      medicalHistory: ''
    });
    
    setIsSubmitting(false);
    alert('Diagnosis submitted! A healthcare professional will review and respond shortly.');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return CheckCircle;
      case 'medium': return Clock;
      case 'high': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-6">
          <Stethoscope className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Online Diagnosis System</h2>
            <p className="text-gray-600 mt-1">Get preliminary medical consultation from qualified healthcare professionals</p>
          </div>
        </div>

        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'new', label: 'New Consultation' },
              { id: 'history', label: 'Diagnosis History' }
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

        {activeTab === 'new' && (
          <div className="max-w-2xl">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Important Notice</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    This online diagnosis tool provides preliminary medical guidance only. For emergencies, 
                    please visit the nearest hospital immediately or call emergency services.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symptom Duration
                  </label>
                  <select
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="less-than-day">Less than a day</option>
                    <option value="1-3-days">1-3 days</option>
                    <option value="4-7-days">4-7 days</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="more-than-2-weeks">More than 2 weeks</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptoms (describe in detail)
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.symptoms}
                  onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please describe your symptoms in detail (e.g., fever, headache, body aches, etc.)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptom Severity
                </label>
                <select
                  value={formData.severity}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Mild (not interfering with daily activities)</option>
                  <option value="medium">Moderate (some interference with daily activities)</option>
                  <option value="high">Severe (significant interference with daily activities)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Any relevant medical history, current medications, allergies, etc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Diagnosis
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            {diagnoses.map((diagnosis) => {
              const SeverityIcon = getSeverityIcon(diagnosis.severity);
              return (
                <div key={diagnosis.id} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{diagnosis.patientName}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(diagnosis.timestamp).toLocaleDateString()} at{' '}
                        {new Date(diagnosis.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <SeverityIcon className="h-5 w-5 mr-2 text-gray-400" />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(diagnosis.severity)}`}>
                        {diagnosis.severity.charAt(0).toUpperCase() + diagnosis.severity.slice(1)} Priority
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Reported Symptoms</h4>
                      <div className="flex flex-wrap gap-2">
                        {diagnosis.symptoms.map((symptom, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Preliminary Diagnosis</h4>
                      <p className="text-sm text-gray-900 font-medium">{diagnosis.preliminaryDiagnosis}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {diagnosis.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {diagnosis.followUp && (
                    <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <p className="text-sm text-yellow-800">
                        <strong>Follow-up Required:</strong> Please schedule an in-person consultation for further evaluation.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {diagnoses.length === 0 && (
              <div className="text-center py-12">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No diagnosis history found. Submit your first consultation to get started.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};