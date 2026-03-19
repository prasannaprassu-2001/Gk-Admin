import React from "react";
import { Button } from "reactstrap";
import "./roles.css";

const RoleTable = ({ roles, onEdit }) => {
  return (
    <div className="role-wrapper">
      <p className="section-title">ACTIVE ROLES</p>

      {roles.map((role, index) => (
        <div key={index} className="role-row">

          {/* ICON + NAME */}
          <div className="role-left">
            <div className="role-icon">
              {role.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div className="role-title">{role.name}</div>
              <div className="role-sub">{role.label}</div>
            </div>
          </div>

          {/* ID */}
          <div className="role-col">
            <div className="value">{role.id || index + 1}</div>
            {/* <div className="label">ID</div> */}
          </div>

          {/* LEVEL */}
          <div className="role-col">
            <div className="value">{role.level}</div>
            <div className="label">Level</div>
          </div>

          {/* ACTION */}
          <div className="role-actions">
            <Button
              size="sm"
              className="edit-btn"
              onClick={() => {
                if (role.name === "super_admin") return;
                onEdit(role);
              }}
            >
              Edit
            </Button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default RoleTable;