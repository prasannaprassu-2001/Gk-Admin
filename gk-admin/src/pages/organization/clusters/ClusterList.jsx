import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClusters,
  createCluster,
  updateCluster,
  fetchClusterById,
  clearSelectedCluster,
} from "../../../redux/clusterSlice";

import ClusterModal from "./ClusterModal";
import toast, { Toaster } from "react-hot-toast";
import "../../role-management/roles.css";

const ClusterList = () => {
  const dispatch = useDispatch();

  const { clusters = [], selectedCluster = null, loading } =
    useSelector((state) => state.clusters);

  const [modalOpen, setModalOpen] = useState(false);

  // fetch
  useEffect(() => {
    dispatch(fetchClusters());
  }, [dispatch]);

  // open add
  const openAddModal = () => {
    dispatch(clearSelectedCluster());
    setModalOpen(true);
  };

  // open edit
  const openEditModal = async (id) => {
    await dispatch(fetchClusterById(id));
    setModalOpen(true);
  };

  // close
  const closeModal = () => {
    setModalOpen(false);
    dispatch(clearSelectedCluster());
  };

  // submit
  const handleSubmit = async (data) => {
    try {
      if (selectedCluster) {
        await dispatch(
          updateCluster({
            cluster_id: selectedCluster.id,
            data
          })
        ).unwrap();

        toast.success("Cluster updated!");
      } else {
        await dispatch(createCluster(data)).unwrap();
        toast.success("Cluster created!");
      }

      dispatch(fetchClusters());
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
        <h4 className="page-title">Cluster Management</h4>

        <Button className="add-role-btn" onClick={openAddModal}>
          + Add Cluster
        </Button>
      </div>

      {/* LIST UI */}
      <div className="role-wrapper">
        <p className="section-title">ACTIVE CLUSTERS</p>

        {clusters.length > 0 ? (
          clusters.map((c) => (
            <div key={c.id} className="role-row">

              {/* LEFT */}
              <div className="role-left">
                <div className="role-icon">
                  {c.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <div className="role-title">{c.name}</div>
                  <div className="role-sub">{c.code}</div>
                </div>
              </div>

              {/* ID */}
              <div className="role-col">
                <div className="value">{c.id}</div>
                <div className="label">ID</div>
              </div>

              {/* REGION */}
              <div className="role-col">
                <div className="value">{c.region_id}</div>
                <div className="label">Region</div>
              </div>

              {/* ACTIVE */}
              <div className="role-col">
                <div className="value">
                  {c.is_active ? "Yes" : "No"}
                </div>
                <div className="label">Active</div>
              </div>

              {/* ACTION */}
              <div className="role-actions">
                <Button
                  size="sm"
                  className="edit-btn"
                  onClick={() => openEditModal(c.id)}
                >
                  Edit
                </Button>
              </div>

            </div>
          ))
        ) : (
          <p className="text-center">No clusters found</p>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <ClusterModal
          isOpen={modalOpen}
          toggle={closeModal}
          onSubmit={handleSubmit}
          initialData={selectedCluster}
        />
      )}
    </div>
  );
};

export default ClusterList;