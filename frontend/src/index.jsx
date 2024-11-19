import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import App from './App';

const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create a root using createRoot

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);