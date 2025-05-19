import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { 
  LineChart, BarChart, ComposedChart, ScatterChart,
  Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, Scatter, Area
} from 'recharts';
import { 
  Download, Filter, RefreshCw, 
  ChevronDown, Settings, Share2 
} from 'lucide-react';
import { fetchSecrecyRateData, fetchScenarioData } from '../api/dataService';
import SecrecyRateTable from '../components/SecrecyRateTable';
import FilterPanel from '../components/FilterPanel';

const SecrecyRates: React.FC = () => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'scatter' | 'combined'>('line');
  const [scenario, setScenario] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: secrecyData, isLoading: dataLoading, refetch } = useQuery(
    ['secrecyRateData', scenario], 
    () => fetchSecrecyRateData(scenario)
  );
  
  const { data: scenarios } = useQuery('scenarios', fetchScenarioData);

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setScenario(e.target.value);
  };

  const renderChart = () => {
    if (dataLoading) {
      return (
        <div className="flex items-center justify-center h-80">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    const data = secrecyData?.detailedData || [];
    
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }}
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#CBD5E0" tick={{ fill: '#CBD5E0' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#CBD5E0' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="secrecyRate" 
                name="Secrecy Rate" 
                stroke="#3182CE" 
                strokeWidth={2} 
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="theoreticalMax" 
                name="Theoretical Max" 
                stroke="#68D391" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="eavesdroppingImpact" 
                name="Eavesdrop Impact" 
                stroke="#F56565" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis 
                dataKey="scenario" 
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }}
              />
              <YAxis stroke="#CBD5E0" tick={{ fill: '#CBD5E0' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#CBD5E0' }}
              />
              <Legend />
              <Bar dataKey="secrecyRate" name="Secrecy Rate" fill="#3182CE" />
              <Bar dataKey="theoreticalMax" name="Theoretical Max" fill="#68D391" />
              <Bar dataKey="eavesdroppingImpact" name="Eavesdrop Impact" fill="#F56565" />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis 
                dataKey="snr" 
                name="SNR (dB)"
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }}
                domain={['auto', 'auto']}
              />
              <YAxis 
                dataKey="secrecyRate" 
                name="Secrecy Rate" 
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }}
                domain={[0, 'auto']}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#CBD5E0' }}
                cursor={{ strokeDasharray: '3 3' }}
              />
              <Legend />
              <Scatter 
                name="System Performance" 
                data={data} 
                fill="#3182CE"
                line
              />
              <Scatter 
                name="Critical Points" 
                data={secrecyData?.criticalPoints || []} 
                fill="#F56565"
                shape="triangle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
        
      case 'combined':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
              <XAxis 
                dataKey="timestamp" 
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }}
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis 
                yAxisId="left" 
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }} 
                label={{ value: 'Secrecy Rate', angle: -90, position: 'insideLeft', fill: '#CBD5E0' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#CBD5E0" 
                tick={{ fill: '#CBD5E0' }}
                label={{ value: 'SNR (dB)', angle: 90, position: 'insideRight', fill: '#CBD5E0' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '4px' }}
                labelStyle={{ color: '#CBD5E0' }}
              />
              <Legend />
              <Area 
                yAxisId="left" 
                type="monotone" 
                dataKey="secrecyRate" 
                name="Secrecy Rate" 
                fill="#3182CE" 
                stroke="#3182CE" 
                fillOpacity={0.3} 
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="theoreticalMax" 
                name="Theoretical Max" 
                stroke="#68D391" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                dot={false}
              />
              <Bar 
                yAxisId="right" 
                dataKey="snr" 
                name="SNR (dB)" 
                fill="#805AD5" 
                barSize={20}
              />
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="eavesdroppingImpact" 
                name="Eavesdrop Impact" 
                stroke="#F56565" 
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-white mb-4 md:mb-0">Secrecy Rate Analysis</h1>
        
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          <button 
            onClick={() => refetch()}
            className="flex items-center px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-200"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
          
          <button 
            className="flex items-center px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>
      
      {showFilters && (
        <FilterPanel 
          onClose={() => setShowFilters(false)}
          scenarios={scenarios || []}
          selectedScenario={scenario}
          onScenarioChange={handleScenarioChange}
        />
      )}
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center">
            <h2 className="text-xl font-medium text-white">Secrecy Rate Visualization</h2>
            <div className="flex items-center ml-4">
              <Settings className="h-5 w-5 text-gray-400 mr-2" />
              <Share2 className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select 
              value={scenario}
              onChange={handleScenarioChange}
              className="bg-gray-700 border-gray-600 text-white rounded px-3 py-2"
            >
              <option value="default">Default Scenario</option>
              {scenarios?.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            
            <div className="bg-gray-700 rounded overflow-hidden flex">
              <button 
                onClick={() => setChartType('line')}
                className={`px-3 py-2 ${chartType === 'line' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
              >
                Line
              </button>
              <button 
                onClick={() => setChartType('bar')}
                className={`px-3 py-2 ${chartType === 'bar' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
              >
                Bar
              </button>
              <button 
                onClick={() => setChartType('scatter')}
                className={`px-3 py-2 ${chartType === 'scatter' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
              >
                Scatter
              </button>
              <button 
                onClick={() => setChartType('combined')}
                className={`px-3 py-2 ${chartType === 'combined' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
              >
                Combined
              </button>
            </div>
          </div>
        </div>
        
        {renderChart()}
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-medium text-white mb-6">Secrecy Rate Data</h2>
        <SecrecyRateTable 
          data={secrecyData?.detailedData || []} 
          isLoading={dataLoading} 
        />
      </div>
    </div>
  );
};

export default SecrecyRates;