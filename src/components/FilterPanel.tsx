import React from 'react';
import { X, Calendar, Sliders } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
}

interface FilterPanelProps {
  onClose: () => void;
  scenarios: Scenario[];
  selectedScenario: string;
  onScenarioChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  onClose, 
  scenarios, 
  selectedScenario,
  onScenarioChange
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Filter Options</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Scenario Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Scenario
          </label>
          <select 
            value={selectedScenario}
            onChange={onScenarioChange}
            className="bg-gray-700 border border-gray-600 text-white rounded-md w-full px-3 py-2"
          >
            <option value="default">Default Scenario</option>
            {scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Date Range
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-gray-400" />
            </div>
            <select 
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full pl-10 pr-3 py-2"
            >
              <option value="last24h">Last 24 Hours</option>
              <option value="last7d">Last 7 Days</option>
              <option value="last30d">Last 30 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
        
        {/* SNR Range */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            SNR Range (dB)
          </label>
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="Min"
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full px-3 py-2"
            />
            <span className="text-gray-400">to</span>
            <input 
              type="number" 
              placeholder="Max"
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full px-3 py-2"
            />
          </div>
        </div>
        
        {/* Secrecy Rate Range */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Secrecy Rate Range
          </label>
          <div className="flex items-center space-x-2">
            <input 
              type="number" 
              placeholder="Min"
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full px-3 py-2"
            />
            <span className="text-gray-400">to</span>
            <input 
              type="number" 
              placeholder="Max"
              className="bg-gray-700 border border-gray-600 text-white rounded-md w-full px-3 py-2"
            />
          </div>
        </div>
        
        {/* Show Eavesdropping Events */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Eavesdropping Events
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="eavesdropping" 
                value="all"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
                defaultChecked
              />
              <span className="ml-2 text-gray-300">All</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="eavesdropping" 
                value="only"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
              />
              <span className="ml-2 text-gray-300">Only</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="eavesdropping" 
                value="exclude"
                className="form-radio h-4 w-4 text-blue-600 bg-gray-700 border-gray-600"
              />
              <span className="ml-2 text-gray-300">Exclude</span>
            </label>
          </div>
        </div>
        
        {/* Additional Options */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Advanced Options
          </label>
          <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-md px-3 py-2 text-gray-300 flex items-center">
            <Sliders className="h-4 w-4 mr-2" />
            Configure Options
          </button>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button 
          onClick={onClose}
          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;