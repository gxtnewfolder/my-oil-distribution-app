// app/financial-reports/purchase-order/[po_number]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { PurchaseOrder } from '@/types/financial';
import Link from 'next/link';

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

const PurchaseOrderDetailsPage: React.FC = () => {
  const { po_number } = useParams<{ po_number: string }>(); // Get po_number from URL
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/purchase-orders/${po_number}`);
        if (!response.ok) {
          throw new Error('Purchase order not found.');
        }
        const data = await response.json();
        setPurchaseOrder(data);
      } catch (error) {
        console.error('Error fetching purchase order details:', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data immediately when the component mounts
  }, [po_number]); // Re-fetch data if po_number changes

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/financial-reports/purchase-order"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>

      {isLoading ? (
        <p>Loading purchase order details...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : purchaseOrder ? (
        <div className="bg-white rounded-lg shadow-md p-6 my-4">
          {/* Header Section */}
          <h2 className="text-2xl font-semibold text-center mb-4">
            Purchase Order
          </h2>

        <div className="flex justify-between mb-4"> {/* Move PO details to right */}
            <div className="mx-6">
                    <img src="/logo.png" alt="Company Logo" className="h-20 w-auto" />
            </div>
            <div className="text-right">
                <p>PO No: {purchaseOrder.po_number}</p>
                <p>Invoice No: {purchaseOrder.invoice}</p>
                <p>Date: {formatDate(purchaseOrder.datetime_created)}</p>
            </div>
        </div>

          <div className="mb-4"> {/* Left-aligned customer info */}
            <p>Customer ID: {purchaseOrder.customerID}</p>
            <p>Customer: {purchaseOrder.customerName}</p>
            <p>Tax Payer ID: {purchaseOrder.tax_payer_id}</p>
          </div>

          {/* Item Table Section */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-yellow-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ITEM
                </th>
                <th className="px-6 py-3 bg-yellow-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRICE/LITER
                </th>
                <th className="px-6 py-3 bg-yellow-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Q'TY (LITER)
                </th>
                <th className="px-6 py-3 bg-yellow-100 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  {purchaseOrder.gastype}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {purchaseOrder.PperLitre.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {purchaseOrder.volumn.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {purchaseOrder.totolprice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default PurchaseOrderDetailsPage;
