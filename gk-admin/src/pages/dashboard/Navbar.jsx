// import React from "react";
// import { Bell, Search } from "react-feather";
// import './Dashboard.css';
// const Navbar = () => {
//   // ✅ Get user data (adjust key based on your login storage)
//   const user = JSON.parse(localStorage.getItem("user")) || {
//     name: "Admin",
//   };

//   const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "A";

//  return (
//   <div className="navbar">

//     {/* LEFT */}
//     <div className="nav-left">
//       <h3 className="nav-title">Dashboard</h3>
//     </div>

//     {/* CENTER SEARCH */}
//     <div className="nav-center">
//       <div className="search-wrapper">
//         <Search size={16} className="search-icon" />
//         <input
//           type="text"
//           placeholder="Search here..."
//           className="search-input"
//         />
//       </div>
//     </div>

//     {/* RIGHT */}
//     <div className="nav-right">

//       <div className="nav-icon">
//         <Bell size={18} />
//       </div>

//       <div className="profile">
//   <div className="profile-info">
//     <div className="profile-name">{user.name}</div>
//     <div className="profile-role">Super Admin</div>
//   </div>

//   {/* ✅ Avatar LAST */}
//   <div className="avatar">
//     {firstLetter}
//   </div>
// </div>

//     </div>

//   </div>
// );
// };

// export default Navbar;
import React from "react";
import { Bell, Search } from "react-feather";

const Navbar = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Admin" };
  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <div className="navbar">

      <div className="nav-left">
        <button className="menu-btn" onClick={toggleSidebar}>
          ☰
        </button>
        <h3>Dashboard</h3>
      </div>

      <div className="nav-center">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Search..." />
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-icon">
          <Bell size={18} />
        </div>

        <div className="profile">
          <div>
            <div>{user.name}</div>
            <small>Admin</small>
          </div>
          <div className="avatar">{firstLetter}</div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;