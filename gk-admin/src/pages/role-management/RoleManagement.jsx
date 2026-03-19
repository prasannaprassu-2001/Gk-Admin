import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, fetchRoleById, createRole, updateRole } from "../../redux/rolesSlice";
import RoleTable from "./RoleTable";
import RoleFormModal from "./RoleFormModal";
import toast, { Toaster } from "react-hot-toast";
import './roles.css'
const RoleManagement = () => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(null);
  const { roles, loading, error } = useSelector((state) => state.roles);

  const [modal, setModal] = useState(false);

  // Fetch all roles on mount
  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  // Show errors safely
  useEffect(() => {
    if (error) {
      const message = typeof error === "string" ? error :
        error?.detail ? JSON.stringify(error.detail) : JSON.stringify(error);
      toast.error(message);
    }
  }, [error]);

  // Open modal for editing role
  const handleEditRole = (roleId) => {
    dispatch(fetchRoleById(roleId)).then((res) => {
      if (res.payload) {
        setSelectedRole(res.payload); // populate modal
        setModal(true);
      }
    });
  };

  return (
    <Container fluid className="mt-3 px-4">
      <Toaster />

     <div className="page-header mb-3">
  <h4 className="page-title">Role Management</h4>

  <Button
    className="add-role-btn"
    onClick={() => {
      setSelectedRole(null);
      setModal(true);
    }}
  >
    + Add Role
  </Button>
</div>

      <Card className="border-0 bg-transparent">
        <CardBody>
          {loading ? (
            <p>Loading...</p>
          ) : (
              <RoleTable
  roles={roles}
  onEdit={(role) => {
    setSelectedRole(role);
    setModal(true);
  }}
/>
          )}
        </CardBody>
      </Card>

      {modal && (
        <RoleFormModal
          isOpen={modal}
          toggle={() => {
            setModal(false);
            setSelectedRole(null);
          }}
          role={selectedRole}
          onSubmit={(data) => {
            if (selectedRole) {
              // Edit mode → PATCH
              dispatch(updateRole({ role_id: selectedRole.id, data }))
                .unwrap()
                .then(() => {
                  toast.success("Role updated successfully");
                  setModal(false);
                  setSelectedRole(null);
                })
                .catch((err) => {
                  const msg = typeof err === "string" ? err : err?.detail || "Failed to update role";
                  toast.error(msg);
                });
            } else {
              // Create mode → POST
              dispatch(createRole(data))
                .unwrap()
                .then(() => {
                  toast.success("Role created successfully");
                  setModal(false);
                  dispatch(fetchRoles());
                })
                .catch((err) => {
                  const msg = typeof err === "string" ? err : err?.detail || "Failed to create role";
                  toast.error(msg);
                });
            }
          }}
        />
      )}
    </Container>
  );
};

export default RoleManagement;