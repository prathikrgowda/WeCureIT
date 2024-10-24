import React from 'react';

function DoctorsList() {
  // Doctors array with name only
  const doctors = [
    { name: "Dr. Christopher Lee" },
    { name: "Dr. Patrick" },
    { name: "Dr. Christopher Davis" },
    { name: "Dr. Richard James" },
    { name: "Dr. Ben Harvey" }
  ];

  return (
    <section className="flex flex-col mt-0 bg-white border rounded-lg p-4 w-[500px]">
      <h3 className="sr-only">Doctors List</h3>    
      
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Doctors List</h3>
      </div>
      
      {/* Doctors list */}
      <ul className="flex flex-col w-full border-t">
        {doctors.map((doctor, index) => (
          <li key={index} className="flex items-center py-3 w-full border-b">
            <div className="text-gray-700">{doctor.name}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DoctorsList;
