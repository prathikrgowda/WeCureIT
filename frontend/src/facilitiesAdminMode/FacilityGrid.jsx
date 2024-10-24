import React, { useState } from 'react';
import AddFacilityForm from './AddFacilityForm';
import Modal from '../components/Modal';

const facilities = [
    {
      id: 1,
      name: "Downtown Health Clinic",
      rooms: [
        { id: 1, specializations: ["General Physician", "Cardiologist"] },
        { id: 2, specializations: ["Pediatrician", "Dermatologist"] },
      ]
    },
    {
      id: 2,
      name: "Northside Wellness Center",
      rooms: [
        { id: 1, specializations: ["Cardiologist"] },
        { id: 2, specializations: ["Dermatologist", "Gynecologist"] },
      ]
    },
    {
      id: 3,
      name: "West End Pediatrics",
      rooms: [
        { id: 1, specializations: ["Pediatrician"] },
      ]
    },
    {
      id: 4,
      name: "Eastside Medical Complex",
      rooms: [
        { id: 1, specializations: ["Orthopedic Surgeon"] },
        { id: 2, specializations: ["Neurologist"] },
        { id: 3, specializations: ["General Physician"] },
      ]
    },
    {
      id: 5,
      name: "Central City Hospital",
      rooms: [
        { id: 1, specializations: ["Surgeon", "Anesthesiologist"] },
        { id: 2, specializations: ["Cardiologist", "Pulmonologist"] },
      ]
    },
    {
      id: 6,
      name: "Green Valley Clinic",
      rooms: [
        { id: 1, specializations: ["Dentist"] },
        { id: 2, specializations: ["Dermatologist"] },
      ]
    }
  ];

function FacilityGrid() {
  const [selectedFacility, setSelectedFacility] = useState(null); // Store the selected facility data
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal open/close state
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false); // Control the remove confirmation modal
  const [facilityToRemove, setFacilityToRemove] = useState(null); // Store facility to remove

  const handleEdit = (facility) => {
    setSelectedFacility(facility); // Set the selected facility for editing
    setIsModalOpen(true); // Open the modal for editing
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal for editing
    setSelectedFacility(null); // Clear selected facility
  };

  // Handle remove facility button click
  const handleRemoveClick = (facility) => {
    setFacilityToRemove(facility); // Set the facility to remove
    setIsRemoveModalOpen(true); // Open the confirmation modal
  };

  // Confirm removal of the facility
  const handleConfirmRemove = () => {
    console.log(`Removing facility: ${facilityToRemove.name}`);
    // Add logic to actually remove the facility if needed...
    setIsRemoveModalOpen(false); // Close the confirmation modal
    setFacilityToRemove(null); // Clear the facility to remove
  };

  // Close the remove confirmation modal
  const handleCloseRemoveModal = () => {
    setIsRemoveModalOpen(false); // Close the confirmation modal
    setFacilityToRemove(null); // Clear the facility to remove
  };

  return (
    <div className="flex">
      <div className="mt-8 bg-white p-6 shadow rounded-lg w-full max-w-[800px]">
        <h3 className="text-lg font-medium text-gray-900 mb-4">All Facilities</h3>
        <ul className="divide-y divide-gray-200">
          {facilities.map((facility) => (
            <li key={facility.id} className="flex justify-between items-center py-3">
              <span className="text-sm font-medium text-gray-900">{facility.name}</span>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
                  onClick={() => handleEdit(facility)}  // Open modal with facility data
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => handleRemoveClick(facility)}  // Open confirmation modal with facility data
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for editing the facility */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddFacilityForm facility={selectedFacility} /> {/* Pass the selected facility to pre-fill the form */}
      </Modal>

      {/* Modal for confirming facility removal */}
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg mb-4">Are you sure you want to remove <strong>{facilityToRemove?.name}</strong>?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full"
                onClick={handleCloseRemoveModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                onClick={handleConfirmRemove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityGrid;
