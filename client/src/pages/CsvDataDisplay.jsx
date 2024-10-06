import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const CsvDataDisplay = ({ data, previousData }) => {
  const headers = Object.keys(data[0] || {});
  const columns = Object.keys(data[0]);
  const dateColumn = columns[0]; // Assuming the first column is the date/month
  const saleColumns = columns.slice(1); // All other columns are sales data
  const metricColumns = columns.slice(1);

  const getTrend = (currentValue, previousValue) => {
    if (currentValue > previousValue) {
      return <ArrowUp className="text-green-500 ml-2" />;
    } else if (currentValue < previousValue) {
      return <ArrowDown className="text-red-500 ml-2" />;
    }
    return null;
  };
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleItem = (dataKey) => {
    setSelectedItem((prev) => (prev === dataKey ? null : dataKey));
  };

  const CustomizedLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {payload.map((entry) => (
          <button
            key={entry.value}
            onClick={() => toggleItem(entry.dataKey)}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              selectedItem === entry.dataKey || !selectedItem
                ? "bg-gray-200 text-gray-800"
                : "bg-gray-100 text-gray-400"
            }`}
            style={{ borderColor: entry.color, borderWidth: 2 }}
          >
            {entry.value}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={dateColumn}
              label={{ value: "Month", position: "insideBottom", offset: -5 }}
            />
            <YAxis
              label={{ value: "Sales", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend content={<CustomizedLegend />} />
            {saleColumns.map(
              (column, index) =>
                (!selectedItem || selectedItem === column) && (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={column}
                    stroke={`hsl(${(index * 36) % 360}, 70%, 50%)`}
                    strokeWidth={2}
                    dot={{ r: 0 }}
                    activeDot={{ r: 0 }}
                  />
                ),
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-y-auto max-h-100">
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
    </div>
  );
};

export default CsvDataDisplay;

