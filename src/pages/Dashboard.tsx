import React from 'react';
import { useQuery } from 'react-query';
import { BarChart, LineChart, AreaChart, PieChart } from 'recharts';
import { 
  Eye, Shield, AlertTriangle, Radio, 
  TrendingUp, BarChart2, PieChart as PieChartIcon, Activity
} from 'lucide-react';
import { fetchSystemStatus, fetchSecrecyRateData } from '../api/dataService';
import StatusCard from '../components/StatusCard';
import SecrecyRateChart from '../components/SecrecyRateChart';
import SystemOverview from '../components/SystemOverview';
import MetricCard from '../components/MetricCard';

const Dashboard: React.FC = () => {
  const { data: systemStatus, isLoading: statusLoading } = useQuery(
    'systemStatus', 
    fetchSystemStatus
  );
  
  const { data: secrecyData, isLoading: dataLoading } = useQuery(
    'secrecyRateData', 
    fetchSecrecyRateData
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">MISO System Digital Twin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full flex items-center">
            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
            System Online
          </div>
          <div className="text-gray-400">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard 
          title="Security Status"
          value={statusLoading ? "Loading..." : systemStatus?.securityStatus || "Unknown"}
          icon={<Shield className="h-6 w-6" />}
          status={statusLoading ? "loading" : (systemStatus?.securityThreat ? "warning" : "success")}
        />
        <StatusCard 
          title="Eavesdropping Detection"
          value={statusLoading ? "Loading..." : systemStatus?.eavesdroppingCount?.toString() || "0"}
          icon={<Eye className="h-6 w-6" />}
          status={statusLoading ? "loading" : (systemStatus?.eavesdroppingCount > 0 ? "danger" : "success")}
        />
        <StatusCard 
          title="Active MISO Channels"
          value={statusLoading ? "Loading..." : systemStatus?.activeChannels?.toString() || "0"}
          icon={<Radio className="h-6 w-6" />}
          status="info"
        />
        <StatusCard 
          title="Alert Level"
          value={statusLoading ? "Loading..." : systemStatus?.alertLevel || "Normal"}
          icon={<AlertTriangle className="h-6 w-6" />}
          status={statusLoading ? "loading" : 
            (systemStatus?.alertLevel === "High" ? "danger" : 
             systemStatus?.alertLevel === "Medium" ? "warning" : "success")}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Secrecy Rate Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium text-white">Secrecy Rate Over Time</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 rounded text-white text-sm">
                Last 24h
              </button>
              <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 text-sm">
                Last Week
              </button>
              <button className="px-3 py-1 bg-gray-700 rounded text-gray-300 text-sm">
                Last Month
              </button>
            </div>
          </div>
          {dataLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <SecrecyRateChart data={secrecyData?.timeSeriesData || []} />
          )}
        </div>

        {/* System Overview */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-medium text-white mb-6">System Overview</h2>
          {statusLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <SystemOverview data={systemStatus?.systemOverview || {}} />
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <MetricCard 
          title="Avg. Secrecy Rate" 
          value={dataLoading ? "Loading..." : secrecyData?.avgSecrecyRate?.toFixed(2) || "0"}
          icon={<TrendingUp className="h-5 w-5" />}
          trend={dataLoading ? 0 : secrecyData?.avgRateTrend || 0}
        />
        <MetricCard 
          title="Channel Quality" 
          value={dataLoading ? "Loading..." : secrecyData?.channelQuality || "Unknown"}
          icon={<Activity className="h-5 w-5" />}
          trend={dataLoading ? 0 : secrecyData?.qualityTrend || 0}
        />
        <MetricCard 
          title="Security Score" 
          value={dataLoading ? "Loading..." : secrecyData?.securityScore?.toString() || "0"}
          icon={<BarChart2 className="h-5 w-5" />}
          trend={dataLoading ? 0 : secrecyData?.securityTrend || 0}
          suffix="/100"
        />
        <MetricCard 
          title="Vulnerability Index" 
          value={dataLoading ? "Loading..." : secrecyData?.vulnerabilityIndex?.toFixed(2) || "0"}
          icon={<PieChartIcon className="h-5 w-5" />}
          trend={dataLoading ? 0 : -secrecyData?.vulnerabilityTrend || 0}
          trendInverse
        />
      </div>
    </div>
  );
};

export default Dashboard;