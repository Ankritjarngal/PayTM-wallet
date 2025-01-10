import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from '../pages/Signup';
import { Signin } from '../pages/Signin';
import { Dashboard } from '../pages/Dashboard';
import { Send } from '../pages/Send';
import { Update } from '../pages/Update';
import { jwtDecode } from "jwt-decode";

function App() {
  function isValid() {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) { // Check expiration
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={isValid() ? <Dashboard /> : <Signup />} />
          <Route path="/send" element={<Send />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
