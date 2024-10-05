import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const CsvDataDisplay = ({ csvData }) => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (csvData) {
      Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setHeaders(results.meta.fields);
          setData(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        },
      });
    }
  }, [csvData]);

  const handlePredict = async () => {
    setIsLoading(true);
    const lastThreeMonths = data.slice(-3);
    
    try {
      // Assuming your API endpoint is '/api/predict'
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: lastThreeMonths }),
      });
      
      if (!response.ok) {
        throw new Error('Prediction failed');
      }
      
      const predictionResults = await response.json();
      setPredictions(predictionResults);
    } catch (error) {
      console.error('Error during prediction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderPredictionArrow = (product) => {
    if (!predictions[product]) return null;
    const lastValue = data[data.length - 1][product];
    const predictedValue = predictions[product];
    const isIncrease = predictedValue > lastValue;
    
    return isIncrease ? 
      <ArrowUpCircle className="text-green-500 inline ml-2" /> :
      <ArrowDownCircle className="text-red-500 inline ml-2" />;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 p-4 bg-blue-600 text-white">Artisanal Product Sales Data</h1>
      <div className="p-4">
        <button
          onClick={handlePredict}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          {isLoading ? 'Predicting...' : 'Predict'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {header}
                  {index > 0 && renderPredictionArrow(header)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {row[header]}
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