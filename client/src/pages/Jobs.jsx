import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeJobs from '../components/HomeJobs';
import Login from '../components/auth-Jobs/Login';
import Signup from '../components/auth-Jobs/Signup';

const Jobs = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeJobs />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default Jobs;
