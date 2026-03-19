// src/pages/OrganizationManagement.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Sub-pages
import ListRegions from "./regions/ListRegions";
import ClusterList from "./clusters/ClusterList";
import BranchList from "./branches/BranchList";

const OrganizationManagement = () => {
  return (
    <div className="organization-management">
      {/* <h2>Organization Management</h2> */}
      <div className="grid-container">
        <Routes>
          <Route path="regions" element={<ListRegions />} />
          <Route path="clusters" element={<ClusterList />} />
          <Route path="branches" element={<BranchList />} />
          <Route path="*" element={<div>Select a section from the sidebar</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default OrganizationManagement;