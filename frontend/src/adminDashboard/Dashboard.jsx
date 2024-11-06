import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatCard from './StatCard';
import DoctorsList from './DoctorList';
import FacilitiesList from './FacilityList';
import axios from 'axios';
import '../styles/tailwind.css';

function Dashboard() {
  // Initialize counts, fetching doctor count only
  const [doctorCount, setDoctorCount] = useState(0); // Will update from API
  const [appointmentCount] = useState(0); // Fixed to 0 for now
  const [patientCount] = useState(0); // Fixed to 0 for now
  const [error, setError] = useState(false);

  const stats = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/645ebcc21dee42475ab18acf5406c5a943ffd9135e81088dfbc355e4a9fe9a87?placeholderIfAbsent=true&apiKey=8f0d2cc9bf764b679624a1d309a49f82",
      count: doctorCount,
      label: "Doctors"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bed9b7541659c2d430a307f8e5f21a44d44d0dc1d9446ba2a7cbd611df96bde3?placeholderIfAbsent=true&apiKey=8f0d2cc9bf764b679624a1d309a49f82",
      count: appointmentCount,
      label: "Appointments"
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd4001b3ce059345da6e2573f27283b4252a81f91fb09ee7d168ab983a1c21a2?placeholderIfAbsent=true&apiKey=8f0d2cc9bf764b679624a1d309a49f82",
      count: patientCount,
      label: "Patients"
    }
  ];

  const [isBelow1390, setIsBelow1390] = useState(false);

  // Fetch doctor count from backend
  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const doctorRes = await axios.get('http://localhost:4000/api/doctors/count');
        setDoctorCount(doctorRes.data.count);
      } catch (error) {
        console.error("Error fetching doctor count:", error);
        setError(true);
      }
    };

    fetchDoctorCount();

    // Check screen width on initial render and when resized
    const handleResize = () => {
      setIsBelow1390(window.innerWidth <= 1390);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">
        <Sidebar className="w-[389px]" />
        <section className="flex flex-col items-start mt-0 w-full max-w-[1380px] ml-5">
          <div className="flex flex-wrap gap-3 pt-5 mt-0">
            {error ? (
              <p className="text-red-500">Error loading stats</p>
            ) : (
              stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))
            )}
          </div>

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
