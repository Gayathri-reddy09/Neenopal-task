import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserListPage from './UserListPage';
import UserDetails from './UserDetails';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/user/:username" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
