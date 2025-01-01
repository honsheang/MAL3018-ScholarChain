import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import HomePage from "./components/HomePage/HomePage";
import Register from './components/Register/SignUp';
import Pending from './components/Pending/Pending';
import UniDashboard from './components/Dashboard/University/DashboardUniversity';
import UniAddSemester from './components/Dashboard/University/AddSemester';
import UniAddBadge from './components/Dashboard/University/AddBadges';
import UniReceipt from './components/Dashboard/University/Receipt';
import UniPortalPopUp from './components/Dashboard/University/PortalPopup';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/uniDashboard" element={<UniDashboard />} />
              <Route path="/uniSem" element={<UniAddSemester />} />
              <Route path="/uniBadge" element={<UniAddBadge />} />
              <Route path="/uniReceipt" element={<UniReceipt />} />
              <Route path="/uniPopUp" element={<UniPortalPopUp />} />
              <Route path="/pending" element={<Pending />} />
          </Routes>
      </Router>

  );
}

export default App;
