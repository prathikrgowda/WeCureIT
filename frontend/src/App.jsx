import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './adminDashboard/Dashboard'; // Assuming Dashboard.js is the main dashboard component
import ManageDoctors from './doctorsAdminMode/ManageDoctors'; // The page for managing doctors
//import Sidebar from './components/Sidebar'; // Assuming Sidebar is imported here for layout purposes
import ManageFacilities from './facilitiesAdminMode/ManageFacilities';
import AdminLogin from './AdminLogin';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <div className="flex">
        <main className="flex-1 p-1">
        <Routes>
            {/* Public Route */}
            <Route path="/login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-doctors"
              element={
                <ProtectedRoute>
                  <ManageDoctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-facilities"
              element={
                <ProtectedRoute>
                  <ManageFacilities />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
