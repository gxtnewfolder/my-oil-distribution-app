// app/financial-reports/purchase-order/[invoice]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { PurchaseOrder } from "@/types/financial";
import Link from "next/link";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const InvoiceDetailsPage: React.FC = () => {
  const { invoice } = useParams<{ invoice: string }>(); // Get invoice from URL
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/invoice/${invoice}`);
        if (!response.ok) {
          throw new Error("Invoice not found.");
        }
        const data = await response.json();
        setPurchaseOrder(data);
      } catch (error) {
        console.error("Error fetching invoice details:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data immediately when the component mounts
  }, [invoice]); // Re-fetch data if invoice changes

  const calculateVat = (totalPrice: number): number => {
    const vatRate = 0.07; // 7% VAT
    return totalPrice * vatRate;
  };

  const calculateGrandTotal = (totalPrice: number, vat: number): number => {
    return totalPrice + vat;
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/financial-reports/sale-invoice"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>

      {isLoading ? (
        <p>Loading invoice details...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : purchaseOrder ? (
        <div className="bg-white rounded-lg shadow-md p-6 my-4">
          {/* Header Section */}
          <h2 className="text-2xl font-semibold text-center mb-4">Invoice</h2>

          <div className="flex justify-between mb-4">
            {" "}
            {/* Move Invoice details to right */}
            <div>
              <p>{purchaseOrder.company}</p>
              <p>
                555 Vibhavadi Rangsit Road, Chatuchak Bangkok 10900 Thailand
              </p>
            </div>
            <div className="text-right">
              <p>Invoice No: {purchaseOrder.invoice}</p>
              <p>PO No: {purchaseOrder.po_number}</p>
              <p>Date: {formatDate(purchaseOrder.datetime_created)}</p>
            </div>
          </div>

          <div className="mb-4">
            {" "}
            {/* Left-aligned customer info */}
            <p>Customer ID: {purchaseOrder.customerID}</p>
            <p>Customer: {purchaseOrder.customerName}</p>
            <p>Tax Payer ID: {purchaseOrder.tax_payer_id}</p>
          </div>

          {/* Item Table Section */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-yellow-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
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
                  {purchaseOrder.datetime_created.split(" ")[0]}
                </td>
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
          {/* VAT and Grand Total */}
          <div className="flex justify-end mt-4">
            <table className="w-1/3 text-right">
              <tbody>
                <tr>
                  <td className="pb-2">Vat 7% (inclusive)</td>
                  <td className="pb-2">
                    {calculateVat(purchaseOrder.totolprice).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Grand Total</td>
                  <td className="font-semibold">
                    {calculateGrandTotal(
                      purchaseOrder.totolprice,
                      calculateVat(purchaseOrder.totolprice)
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InvoiceDetailsPage;
