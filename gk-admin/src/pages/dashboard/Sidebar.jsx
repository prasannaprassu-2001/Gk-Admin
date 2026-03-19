import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Layers,
  Map,
  GitBranch,
  Share2,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight
} from "react-feather";

const Sidebar = ({ onLogout, sidebarOpen }) => {   // ✅ RECEIVE PROP
  const [orgOpen, setOrgOpen] = useState(false);

  const linkStyle = {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 15px",
    borderRadius: "10px",
    transition: "0.3s",
    textDecoration: "none",
    fontSize: "14px"
  };

  const activeStyle = {
    background: "#0369A1",
  };

  const toggleOrg = () => setOrgOpen(prev => !prev);

  return (
    // <div className="sidebar">
     <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      {/* TOP */}
      <div className="sidebar-top">
        <h2 className="sidebar-title">Gk Admin</h2>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>

            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard/roles"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                <Home size={18} /> Dashboard
              </NavLink>
            </li>

            {/* Organization */}
            <li>
              <div
                onClick={toggleOrg}
                style={{
                  ...linkStyle,
                  cursor: "pointer",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Layers size={18} /> Organization
                </div>
                {orgOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>

              {orgOpen && (
                <ul style={{ listStyle: "none", padding: "5px 0 5px 25px" }}>
                  <li>
                    <NavLink
                      to="/dashboard/organization/regions"
                      style={({ isActive }) =>
                        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                      }
                    >
                      <Map size={16} /> Regions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/organization/clusters"
                      style={({ isActive }) =>
                        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                      }
                    >
                      <GitBranch size={16} /> Clusters
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/organization/branches"
                      style={({ isActive }) =>
                        isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                      }
                    >
                      <Share2 size={16} /> Branches
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>

          </ul>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="sidebar-bottom">

        <div style={linkStyle}>
          <Settings size={18} /> Settings
        </div>

        {/* ✅ LOGOUT CLICK */}
        <div
          style={{ ...linkStyle, cursor: "pointer" }}
          onClick={onLogout}
        >
          <LogOut size={18} /> Logout
        </div>

      </div>

    </div>
  );
};

export default Sidebar;