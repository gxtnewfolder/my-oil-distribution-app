"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PurchaseOrder } from "@/types/financial"; // Define your SaleInvoice type

function SaleInvoicePage() {
  const router = useRouter();
  const [saleInvoices, setSaleInvoices] = useState<PurchaseOrder[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<PurchaseOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/invoice"); // Fetch data from API
        const data = await response.json();
        setSaleInvoices(data);
        setFilteredInvoices(data);
      } catch (error) {
        console.error("Error fetching sale invoices:", error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = saleInvoices.filter((invoice) =>
      invoice.invoice.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInvoices(filtered);
  }, [searchQuery, saleInvoices]);

  const handleViewDetails = (invoice: string) => {
    router.push(`/financial-reports/sale-invoice/${invoice}`);
  };

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/financial-reports"
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Back
      </Link>
      <h2 className="text-2xl font-semibold mb-4 my-4">Invoice</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Invoice"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 w-full"
        />
      </div>

      {/* Invoice Table */}
      {isLoading ? (
        <p>Loading invoice...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : filteredInvoices.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((po) => (
              <tr
                key={po.id}
                onClick={() => handleViewDetails(po.invoice)} // Navigate on row click
                className="cursor-pointer hover:bg-gray-100" // Visual feedback
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {po.datetime_created.split(".")[0]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{po.invoice}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {po.company}
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

export default SaleInvoicePage;

