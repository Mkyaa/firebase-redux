import React from 'react';

//pages
import SignUp from './pages/auth/SignUp';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard';

//react router dom
import {Routes, Route} from 'react-router-dom';

//react hot toast
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className="w-full">
      <Toaster />

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

    </div>
  );
}

export default App;
