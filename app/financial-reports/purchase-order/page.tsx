// src/app/financial-reports/purchase-order/page.tsx
"use client"; // For Next.js 13+

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PurchaseOrder } from '@/types/financial';

function PurchaseOrderPage() {
  const router = useRouter();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [filteredPOs, setFilteredPOs] = useState<PurchaseOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/purchase-orders'); // Replace with your API endpoint
        const data = await response.json();
        setPurchaseOrders(data);
        setFilteredPOs(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = purchaseOrders.filter(po =>
      po.po_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPOs(filtered);
  }, [searchQuery, purchaseOrders]);

  const handleViewDetails = (poNumber: string) => {
    router.push(`/financial-reports/purchase-order/${poNumber}`); 
  };

  return (
    <div className="container mx-auto p-4">
      {/* Back Button */}
      <Link
        href="/financial-reports"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>
      <h2 className="text-2xl font-semibold mb-4 my-4">Purchase Order</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by PO Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>

      {/* Conditional rendering for loading, error, or data */}
      {isLoading ? (
        <p>Loading purchase orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : filteredPOs.length > 0 ? (
        filteredPOs.map((po) => (
          <div
            key={po.id} 
            className="bg-white rounded-lg shadow-md p-6 mb-4 cursor-pointer"
            onClick={() => handleViewDetails(po.po_number)} 
          >
            {/* Header Section */}
            <h3 className="text-xl text-center font-semibold mb-4">Purchase Order</h3>
            <div className="flex justify-between mb-4">
              <div className="mx-6">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={80} 
                  height={80} 
                />
              </div>
              <div className="text-right">
                <p>PO No: {po.po_number}</p>
                <p>Invoice No: {po.invoice}</p>
                <p>Date: {po.datetime_created}</p>
              </div>
            </div>

            {/* Display only a summary of items */}
            <p>Total Amount: {po.totolprice}</p>

            {/* ... (optional: display a few key item details) ... */}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No purchase orders found.</p>
      )}
    </div>
  );
}

export default PurchaseOrderPage;

