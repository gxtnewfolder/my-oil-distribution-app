// src/app/financial-reports/monthly-income-statement/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { IncomeStatementEntry } from "@/types/financial"; // Make sure you have defined this type
import Link from "next/link";

const MonthlyIncomeStatement: React.FC = () => {
  const [incomeStatementData, setIncomeStatementData] =
    useState<IncomeStatementEntry | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/monthly-income-statement${
            selectedMonth ? `?month=${selectedMonth}` : ""
          }`
        ); // Assuming you have an API route for this
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setIncomeStatementData(data);
      } catch (error) {
        console.error("Error fetching income statement data:", error);
        setError(error as Error); // Type assertion to satisfy TypeScript
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const formatNumberWithCommas = (value: number): string => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <Link
        href="/financial-reports"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold p-2 px-4 rounded mb-4"
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

      {/* Conditional rendering for loading, error, and data states */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : incomeStatementData ? (
        <div className="mx-80">
          <h1 className="text-3xl font-bold mb-6 my-4">
            MONTHLY INCOME STATEMENT - {selectedMonth}
          </h1>

          {/* Sales Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">SALES</h2>
            {/* Map over sales data from your database */}
            <div className="flex justify-between">
              <span className="px-6">GASOHOL 95</span>
              <span className="text-right">
                {formatNumberWithCommas(incomeStatementData.sale_gas95)} ฿
              </span>
            </div>
            <div className="flex justify-between">
              <span className="px-6">Diesel</span>
              <span className="text-right">
                {formatNumberWithCommas(incomeStatementData.sale_diesel)} ฿
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">TOTAL SALES</span>
              <span className="text-right font-semibold">
                {incomeStatementData.totalsale} ฿
              </span>
            </div>
          </div>

          {/* Cost of Goods Sold (COGS) Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">COST OF GOODS SOLD</h2>
            <div className="flex justify-between">
              <span className="px-6">GASOHOL 95</span>
              <span className="text-right">
                {incomeStatementData.cogs_gas95} ฿
              </span>
            </div>
            <div className="flex justify-between">
              <span className="px-6">Diesel</span>
              <span className="text-right">
                {incomeStatementData.cogs_diesel} ฿
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">TOTAL COGS</span>
              <span className="text-right font-semibold">
                {incomeStatementData.total_cogs} ฿
              </span>
            </div>
          </div>

          {/* Gross Profit */}
          <div className="flex justify-between mt-2">
            <span className="font-semibold">GROSS PROFIT</span>
            <span className="text-right font-semibold">
              {incomeStatementData.grossprofit} ฿
            </span>
          </div>

          {/* Other Expenses Section */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mt-4 mb-2">OTHER EXPENSES</h2>
            {/* Map over your other expenses from the database */}
            <div className="flex justify-between">
              <span className="px-6">Day Shift Sale Office</span>
              <span className="text-right">
                {incomeStatementData.dayshift_saleoffice} ฿
              </span>
            </div>
            <div className="flex justify-between">
              <span className="px-6">Day Shift Gate</span>
              <span className="text-right">
                {incomeStatementData.dayshift_gate} ฿
              </span>
            </div>
            <div className="flex justify-between">
              <span className="px-6">Night Shift Gate</span>
              <span className="text-right">
                {incomeStatementData.nightshift_gate} ฿
              </span>
            </div>
            <div className="flex justify-between">
              <span className="px-6">Depreciation</span>
              <span className="text-right">
                {incomeStatementData.depreciation} ฿
              </span>
            </div>
            <div className="flex justify-between">
              <span className="px-6">Utility Expense</span>
              <span className="text-right">
                {incomeStatementData.utilityExpense} ฿
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="font-semibold">TOTAL OPERATING EXPENSE</span>
              <span className="text-right font-semibold">
                {incomeStatementData.totolOpEx} ฿
              </span>
            </div>
          </div>

          {/* Net Income */}
          <div className="flex justify-between mt-4">
            <span className="font-semibold">NET INCOME</span>
            <span className="text-right font-semibold">
              {incomeStatementData.netincome} ฿
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MonthlyIncomeStatement;
