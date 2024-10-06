import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const CsvDataDisplay = ({ data, previousData }) => {
  const headers = Object.keys(data[0] || {});

  const getTrend = (currentValue, previousValue) => {
    if (currentValue > previousValue) {
      return <ArrowUpCircle className="text-green-500" />;
    } else if (currentValue < previousValue) {
      return <ArrowDownCircle className="text-red-500" />;
    }
    return null;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 p-4 bg-blue-600 text-white">Artisanal Product Sales Data</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    {row[header]}
                    {colIndex > 0 && previousData && previousData[rowIndex] && 
                      getTrend(row[header], previousData[rowIndex][header])
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CsvDataDisplay