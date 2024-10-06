import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const CsvDataDisplay = ({ data, previousData }) => {
  const headers = Object.keys(data[0] || {});
  const columns = Object.keys(data[0]);
  const dateColumn = columns[0]; // Assuming the first column is the date/month
  const metricColumns = columns.slice(1);

  const getTrend = (currentValue, previousValue) => {
    if (currentValue > previousValue) {
      return <ArrowUp className="text-green-500 ml-2" />;
    } else if (currentValue < previousValue) {
      return <ArrowDown className="text-red-500 ml-2" />;
    }
    return null;
  };

  return (
    <div className="overflow-y-auto max-h-100">
      {" "}
      {/* Adjust max height as needed */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {dateColumn}
            </th>
            {metricColumns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row[dateColumn]}
              </td>
              {metricColumns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  <span className="flex items-center">
                    {row[column]}
                    {rowIndex === 0 &&
                      previousData &&
                      previousData[rowIndex] &&
                      getTrend(row[column], previousData[rowIndex][column])}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvDataDisplay;

