import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './adminDashboard/Dashboard'; // Assuming Dashboard.js is the main dashboard component
import ManageDoctors from './doctorsAdminMode/ManageDoctors'; // The page for managing doctors
import Sidebar from './components/Sidebar'; // Assuming Sidebar is imported here for layout purposes
import ManageFacilities from './facilitiesAdminMode/ManageFacilities';
import AdminLogin from './AdminLogin';

function App() {
  return (
    <Router>
      <div className="flex">
        <main className="flex-1 p-1">
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/manage-doctors" element={<ManageDoctors />} />
            <Route path="/manage-facilities" element={<ManageFacilities />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
