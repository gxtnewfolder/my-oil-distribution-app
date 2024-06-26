// src/app/dashboard/page.tsx
"use client"

import { useState } from "react";

const Dashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState("financial");

  const handleDashboardChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDashboard(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">INC372 - Dashboard</h1>

      <select
        value={dashboard}
        onChange={handleDashboardChange}
        className="border rounded-md p-2 mr-2"
      >
        <option value="financial">Financial Dashboard</option>
        <option value="performance">Performance Dashboard</option>
      </select>

      {dashboard === "financial" ? (
        <iframe
          title="Financial Dashboard"
          className="w-full h-[75vh] mt-8 border-4 border-gray-400 rounded-lg overflow-hidden"
          src="https://app.powerbi.com/view?r=eyJrIjoiYzQxMzU5YmYtNTNlZi00YWE4LThmNGEtNWM5YTIwYTliNGUyIiwidCI6IjZmNDQzMmRjLTIwZDItNDQxZC1iMWRiLWFjMzM4MGJhNjMzZCIsImMiOjEwfQ%3D%3D"
          frameBorder="0"
          allowFullScreen
        />
      ) : (
        <iframe
          title="Performance Dashboard"
          className="w-full h-[75vh] mt-8 border-4 border-gray-400 rounded-lg overflow-hidden"
          src="https://app.powerbi.com/view?r=eyJrIjoiMWYwZWVkOWQtNGQ0ZC00MDYwLTg0NjctMWVhZTczMjViNDI2IiwidCI6IjZmNDQzMmRjLTIwZDItNDQxZC1iMWRiLWFjMzM4MGJhNjMzZCIsImMiOjEwfQ%3D%3D"
          frameBorder="0"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default Dashboard;
