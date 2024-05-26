// src/app/sale-office/page.tsx
"use client";

import Link from "next/link";
import { Card } from "@app/components/common/Card"; // Assuming you have a Card component

const SaleOfficePage: React.FC = () => {
  const cards = [
    {
      title: "Truck Verification",
      icon: "🚚",
      text: "Click to Verify Truck Information",
      path: "/sale-office/truck-verification",
    },
    {
      title: "Purchase Order",
      icon: "📝",
      text: "Click to Manage Purchase Orders",
      path: "/sale-office/purchase-order",
    },
    {
      title: "Invoice",
      icon: "🧾",
      text: "Click to Manage Invoices",
      path: "/sale-office/sale-invoice",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">INC372 - Sale Office</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link href={card.path} key={card.title} className="no-underline">
            <Card title={card.title} icon={card.icon} text={card.text} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SaleOfficePage;
