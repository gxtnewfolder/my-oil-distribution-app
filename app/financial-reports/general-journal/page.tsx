// src/app/financial-reports/general-journal/page.tsx
"use client";
import { JournalEntry } from "@/types/financial";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js

const GeneralJournalPage: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]); // Initialize with empty array of type JournalEntry[]
  const [selectedDate, setSelectedDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10; // Or whatever you set in your API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/journal-entries?page=${currentPage}${
            selectedDate ? `&date=${selectedDate}` : ""
          }`
        );
        const data: { entries: JournalEntry[]; totalPages: number } =
          await response.json();
        setJournalEntries(data.entries);
        setTotalPages(data.totalPages);
      } catch (error) {
        // ... error handling ...
      }
    };

    fetchData();
  }, [currentPage, selectedDate]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <Link // Use Next.js Link for navigation
        href="/financial-reports"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>
      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold mr-4">General Journal</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border rounded-md p-2"
          />
          <button
            onClick={() => {
              /* Implement search logic here */
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Search Now
          </button>
        </div>
        <div className="text-gray-600">
          Total Journal Entries: {journalEntries.length}
        </div>
      </div>

      {/* Journal Entries Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table Headings */}
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Title and Explanation
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                REF NO.
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DEBIT
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CREDIT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journalEntries.map((entry) => (
              <tr key={entry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {entry.date}
                </td>
                <td className="px-6 py-4 whitespace-pre-line">
                  {/* Nullish Coalescing and Optional Chaining */}
                  {(entry.account ?? "").split("\n").map((line, index) => (
                    <div
                      key={index}
                      className={index > 0 ? "ml-16" : ""} // Add margin if not the first line
                    >
                      {line}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{entry.refno}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {entry.debit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {entry.credit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GeneralJournalPage;
