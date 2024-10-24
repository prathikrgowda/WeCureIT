import React, { useState, useEffect } from 'react';

function AddDoctorForm({ doctor, onSave, onCancel, isEditMode = false }) {
  const [doctorName, setDoctorName] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [isDiscardModalOpen, setIsDiscardModalOpen] = useState(false);
  const [errors, setErrors] = useState({}); // State to track form errors

  const specialtiesOptions = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
    "Cardiologist",
  ];

  useEffect(() => {
    if (doctor) {
      setDoctorName(doctor.name);
      setSelectedSpecialties(doctor.specialty || []);  // Load specializations
      setEmail(doctor.email || "");
      setDegree(doctor.degree || "");
      setPassword(""); // Reset password for security reasons
      setExperience(doctor.experience || "");
    } else {
      // Reset form if there's no doctor (for adding a new one)
      setDoctorName("");
      setSelectedSpecialties([]);
      setEmail("");
      setDegree("");
      setPassword("");
      setExperience("");
    }
  }, [doctor]);

  const handleSpecialtyChange = (event) => {
    const selectedValue = event.target.value;
    if (!selectedSpecialties.includes(selectedValue)) {
      const updatedSpecialties = [...selectedSpecialties, selectedValue];
      setSelectedSpecialties(updatedSpecialties);
    }
    event.target.value = ""; // Reset the dropdown after selecting
  };

  const removeSpecialty = (specialty) => {
    const updatedSpecialties = selectedSpecialties.filter((item) => item !== specialty);
    setSelectedSpecialties(updatedSpecialties);
  };

  const handleSave = () => {
    // Validate the form before saving
    const validationErrors = {};
    
    if (!doctorName) validationErrors.doctorName = "Doctor's name is required";
    if (selectedSpecialties.length === 0) validationErrors.specialties = "At least one specialty is required";
    if (!email) validationErrors.email = "Email is required";
    if (!degree) validationErrors.degree = "Degree is required";
    if (!password && !isEditMode) validationErrors.password = "Password is required"; // Password validation only in Add mode
    if (!experience) validationErrors.experience = "Experience is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set errors if any validation fails
      return; // Prevent save action if validation fails
    }

    // If no validation errors, proceed to save
    const doctorData = {
      name: doctorName,
      specialty: selectedSpecialties,
      email,
      degree,
      password: isEditMode && !password ? undefined : password, // If it's edit mode and password is empty, don't update password
      experience,
    };
    onSave(doctorData); // Trigger the save action
  };

  const handleDiscardChanges = () => {
    setIsDiscardModalOpen(true); // Open discard confirmation modal
  };

  const handleCloseDiscardModal = () => {
    setIsDiscardModalOpen(false); // Close discard modal
  };

  const handleConfirmDiscard = () => {
    handleCloseDiscardModal();  // Close the discard modal

    if (onCancel) {
      onCancel();  // If onCancel is provided, call it to close the main modal as well
    }
  };

  return (
    <>
      <section className="flex flex-col bg-white border rounded-lg p-8 w-full">
        {/* Doctor form */}
        <form className="grid grid-cols-1 gap-4 mb-6">  {/* Changed to single column layout */}
          
          {/* Doctor's Name - Full Width */}
          <div>
            <label className="block mb-2">Doctor's Name</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-md ${errors.doctorName ? 'border-red-500' : ''}`}
              placeholder="Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            {errors.doctorName && <p className="text-red-500 text-sm mt-1">{errors.doctorName}</p>}
          </div>

          {/* Specialties - Full Width */}
          <div>
            <label className="block mb-2">Specialties</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedSpecialties.map((specialty, index) => (
                <div
                  key={index}
                  className="flex items-center bg-indigo-100 text-indigo-700 p-2 rounded-full"
                >
                  <span>{specialty}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => removeSpecialty(specialty)}
                  >
                    &#x2715;
                  </button>
                </div>
              ))}
            </div>
            <select
              value=""
              onChange={handleSpecialtyChange}
              className={`w-full p-2 border rounded-md text-gray-400 ${errors.specialties ? 'border-red-500' : ''}`}
            >
              <option value="" disabled>Select Specialization</option>
              {specialtiesOptions.map((specialty, index) => (
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
            {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
          </div>

          {/* Email */}
          <div className="grid grid-cols-2 gap-4">  {/* Back to 2-column layout for the remaining fields */}
            <div>
              <label className="block mb-2">Doctor's Email</label>
              <input
                type="email"
                className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Degree */}
            <div>
              <label className="block mb-2">Degree</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${errors.degree ? 'border-red-500' : ''}`}
                placeholder="Degree"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
              {errors.degree && <p className="text-red-500 text-sm mt-1">{errors.degree}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2">{doctor ? 'Change Password' : 'Set Password'}</label>
              <input
                type="password"
                className={`w-full p-2 border rounded-md ${!doctor && errors.password ? 'border-red-500' : ''}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!doctor && errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block mb-2">Experience</label>
              <input
                type="text"
                className={`w-full p-2 border rounded-md ${errors.experience ? 'border-red-500' : ''}`}
                placeholder="Experience (e.g., 5 years)"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>
          </div>
        </form>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
            onClick={handleSave}
          >
            {doctor ? 'Save Changes' : 'Add Doctor'}
          </button>
          {/* Discard Changes Button */}
          {doctor && (
            <button
              type="button"
              className="px-4 py-2 bg-red-500 hover:bg-red-800 text-white rounded-full"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </button>
          )}
        </div>
      </section>

      {/* Discard Confirmation Modal */}
      {isDiscardModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p className="mb-4">Are you sure you want to discard the unsaved changes?</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full"
                onClick={handleCloseDiscardModal}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                onClick={handleConfirmDiscard}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddDoctorForm;
