"use client" // for next.js 13 and above to use client component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PurchaseOrder } from '@/types/financial'; // Make sure to define your PurchaseOrder type

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
      po.poNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPOs(filtered);
  }, [searchQuery, purchaseOrders]);

  const handleViewDetails = (poNumber: string) => {
    router.push(`/financial-reports/purchase-order/${poNumber}`); // Navigate to details page
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
      <h2 className="text-2xl font-semibold mb-4">Purchase Order</h2>

      {/* Search Bar */}
      {/* ... (Search bar remains the same) ... */}

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
            onClick={() => handleViewDetails(po.poNumber)} // Add onClick handler
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
                <p>PO No: {po.poNumber}</p>
                <p>Invoice No: {po.invoiceNumber}</p>
                <p>Date: {po.date}</p>
              </div>
            </div>

            {/* Display only a summary of items */}
            <p>Total Items: {po.items.length}</p> 
            <p>Total Amount: {po.totalAmount}</p>

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
