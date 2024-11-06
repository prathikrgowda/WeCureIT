import React, { useState } from 'react';

function DoctorCard({ doctor, onEdit, onRemove }) {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleRemoveClick = () => setIsRemoveModalOpen(true);
  const handleCloseRemoveModal = () => setIsRemoveModalOpen(false);

  const handleConfirmRemove = () => {
    onRemove(doctor._id);
    handleCloseRemoveModal();
  };

  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <h3 className="text-lg font-medium">{doctor.name}</h3>
      <p className="text-gray-500">{doctor.specialty.join(', ')}</p>
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="px-4 py-1 bg-red-500 hover:bg-red-800 text-white rounded-full"
          onClick={handleRemoveClick}
        >
          Remove
        </button>
        <button
          className="px-4 py-1 bg-gray-300 hover:bg-gray-500 text-gray-800 rounded-full"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>

      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="text-lg mb-4">
              Are you sure you want to remove <strong>{doctor.name}</strong>?
            </p>
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

export default DoctorCard;
