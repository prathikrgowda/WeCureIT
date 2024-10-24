import React, { useState } from 'react';
import DoctorCard from './DoctorCard';
import AddDoctorForm from './AddDoctorForm';
import Modal from '../components/Modal'; // Assuming you have a Modal component

function DoctorGrid() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample doctors data with updated structure to support multiple specialties
  const doctors = [
    {
      name: 'Dr. Richard James',
      specialty: ['General Physician', 'Cardiologist','Dermatologist'],  // Multiple specialties
      email: 'richard@example.com',
      degree: 'MD',
      experience: '10 years',
    },
    {
      name: 'Dr. Emily Larson',
      specialty: ['Gynecologist'],  // Single specialty
      email: 'emily.larson@hospital.com',
      degree: 'MD',
      experience: '8 years',
    },
    {
      name: 'Dr. Sarah Patel',
      specialty: ['Dermatologist'],
      email: 'sarah.patel@hospital.com',
      degree: 'MD, Dermatology',
      experience: '5 years',
    },
    {
      name: 'Dr. Christopher Lee',
      specialty: ['Pediatrician'],
      email: 'christopher.lee@hospital.com',
      degree: 'MBBS, Pediatrics',
      experience: '12 years',
    },
    {
      name: 'Dr. Jennifer Garcia',
      specialty: ['Neurologist'],
      email: 'jennifer.garcia@hospital.com',
      degree: 'MD, Neurology',
      experience: '6 years',
    },
    {
      name: 'Dr. Andrew Williams',
      specialty: ['Gastroenterologist'],
      email: 'andrew.williams@hospital.com',
      degree: 'MD, Gastroenterology',
      experience: '7 years',
    },
    {
      name: 'Dr. Jeffrey King',
      specialty: ['Pediatrician'],
      email: 'jeffrey.king@hospital.com',
      degree: 'MBBS, Pediatrics',
      experience: '9 years',
    },
    {
      name: 'Dr. Zoe Kelly',
      specialty: ['Neurologist', 'Psychiatrist'],  // Multiple specialties
      email: 'zoe.kelly@hospital.com',
      degree: 'MD, Neurology',
      experience: '11 years',
    },
    {
      name: 'Dr. Patrick Harris',
      specialty: ['Gastroenterologist'],
      email: 'patrick.harris@hospital.com',
      degree: 'MD, Gastroenterology',
      experience: '4 years',
    },
    {
      name: 'Dr. Chloe Evans',
      specialty: ['General Physician', 'Dermatologist'],  // Multiple specialties
      email: 'chloe.evans@hospital.com',
      degree: 'MBBS',
      experience: '6 years',
    },
    {
      name: 'Dr. Ryan Martinez',
      specialty: ['Gynecologist'],
      email: 'ryan.martinez@hospital.com',
      degree: 'MD, Gynecology',
      experience: '8 years',
    },
    {
      name: 'Dr. Amelia Hill',
      specialty: ['Dermatologist'],
      email: 'amelia.hill@hospital.com',
      degree: 'MD, Dermatology',
      experience: '5 years',
    },
  ];

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleSaveDoctor = (updatedDoctor) => {
    console.log('Updated doctor:', updatedDoctor);
    // Update the doctor in your list here (in a real app, you would update the state)
    setIsModalOpen(false);
  };

  return (
    <section className="mt-8">
      <h3 className="text-xl font-medium mb-6">All Doctors</h3>
      <div className="grid grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <DoctorCard
            key={index}
            name={doctor.name}
            specialty={doctor.specialty.join(', ')}  // Display specialties as a comma-separated string
            email={doctor.email}
            degree={doctor.degree}
            experience={doctor.experience}
            onEdit={() => handleEdit(doctor)} // Pass the doctor details to the edit function
          />
        ))}
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <AddDoctorForm doctor={selectedDoctor} onSave={handleSaveDoctor} />
        </Modal>
      )}
    </section>
  );
}

export default DoctorGrid;
