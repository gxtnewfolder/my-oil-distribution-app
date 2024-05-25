// src/components/common/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  icon: string;
  text: string;
}

export const Card: React.FC<CardProps> = ({ title, icon, text }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-4xl mb-2">{icon}</div>
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-gray-600">{text}</p>
  </div>
);
