// app/financial-reports/page.tsx
'use client'

import Link from 'next/link';
import { Card } from '@app/components/common/Card'; // Assuming you have a Card component

const FinancePage: React.FC = () => {
  const cards = [
    { title: 'General Journal', icon: '📄', text: 'Click to View at Each Day', path: '/financial-reports/general-journal' },
    { title: 'General Ledger', icon: '📒', text: 'Click to View at Each Account', path: '/financial-reports/general-ledger' },
    { title: 'Monthly Income Statement', icon: '📈', text: 'Click to View at Each Month', path: '/financial-reports/monthly-income-statement' },
    { title: 'Inventory Stock Card', icon: '📦', text: 'Click to View at Each Month', path: '/financial-reports/inventory-stock-card' },
    { title: 'Purchase Order', icon: '📝', text: 'Click to View More', path: '/financial-reports/purchase-order' },
    { title: 'Invoice', icon: '🧾', text: 'Click to View More', path: '/financial-reports/sale-invoice' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">INC372 - Financial Report</h1>
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

export default FinancePage;
