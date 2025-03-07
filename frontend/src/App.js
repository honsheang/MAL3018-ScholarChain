import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from "./components/HomePage/HomePage";
import Register from './components/Register/SignUp';
import Pending from './components/Pending/Pending';
import UniDashboard from './components/Dashboard/University/DashboardUniversity';
import EmpDashboard from './components/Dashboard/Employer/DashboardEmployer';
import StuDashboard from './components/Dashboard/Student/DashboardStudent';
import FakeInstitutionLogin from './components/Login/FakeLogin/FakeInstitutionLogin';


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/uniDashboard" element={<UniDashboard />} />
              <Route path="/empDashboard" element={<EmpDashboard />} />
              <Route path="/stuDashboard" element={<StuDashboard />} />
              <Route path="/fakeInstitutionLlogin" element={<FakeInstitutionLogin />} />

              <Route path="/pending" element={<Pending />} />
          </Routes>
      </Router>

  );
}

export default App;
