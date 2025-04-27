import React from 'react';
import { PetTrackProvider } from './context/PetTrackContext';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <PetTrackProvider>
      <Dashboard />
    </PetTrackProvider>
  );
}

export default App;