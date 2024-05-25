"use client" // for next.js 13 and above to use client component

import React, { useState, useEffect } from 'react';
import { JournalEntry } from '@/types/financial'; // Assuming you have types defined

const GeneralJournal: React.FC = () => {
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);

    useEffect(() => {
        // Fetch journal entries from your API or data source
        const fetchJournalEntries = async () => {
            const response = await fetch('/api/journal-entries');
            const data = await response.json();
            setJournalEntries(data);
        };
        fetchJournalEntries();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">General Journal</h1>

            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Account</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Debit</th>
                        <th className="px-4 py-2">Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {journalEntries.map((entry, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{entry.date}</td>
                            <td className="border px-4 py-2">{entry.account}</td>
                            <td className="border px-4 py-2">{entry.description}</td>
                            <td className="border px-4 py-2">{entry.debit}</td>
                            <td className="border px-4 py-2">{entry.credit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GeneralJournal;
