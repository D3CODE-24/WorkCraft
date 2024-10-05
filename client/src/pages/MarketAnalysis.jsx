import React,{useState,useEffect}from 'react'
import CsvDataDisplay from './CsvDataDisplay'

const MarketAnalysis = () => {
    const [csvData, setCsvData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCsvData = async () => {
        try {
          const response = await fetch('/api/market-data'); // Replace with your actual API endpoint
          if (!response.ok) {
            throw new Error('Failed to fetch CSV data');
          }
          const data = await response.text();
          setCsvData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCsvData();
    }, []);
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Market Analysis Dashboard</h1>
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
          csvData && <CsvDataDisplay csvData={csvData} />
        )}
      </div>
    );
  };
  
  export default MarketAnalysis;