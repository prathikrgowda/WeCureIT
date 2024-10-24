import React from 'react';

function FacilitiesList() {
  // Each facility has a name only
  const facilities = [
    { name: "Facility 1" },
    { name: "Facility 2" },
    { name: "Facility 3" },
    { name: "Facility 4" },
    { name: "Facility 5" }
  ];

  return (
    <section className="flex flex-col mt-0 bg-white border rounded-lg p-4 w-[500px]">
      <h3 className="sr-only">Facilities List</h3>
      
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">Facilities List</h3>
      </div>

      {/* Facilities list */}
      <ul className="flex flex-col w-full border-t">
        {facilities.map((facility, index) => (
          <li key={index} className="flex items-center py-3 w-full border-b">
            <div className="text-gray-700">{facility.name}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FacilitiesList;
