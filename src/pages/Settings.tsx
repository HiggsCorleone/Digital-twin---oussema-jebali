import React, { useState } from 'react';
import { 
  Save, Settings as SettingsIcon, Bell, Shield, 
  Server, Database, Activity, Trash2, AlertTriangle 
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'services', label: 'Services', icon: Server },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-700 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-500 border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">General Settings</h2>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    System Name
                  </label>
                  <input
                    type="text"
                    defaultValue="MISO Security Digital Twin"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Administrator Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@example.com"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    min="5"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Data Retention Period (days)
                  </label>
                  <input
                    type="number"
                    defaultValue="90"
                    min="1"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                    />
                    <span className="ml-2 text-white">Dark</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                    />
                    <span className="ml-2 text-white">Light</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="theme"
                      value="system"
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                    />
                    <span className="ml-2 text-white">System Default</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Default Chart Type
                </label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="line">Line Chart</option>
                  <option value="bar">Bar Chart</option>
                  <option value="scatter">Scatter Plot</option>
                  <option value="combined">Combined Chart</option>
                </select>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Enable automatic threat detection</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Enable eavesdropping monitoring</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Log all security events</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Enable automatic security response</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Secrecy Rate Threshold
                  </label>
                  <input
                    type="number"
                    defaultValue="1.5"
                    step="0.1"
                    min="0"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="mt-1 text-sm text-gray-400">
                    Alert will trigger when secrecy rate falls below this value
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Alert Level
                  </label>
                  <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="low">Low - Notifications Only</option>
                    <option value="medium" selected>Medium - Notifications + Logging</option>
                    <option value="high">High - Auto Response + Notifications</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <div className="p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-md flex items-start">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="text-yellow-500 font-medium">Warning</h3>
                      <p className="text-yellow-200/70 text-sm mt-1">
                        Changing security settings may affect the system's ability to detect threats.
                        Make sure to test your configuration after making changes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">Notification Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Enable in-app notifications</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Enable email notifications</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                    />
                    <span className="ml-2 text-white">Enable SMS notifications</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-md font-medium text-white mb-3">Notification Events</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div>
                      <p className="text-white font-medium">Eavesdropping Detected</p>
                      <p className="text-sm text-gray-400">Notify when eavesdropping is detected</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">App</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">SMS</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div>
                      <p className="text-white font-medium">Low Secrecy Rate</p>
                      <p className="text-sm text-gray-400">Notify when secrecy rate falls below threshold</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">App</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">SMS</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded-md">
                    <div>
                      <p className="text-white font-medium">Service Down</p>
                      <p className="text-sm text-gray-400">Notify when a system service goes down</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">App</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">Email</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-gray-300">SMS</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                  Test Notifications
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">Service Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">Orion Context Broker</h3>
                      <p className="text-sm text-gray-400 mt-1">Manages context information</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Restart
                      </button>
                      <label className="inline-flex items-center">
                        <span className="mr-2 text-gray-300">Active</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full">
                          <input 
                            type="checkbox"
                            defaultChecked
                            className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                          />
                          <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                          <div className="absolute top-1 left-1 w-4 h-4 transition duration-200 ease-in-out bg-white rounded-full transform translate-x-0 translate-x-full"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Port
                      </label>
                      <input
                        type="number"
                        defaultValue="1026"
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Log Level
                      </label>
                      <select className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm">
                        <option value="error">Error</option>
                        <option value="warn">Warning</option>
                        <option value="info" selected>Info</option>
                        <option value="debug">Debug</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">IoT Agent</h3>
                      <p className="text-sm text-gray-400 mt-1">Handles IoT device connectivity</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Restart
                      </button>
                      <label className="inline-flex items-center">
                        <span className="mr-2 text-gray-300">Active</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full">
                          <input 
                            type="checkbox"
                            defaultChecked
                            className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                          />
                          <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                          <div className="absolute top-1 left-1 w-4 h-4 transition duration-200 ease-in-out bg-white rounded-full transform translate-x-0 translate-x-full"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Port
                      </label>
                      <input
                        type="number"
                        defaultValue="4041"
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Log Level
                      </label>
                      <select className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm">
                        <option value="error">Error</option>
                        <option value="warn">Warning</option>
                        <option value="info">Info</option>
                        <option value="debug" selected>Debug</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-medium">NiFi Service</h3>
                      <p className="text-sm text-gray-400 mt-1">Data flow management</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Restart
                      </button>
                      <label className="inline-flex items-center">
                        <span className="mr-2 text-gray-300">Active</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full">
                          <input 
                            type="checkbox"
                            defaultChecked
                            className="absolute w-6 h-6 opacity-0 z-10 cursor-pointer"
                          />
                          <div className="w-10 h-6 bg-gray-600 rounded-full"></div>
                          <div className="absolute top-1 left-1 w-4 h-4 transition duration-200 ease-in-out bg-white rounded-full transform translate-x-0 translate-x-full"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Port
                      </label>
                      <input
                        type="number"
                        defaultValue="8080"
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Memory Allocation
                      </label>
                      <select className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm">
                        <option value="512m">512 MB</option>
                        <option value="1g" selected>1 GB</option>
                        <option value="2g">2 GB</option>
                        <option value="4g">4 GB</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                  Reset All Services
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">Data Management</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium">Database Settings</h3>
                  
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        MongoDB Host
                      </label>
                      <input
                        type="text"
                        defaultValue="mongo"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        MongoDB Port
                      </label>
                      <input
                        type="number"
                        defaultValue="27017"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                      Test Connection
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium">Data Backup</h3>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Backup Schedule
                      </label>
                      <select className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white">
                        <option value="daily">Daily</option>
                        <option value="weekly" selected>Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="manual">Manual Only</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Backup Retention (days)
                      </label>
                      <input
                        type="number"
                        defaultValue="30"
                        min="1"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        Backup Now
                      </button>
                      <button className="px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-500">
                        View Backups
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium">Data Cleanup</h3>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-white">Auto-purge old data</span>
                      </label>
                      <p className="text-sm text-gray-400 mt-1 ml-6">
                        Automatically remove data older than the retention period
                      </p>
                    </div>
                    
                    <div className="pt-3 border-t border-gray-600">
                      <h4 className="text-white font-medium mb-2">Manual Cleanup</h4>
                      <div className="flex items-center space-x-3">
                        <button className="px-3 py-2 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700 flex items-center">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear Temporary Data
                        </button>
                        <button className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Reset All Data
                        </button>
                      </div>
                      <p className="text-sm text-red-400 mt-2">
                        Warning: Data cleanup operations cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-white mb-4">Monitoring Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium">Resource Monitoring</h3>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-white">Enable CPU monitoring</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-white">Enable memory monitoring</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-white">Enable disk monitoring</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-white">Enable network monitoring</span>
                      </label>
                    </div>
                    
                    <div className="pt-3">
                      <label className="block text-sm text-gray-400 mb-2">
                        Monitoring Interval (seconds)
                      </label>
                      <input
                        type="number"
                        defaultValue="30"
                        min="5"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium">Alert Thresholds</h3>
                  
                  <div className="mt-3 space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        CPU Usage Warning Threshold (%)
                      </label>
                      <input
                        type="number"
                        defaultValue="80"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Memory Usage Warning Threshold (%)
                      </label>
                      <input
                        type="number"
                        defaultValue="85"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Disk Usage Warning Threshold (%)
                      </label>
                      <input
                        type="number"
                        defaultValue="90"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-700 rounded-md">
                  <h3 className="text-white font-medium">Performance Logging</h3>
                  
                  <div className="mt-3 space-y-3">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded"
                        />
                        <span className="ml-2 text-white">Enable performance logging</span>
                      </label>
                      <p className="text-sm text-gray-400 mt-1 ml-6">
                        Log system performance metrics
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        Log Retention (days)
                      </label>
                      <input
                        type="number"
                        defaultValue="14"
                        min="1"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                      />
                    </div>
                    
                    <div>
                      <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                        View Performance Logs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors">
                  Reset to Defaults
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;