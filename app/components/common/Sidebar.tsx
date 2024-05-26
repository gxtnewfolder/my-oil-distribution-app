// src/components/common/Sidebar.tsx
"use client"

import Link from 'next/link';

const Sidebar: React.FC = () => {
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Finance', path: '/financial-reports' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Sale Office', path: '/sale-office' },
  ];

  return (
    <aside className="bg-gray-800 text-white h-screen p-8 fixed"> 
      <h2 className="text-2xl font-semibold mb-4">Menu</h2>
      <ul>
        {menuItems.map(item => (
          <li key={item.name} className="mb-2">
            <Link
              href={item.path}
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
