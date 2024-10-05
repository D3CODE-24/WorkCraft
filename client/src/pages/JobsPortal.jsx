import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeJobs from '../components/HomeJobs';
import Login from '../components/auth-Jobs/Login';
import Signup from '../components/auth-Jobs/Signup';
import Jobs from '../components/Jobs';
import Browse from '@/components/Browse';
import Profile from '@/components/Profile';
import JobDescription from '../components/JobDescription'
import Companies from '../components/admin/Companies'
import CompanyCreate from '@/components/admin/CompaniesCreate';
import CompanySetup from '../components/admin/CompanySetup'
import AdminJobs from "../components/admin/AdminJobs";
import PostJob from '@/components/admin/PostJob';
import Applicants from '@/components/admin/Applicants';
import ProtectedRoute from '../components/admin/ProtectedRoute'

const JobsPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeJobs />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="new-jobs" element={<Jobs/>} />
      <Route path="description/:id" element={<JobDescription/>}/>
      <Route path="/browse" element={<Browse/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/admin/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
      <Route path="/admin/companies/create" element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>}/>
      <Route path="/admin/companies/:id" element={<ProtectedRoute><CompanySetup/></ProtectedRoute>}/>
      <Route path="/admin/new-jobs" element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
      <Route path="/admin/new-jobs/create" element={<ProtectedRoute><PostJob/></ProtectedRoute>}/>
      <Route path="/admin/new-jobs/:id/applicants" element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>
    </Routes>
  );
};

export default JobsPortal;
