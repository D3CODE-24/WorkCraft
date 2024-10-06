import React, { useState, useEffect } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { MARKET_ANALYSIS_API_END_POINT } from '@/utils/constants';
import CsvDataDisplay from './CsvDataDisplay';

const MarketAnalysis = () => {
  const [data, setData] = useState([]);
  const [previousData, setPreviousData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const initialData = await fetchData(`${MARKET_ANALYSIS_API_END_POINT}/market-data`);
      if (initialData) {
        setData(initialData);
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handlePredict = async () => {
    setIsLoading(true);
    const predictedData = await fetchData(`${MARKET_ANALYSIS_API_END_POINT}/predict`);
    if (predictedData) {
      setPreviousData(data);
      setData(predictedData);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Artisanal Product Sales Dashboard</h1>
      
      <button
        onClick={handlePredict}
        className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Predict'}
      </button>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        data.length > 0 && <CsvDataDisplay data={data} previousData={previousData} />
      )}
    </div>
  );
};

export default MarketAnalysis;