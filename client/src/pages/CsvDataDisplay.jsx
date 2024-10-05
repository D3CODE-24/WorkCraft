import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const CsvDataDisplay = ({ csvData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (csvData) {
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setData(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  }, [csvData]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 p-4 bg-blue-600 text-white">Market Demand Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.Demand}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvDataDisplay