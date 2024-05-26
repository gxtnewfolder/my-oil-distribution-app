// src/app/financial-reports/general-ledger/page.tsx
"use client"; // For Next.js 13+

import React, { useState, useEffect } from "react";
import { GeneralLedgerEntry } from "@/types/financial";
import Link from "next/link";

const GeneralLedger: React.FC = () => {
  const [ledgerData, setLedgerData] = useState<GeneralLedgerEntry[]>([]);
  const [selectedAccount, setSelectedAccount] = useState("Account Receivable");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/ledger-entries"); // Fetch from your Next.js API route
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setLedgerData(data);
      } catch (error) {
        console.error("Error fetching ledger data:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredLedgerData = ledgerData.filter((entry) =>
    entry.account?.toLowerCase().includes(selectedAccount.toLowerCase())
  );

  const uniqueAccountNames = Array.from(
    new Set(ledgerData.map((entry) => entry.account))
  );

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/financial-reports"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex">
          <select
            value={selectedAccount} // Use selectedAccount state
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="border rounded-md p-2 mr-2 flex-grow"
          >
            <option value="">Select Account</option>
            {/* Map over unique account names */}
            {uniqueAccountNames.map((accountName) => (
              <option key={accountName} value={accountName}>
                {accountName}
              </option>
            ))}
          </select>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Search Now
          </button>
        </div>
      </div>

      {/* General Ledger Table */}
      <h2 className="text-xl font-semibold mb-2">General Ledger</h2>

      {/* Conditional Rendering for Loading/Error/Data States */}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : filteredLedgerData.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACCOUNT Type
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DEBIT
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CREDIT
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BALANCE
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLedgerData.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.account}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.debit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.credit}
                </td>
                {/* Calculate and display the balance here */}
                {/* Assuming your API provides the balance or you calculate it on the frontend */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {entry.balance || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bg-green-100 text-green-700 py-2 px-4 rounded border border-green-300 mt-4">
          No transactions found
        </div>
      )}
    </div>
  );
};

export default GeneralLedger;
