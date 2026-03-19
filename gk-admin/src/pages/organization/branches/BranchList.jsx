import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBranches,
  createBranch,
  updateBranch,
  fetchBranchById,
  clearSelectedBranch,
} from "../../../redux/branchesSlice";

import BranchModel from "./BranchModel";
import toast, { Toaster } from "react-hot-toast";
import "../../role-management/roles.css";

const BranchList = () => {
  const dispatch = useDispatch();

  const { branches = [], selectedBranch = null, loading } =
    useSelector((state) => state.branches);

  const [modalOpen, setModalOpen] = useState(false);

  // FETCH
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // ADD
  const openAddModal = () => {
    dispatch(clearSelectedBranch());
    setModalOpen(true);
  };

  // EDIT
  const openEditModal = async (id) => {
    await dispatch(fetchBranchById(id));
    setModalOpen(true);
  };

  // CLOSE
  const closeModal = () => {
    setModalOpen(false);
    dispatch(clearSelectedBranch());
  };

  // SUBMIT
  const handleSubmit = async (data) => {
    try {
      if (selectedBranch) {
        await dispatch(
          updateBranch({
            branch_id: selectedBranch.id,
            data
          })
        ).unwrap();

        toast.success("Branch updated!");
      } else {
        await dispatch(createBranch(data)).unwrap();
        toast.success("Branch created!");
      }

      dispatch(fetchBranches());
      closeModal();
    } catch {
      toast.error("Operation failed");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <Toaster />

      {/* HEADER */}
      <div className="page-header mb-3">
        <h4 className="page-title">Branch Management</h4>

        <Button className="add-role-btn" onClick={openAddModal}>
          + Add Branch
        </Button>
      </div>

      {/* LIST UI */}
      <div className="role-wrapper">
        <p className="section-title">ACTIVE BRANCHES</p>

        {branches.length > 0 ? (
          branches.map((b) => (
            <div key={b.id} className="role-row">

              {/* LEFT */}
              <div className="role-left">
                <div className="role-icon">
                  {b.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="role-title">{b.name}</div>
                  <div className="role-sub">{b.code}</div>
                </div>
              </div>

              {/* ID */}
              <div className="role-col">
                <div className="value">{b.id}</div>
                <div className="label">ID</div>
              </div>

              {/* CLUSTER */}
              <div className="role-col">
                <div className="value">{b.cluster_name}</div>
                <div className="label">Cluster</div>
              </div>

              {/* REGION */}
              <div className="role-col">
                <div className="value">{b.region_name}</div>
                <div className="label">Region</div>
              </div>

              {/* ADDRESS */}
              <div className="role-col">
                <div className="value">{b.address}</div>
                <div className="label">Address</div>
              </div>

              {/* ACTION */}
              <div className="role-actions">
                <Button
                  size="sm"
                  className="edit-btn"
                  onClick={() => openEditModal(b.id)}
                >
                  Edit
                </Button>
              </div>

            </div>
          ))
        ) : (
          <p className="text-center">No branches found</p>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <BranchModel
          isOpen={modalOpen}
          toggle={closeModal}
          onSubmit={handleSubmit}
          initialData={selectedBranch}
        />
      )}
    </div>
  );
};

export default BranchList;