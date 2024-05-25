// app/page.tsx 
"use client" // for next.js 13 and above to use client component

import Image from 'next/image'; // Use Next.js's Image component for optimized images
import Link from 'next/link';

const HomePage: React.FC = () => {
  const handleClick = () => {
    // Add logic for navigating to the inventory details page
  };

  return (
    <div className="container mx-auto p-4">
      <Image 
        src="/logo.png" // Assuming your logo is in the public directory
        alt="Logo" 
        width={80} // Adjust width as needed
        height={80} // Adjust height as needed
        className="mx-auto my-4"
      />
      <h1 className="text-3xl font-bold mb-6 text-center">
        Welcome to TATA Oil Distribution Centre
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Widget 1: Real-Time Inventory Overview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Real-Time Inventory Overview
          </h2>
          <p>
            Total Fuel Stored: **1,250,000** Liters <br />
            Available Capacity: **750,000** Liters <br />
          </p>
          <button 
            onClick={handleClick} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            View Inventory Details
          </button>
        </div>

        {/* Widget 2: Delivery Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Delivery Status</h2>
            <p>
              Scheduled Deliveries Today: **15** <br />
              Completed Deliveries Today: **8** <br />
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Track Deliveries
            </button>
          </div>
      </div>

      {/* Introductory Content */}
      <div className="prose">
          {" "}
          {/* Use Tailwind's prose class for nice formatting */}
          <p>
            TATA co. is a leading oil distribution center providing
            reliable and efficient fuel delivery services to our valued
            customers. With state-of-the-art facilities and a dedicated team, we
            ensure the timely and secure distribution of petroleum products
            across the region.
          </p>
          <p>
            Our commitment to quality, safety, and customer satisfaction sets us
            apart. We offer a wide range of fuels, including gasoline, diesel,
            and aviation fuel, catering to diverse industries and needs.
          </p>
          <p>
            To learn more about our services, explore our financial reports, or
            contact us for inquiries, please use the navigation menu on the
            left.
          </p>
        </div>

      {/* Call to Action (Optional) */}
      <div className="mt-8 text-center">
        <Link 
          href="/contact" // Use Next.js's Link component for routing
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
