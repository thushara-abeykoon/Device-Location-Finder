import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllLocations from './components/AllLocations';
import Header from './components/Header';
import LocationCard from './components/LocationCard';
import LocationViewer from './components/LocationViewer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<AllLocations />} />
        <Route path='/location/:locationName' element={<LocationViewer />} />
      </Routes>
    </div>
  );
}

export default App;
