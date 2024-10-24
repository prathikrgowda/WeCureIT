import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatCard from './StatCard';
import DoctorsList from './DoctorList';
import FacilitiesList from './FacilityList';
import '../styles/tailwind.css';

function Dashboard() {
  const stats = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/645ebcc21dee42475ab18acf5406c5a943ffd9135e81088dfbc355e4a9fe9a87?placeholderIfAbsent=true&apiKey=8f0d2cc9bf764b679624a1d309a49f82", count: 15, label: "Doctors" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bed9b7541659c2d430a307f8e5f21a44d44d0dc1d9446ba2a7cbd611df96bde3?placeholderIfAbsent=true&apiKey=8f0d2cc9bf764b679624a1d309a49f82", count: 139, label: "Appointments" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd4001b3ce059345da6e2573f27283b4252a81f91fb09ee7d168ab983a1c21a2?placeholderIfAbsent=true&apiKey=8f0d2cc9bf764b679624a1d309a49f82", count: 124, label: "Patients" }
  ];

  // State to keep track of screen width
  const [isBelow1390, setIsBelow1390] = useState(false);

  // Check the screen width on initial render and when resized
  useEffect(() => {
    const handleResize = () => {
      setIsBelow1390(window.innerWidth <= 1390);
    };

    // Set the initial state
    handleResize();

    // Attach the event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Sidebar className="w-[389px]" /> {/* Ensure the sidebar keeps its width */}
        <section className="flex flex-col items-start mt-0 w-full max-w-[1380px] ml-5">
          {/* Add padding at the top of the stat card section */}
          <div className="flex flex-wrap gap-3 pt-5 mt-0">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Conditionally render the layout based on screen width */}
          <div className={`flex gap-5 w-full mt-5 ${isBelow1390 ? 'flex-col' : ''}`}>
            <DoctorsList />
            <FacilitiesList />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
