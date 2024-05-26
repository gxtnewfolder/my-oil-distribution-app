// src/app/financial-reports/inventory-stock-card/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { StockData } from '@/types/financial';

const InventoryStockCard: React.FC = () => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("March"); // Default month
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/inventory-stock-card${
            selectedMonth ? `?month=${selectedMonth}` : ""
          }`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching inventory stock data:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [selectedMonth]);

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <Link
        href="/financial-reports"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>

      {/* Month Selection Dropdown */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border border-gray-300 rounded-md p-2 mx-6"
      >
        <option value="">Select Month</option>
        {/* You can dynamically generate month options here */}
        {/* Example using an array: */}
        {["January", "February", "March", "April"].map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <h2 className="text-2xl font-semibold text-center mb-4 my-4">
        Inventory Stock Card
      </h2>
      <p className="text-center text-gray-500 mb-4">
        {selectedMonth} 2022{" "}
        {/* Assuming you have the year data or can calculate it */}
      </p>

      {isLoading ? (
        <p>Loading inventory stock data...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : stockData ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-white text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PATROL TYPE
              </th>
              <th className="px-6 py-3 bg-teal-100 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-l-lg">
                GASOHOL 95
              </th>
              <th className="px-6 py-3 bg-teal-100 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-r-lg">
                DIESEL
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stockData).map((key) => (
              <tr key={key}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {key}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700">
                  {stockData[key].GASOHOL95}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-gray-700">
                  {stockData[key].DIESEL}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default InventoryStockCard;
