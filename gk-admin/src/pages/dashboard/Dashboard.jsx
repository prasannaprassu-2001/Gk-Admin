// import React from "react";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logout } from "../../redux/authentication";
// // Pages
// import RoleManagement from "../role-management/RoleManagement";
// import OrganizationManagement from "../organization/OrganizationManagement";

// import "./dashboard.css"; // import the CSS

// const Dashboard = () => {
//     const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("access");

//   // 🔒 protect route
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
// const handleLogout = () => {
//   if (window.confirm("Are you sure you want to logout?")) {
//     dispatch(logout());
//     navigate("/login", { replace: true });
//   }
// };
//   return (
//     <div className="dashboard-layout">
//       <Sidebar onLogout={handleLogout} />
//       <div className="main-content">
//         <Navbar/>
//         <div className="content">
//           <Routes>
//             <Route path="roles" element={<RoleManagement />} />
//             <Route path="organization/*" element={<OrganizationManagement />} />
//             <Route path="" element={<Navigate to="roles" replace />} />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authentication";

import RoleManagement from "../role-management/RoleManagement";
import OrganizationManagement from "../organization/OrganizationManagement";

import "./dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const token = localStorage.getItem("access");

  if (!token) return <Navigate to="/login" replace />;

  const handleLogout = () => {
    if (window.confirm("Logout?")) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar
        onLogout={handleLogout}
        sidebarOpen={sidebarOpen}
      />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-content">

        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="content">
          <Routes>
            <Route path="roles" element={<RoleManagement />} />
            <Route path="organization/*" element={<OrganizationManagement />} />
            <Route path="" element={<Navigate to="roles" replace />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;