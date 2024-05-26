// src/app/financial-reports/purchase-order/page.tsx
"use client"; // For Next.js 13+

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PurchaseOrder } from "@/types/financial";

function PurchaseOrderPage() {
  const router = useRouter();
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [filteredPOs, setFilteredPOs] = useState<PurchaseOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/purchase-orders"); // Replace with your API endpoint
        const data = await response.json();
        setPurchaseOrders(data);
        setFilteredPOs(data);
      } catch (error) {
        console.error("Error fetching purchase orders:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = purchaseOrders.filter((po) =>
      po.po_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPOs(filtered);
  }, [searchQuery, purchaseOrders]);

  const handleViewDetails = (poNumber: string) => {
    router.push(`/sale-office/purchase-order/${poNumber}`); // Navigate to details page
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/sale-office"
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

      {/* Purchase Orders Table */}
      {isLoading ? (
        <p>Loading purchase orders...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : filteredPOs.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PO Number
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPOs.map((po) => (
              <tr
                key={po.id}
                onClick={() => handleViewDetails(po.po_number)} // Navigate on row click
                className="cursor-pointer hover:bg-gray-100" // Visual feedback
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {po.datetime_created.split(".")[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{po.po_number}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {po.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{po.totolprice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No purchase orders found.</p>
      )}
    </div>
  );
}

export default PurchaseOrderPage;
