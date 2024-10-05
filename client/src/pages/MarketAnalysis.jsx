import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const MarketAnalysis = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/market-data');
      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }
      const result = await response.json();
      setData(result.data);
      setHeaders(result.headers);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePredict = async () => {
    setIsLoading(true);
    const lastThreeMonths = data.slice(-3);
    
    try {
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
    } catch (err) {
      setError('Error during prediction: ' + err.message);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Artisanal Product Sales Dashboard</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
    </div>
  );
};

export default MarketAnalysis;