// // src/components/ListRegions.jsx
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Table, Button, Spinner } from "reactstrap";
// import {
//   fetchRegions,
//   fetchRegionById,
//   createRegion,
//   updateRegion,
//   clearSelectedRegion // 🔥 ADD THIS
// } from "../../../redux/organizationSlice";
// import RegionModal from "./RegionModal";
// import toast, { Toaster } from "react-hot-toast";

// const ListRegions = () => {
//   const dispatch = useDispatch();
// const { regions = [], selectedRegion = null, loading = false, error = null } =
//   useSelector((state) => state.organisation || {});

//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchRegions());
//   }, [dispatch]);

//   useEffect(() => {
//     if (error) {
//       toast.error(typeof error === "string" ? error : JSON.stringify(error));
//     }
//   }, [error]);

//   // ✅ OPEN ADD
//   const openAddModal = () => {
//     dispatch(clearSelectedRegion()); // 🔥 CLEAR OLD DATA
//     setModalOpen(true);
//   };

//   // ✅ OPEN EDIT
//   const openEditModal = async (regionId) => {
//     try {
//       await dispatch(fetchRegionById(regionId)).unwrap();
//       setModalOpen(true);
//     } catch {
//       toast.error("Failed to fetch region");
//     }
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//     dispatch(clearSelectedRegion()); // 🔥 RESET AFTER CLOSE
//   };

//   // ✅ SUBMIT HANDLER
//   const handleSubmit = async (data) => {
//       console.log("DISPATCHING CREATE:", data); 
//     try {
//       if (selectedRegion) {
//         await dispatch(
//           updateRegion({
//             region_id: selectedRegion.id,
//             data,
//           })
//         ).unwrap();

//         toast.success("Region updated!");
//       } else {
//         await dispatch(createRegion(data)).unwrap();
//         toast.success("Region created!");
//       }

//       dispatch(fetchRegions()); // 🔥 refresh list
//       closeModal();
//     } catch(err) {
//       console.error("CREATE ERROR:", err);
//       toast.error("Operation failed");
//     }
//   };

//   if (loading) return <Spinner color="primary" />;

//   return (
//     <div>
//       <Toaster />

//     <div className="page-header mb-3">
//   <h4 className="page-title">Region Management</h4>

//   <Button className="add-role-btn" onClick={openAddModal}>
//     + Add Region
//   </Button>
// </div>

//       <Table bordered responsive>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Code</th>
//             <th>Active</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//        <tbody>
//   {regions.length > 0 ? (
//     [...regions]
//       .sort((a, b) => a.id - b.id)
//       .map((r) => (
//         <tr key={r.id}>
//           <td>{r.id}</td>
//           <td>{r.name}</td>
//           <td>{r.code}</td>
//           <td>{r.is_active ? "Yes" : "No"}</td>
//           <td>
//             <Button
//               size="sm"
//               color="primary"
//               onClick={() => openEditModal(r.id)}
//             >
//               Edit
//             </Button>

//             <Button
//               size="sm"
//               color="danger"
//               style={{ marginLeft: "10px" }}
//               onClick={() => handleDelete(r.id)}
//             >
//               Delete
//             </Button>
//           </td>
//         </tr>
//       ))
//   ) : (
//     <tr>
//       <td colSpan={5} className="text-center">
//         No regions found
//       </td>
//     </tr>
//   )}
// </tbody>
//       </Table>

//    <RegionModal
//   isOpen={modalOpen}
//   toggle={closeModal}
//   onSubmit={handleSubmit}   // ✅ USE COMMON HANDLER
//   initialData={selectedRegion} // ✅ PASS DATA
// />
//     </div>
//   );
// };

// export default ListRegions;
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegions,
  fetchRegionById,
  createRegion,
  updateRegion,
  clearSelectedRegion
} from "../../../redux/organizationSlice";
import RegionModal from "./RegionModal";
import toast, { Toaster } from "react-hot-toast";
import "../../role-management/roles.css"; // reuse same styles

const ListRegions = () => {
  const dispatch = useDispatch();

  const {
    regions = [],
    selectedRegion = null,
    loading = false,
    error = null
  } = useSelector((state) => state.organisation || {});

  const [modalOpen, setModalOpen] = useState(false);

  // 🔄 Fetch regions
  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  // ❌ Error handling
  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : JSON.stringify(error));
    }
  }, [error]);

  // ➕ OPEN ADD
  const openAddModal = () => {
    dispatch(clearSelectedRegion());
    setModalOpen(true);
  };

  // ✏️ OPEN EDIT
  const openEditModal = async (regionId) => {
    try {
      await dispatch(fetchRegionById(regionId)).unwrap();
      setModalOpen(true);
    } catch {
      toast.error("Failed to fetch region");
    }
  };

  // ❌ CLOSE MODAL
  const closeModal = () => {
    setModalOpen(false);
    dispatch(clearSelectedRegion());
  };

  // ✅ SUBMIT
  const handleSubmit = async (data) => {
    try {
      if (selectedRegion) {
        await dispatch(
          updateRegion({
            region_id: selectedRegion.id,
            data
          })
        ).unwrap();

        toast.success("Region updated!");
      } else {
        await dispatch(createRegion(data)).unwrap();
        toast.success("Region created!");
      }

      dispatch(fetchRegions());
      closeModal();
    } catch {
      toast.error("Operation failed");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <Toaster />

      {/* 🔥 HEADER */}
      <div className="page-header mb-3">
        <h4 className="page-title">Region Management</h4>

        <Button className="add-role-btn" onClick={openAddModal}>
          + Add Region
        </Button>
      </div>

      {/* 🔥 PREMIUM LIST */}
      <div className="role-wrapper">
        <p className="section-title">ACTIVE REGIONS</p>

        {regions.length > 0 ? (
          [...regions]
            .sort((a, b) => a.id - b.id)
            .map((r) => (
              <div key={r.id} className="role-row">

                {/* LEFT */}
                <div className="role-left">
                  <div className="role-icon">
                    {r.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div className="role-title">{r.name}</div>
                    <div className="role-sub">{r.code}</div>
                  </div>
                </div>

                {/* ID */}
                <div className="role-col">
                  <div className="value">{r.id}</div>
                  <div className="label">ID</div>
                </div>

                {/* ACTIVE */}
                <div className="role-col">
                  <div className="value">
                    {r.is_active ? "Yes" : "No"}
                  </div>
                  <div className="label">Active</div>
                </div>

                {/* ACTION */}
                <div className="role-actions">
                  <Button
                    size="sm"
                    className="edit-btn"
                    onClick={() => openEditModal(r.id)}
                  >
                    Edit
                  </Button>
                </div>

              </div>
            ))
        ) : (
          <p className="text-center">No regions found</p>
        )}
      </div>

      {/* 🔥 MODAL */}
      {modalOpen && (
        <RegionModal
          isOpen={modalOpen}
          toggle={closeModal}
          onSubmit={handleSubmit}
          initialData={selectedRegion}
        />
      )}
    </div>
  );
};

export default ListRegions;