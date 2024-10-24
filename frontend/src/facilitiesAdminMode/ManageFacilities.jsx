import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import AddFacilityForm from './AddFacilityForm';
import FacilityGrid from './FacilityGrid';
import Modal from '../components/Modal'; // Import the Modal component

function ManageFacilities() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  // Function to open the modal and pass selected facility data
  const handleEditFacility = (facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFacility(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 px-8 py-4 w-full">
          {/* Form and Facilities Grid */}
          <div className="flex flex-col gap-6">
            <AddFacilityForm onCancel={handleCloseModal} />  {/* Pass onCancel */}
            <FacilityGrid onEdit={handleEditFacility} /> {/* Pass the handleEditFacility function */}
          </div>
        </main>
      </div>

      {/* Modal to show the AddFacilityForm with pre-filled data */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <AddFacilityForm facility={selectedFacility} onCancel={handleCloseModal} /> {/* Pass the facility data and onCancel */}
      </Modal>
    </div>
  );
}

export default ManageFacilities;
