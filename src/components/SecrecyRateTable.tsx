import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';

interface DataPoint {
  timestamp: string;
  snr: number;
  secrecyRate: number;
  theoreticalMax: number;
  eavesdroppingImpact: number;
  scenario: string;
}

interface SecrecyRateTableProps {
  data: DataPoint[];
  isLoading: boolean;
}

const SecrecyRateTable: React.FC<SecrecyRateTableProps> = ({ data, isLoading }) => {
  const [sortField, setSortField] = useState<keyof DataPoint>('timestamp');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const handleSort = (field: keyof DataPoint) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredData = data.filter(item => 
    item.scenario.toLowerCase().includes(search.toLowerCase())
  );
  
  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const SortIcon = ({ field }: { field: keyof DataPoint }) => {
    if (field !== sortField) return null;
    return sortDirection === 'asc' ? 
      <ArrowUp className="h-3 w-3 inline ml-1" /> : 
      <ArrowDown className="h-3 w-3 inline ml-1" />;
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by scenario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="text-sm text-gray-400">
          Showing {Math.min(paginatedData.length, itemsPerPage)} of {filteredData.length} entries
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('timestamp')}
              >
                Timestamp <SortIcon field="timestamp" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('snr')}
              >
                SNR (dB) <SortIcon field="snr" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('secrecyRate')}
              >
                Secrecy Rate <SortIcon field="secrecyRate" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('theoreticalMax')}
              >
                Max Rate <SortIcon field="theoreticalMax" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('eavesdroppingImpact')}
              >
                Eavesdrop Impact <SortIcon field="eavesdroppingImpact" />
              </th>
              <th 
                scope="col" 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('scenario')}
              >
                Scenario <SortIcon field="scenario" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {paginatedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.snr.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${item.secrecyRate >= 2 ? 'bg-green-100 text-green-800' : 
                      item.secrecyRate >= 1 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {item.secrecyRate.toFixed(3)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.theoreticalMax.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {item.eavesdroppingImpact > 0 ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {item.eavesdroppingImpact.toFixed(3)}
                    </span>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {item.scenario}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          
          <div className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
          
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-700 text-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SecrecyRateTable;