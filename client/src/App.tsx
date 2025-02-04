//Bringing in the required import from 'react-router-dom'
//import { useState } from 'react'
//import { Outlet } from 'react-router-dom'
import './App.css'
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  // The Outlet component will conditionally swap between the different pages according to the URL
  return (
    <>
      <Navbar />
      <main className="mx-3">
        <Outlet />
      </main>
    </>
  );
}

export default App;