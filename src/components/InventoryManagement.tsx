import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, Search, Filter, TrendingDown, TrendingUp } from 'lucide-react';
import { Inventory } from '../types';
import { mockInventory } from '../data/mockData';

export const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<Inventory[]>(mockInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'low-stock': return AlertTriangle;
      case 'out-of-stock': return TrendingDown;
      case 'in-stock': return TrendingUp;
      default: return Package;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'medication': return 'bg-blue-50 text-blue-700';
      case 'equipment': return 'bg-purple-50 text-purple-700';
      case 'supplies': return 'bg-green-50 text-green-700';
      case 'consumables': return 'bg-orange-50 text-orange-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getStockPercentage = (current: number, minimum: number) => {
    return Math.round((current / (minimum * 2)) * 100);
  };

  const inventoryStats = {
    total: inventory.length,
    inStock: inventory.filter(item => item.status === 'in-stock').length,
    lowStock: inventory.filter(item => item.status === 'low-stock').length,
    outOfStock: inventory.filter(item => item.status === 'out-of-stock').length,
    expired: inventory.filter(item => item.status === 'expired').length,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
              <p className="text-gray-600">Track medical supplies, equipment, and medications</p>
            </div>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Items</p>
                <p className="text-2xl font-bold text-blue-900">{inventoryStats.total}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">In Stock</p>
                <p className="text-2xl font-bold text-green-900">{inventoryStats.inStock}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-900">{inventoryStats.lowStock}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-900">{inventoryStats.outOfStock}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.expired}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full"
              />
            </div>
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="medication">Medication</option>
            <option value="equipment">Equipment</option>
            <option value="supplies">Supplies</option>
            <option value="consumables">Consumables</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Inventory Items */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredInventory.map((item) => {
            const StatusIcon = getStatusIcon(item.status);
            const stockPercentage = getStockPercentage(item.currentStock, item.minimumStock);
            
            return (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${getCategoryColor(item.category)}`}>
                      {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                  <StatusIcon className="h-5 w-5 text-gray-400" />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Stock:</span>
                    <span className="font-semibold text-gray-900">{item.currentStock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Minimum Stock:</span>
                    <span className="font-semibold text-gray-900">{item.minimumStock}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Unit Price:</span>
                    <span className="font-semibold text-gray-900">K{item.unitPrice}</span>
                  </div>
                </div>

                {/* Stock Level Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Stock Level</span>
                    <span className="text-xs text-gray-600">{stockPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        stockPercentage > 50 ? 'bg-green-500' :
                        stockPercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Supplier:</span> {item.supplier}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Location:</span> {item.location}
                  </div>
                  {item.expiryDate && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Expires:</span> {new Date(item.expiryDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('-', ' ')}
                  </span>
                  <div className="text-sm font-semibold text-gray-900">
                    Total: K{(item.currentStock * item.unitPrice).toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No inventory items found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};