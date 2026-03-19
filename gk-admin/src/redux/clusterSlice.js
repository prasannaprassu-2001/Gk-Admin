import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apis/api";
import endpoints from "../apis/endpoints";

// =======================
// ✅ FETCH ALL CLUSTERS
// =======================
export const fetchClusters = createAsyncThunk(
  "clusters/fetchClusters",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.clusters.list);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching clusters");
    }
  }
);

// =======================
// ✅ FETCH CLUSTER BY ID
// =======================
export const fetchClusterById = createAsyncThunk(
  "clusters/fetchClusterById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.clusters.get(id));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching cluster");
    }
  }
);

// =======================
// ✅ CREATE CLUSTER
// =======================
export const createCluster = createAsyncThunk(
  "clusters/createCluster",
  async (data, { rejectWithValue }) => {
    try {
      console.log("📤 CREATE CLUSTER DATA:", data);

      const res = await api.post(endpoints.clusters.create, data);

      console.log("✅ CREATE RESPONSE:", res.data);

      return res.data;
    } catch (err) {
      console.error("❌ CREATE ERROR:", err.response);
      return rejectWithValue(err.response?.data || "Error creating cluster");
    }
  }
);

// =======================
// ✅ UPDATE CLUSTER (PATCH)
// =======================
export const updateCluster = createAsyncThunk(
  "clusters/updateCluster",
  async ({ cluster_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        endpoints.clusters.update(cluster_id),
        data // only name, code, is_active
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating cluster");
    }
  }
);

// =======================
// ✅ SLICE
// =======================
const clusterSlice = createSlice({
  name: "clusters",
  initialState: {
    clusters: [],
    selectedCluster: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedCluster: (state) => {
      state.selectedCluster = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // 🔹 FETCH ALL
      .addCase(fetchClusters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClusters.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 SORT FIX (important)
        state.clusters = action.payload.sort((a, b) => a.id - b.id);
      })
      .addCase(fetchClusters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 FETCH BY ID
      .addCase(fetchClusterById.fulfilled, (state, action) => {
        state.selectedCluster = action.payload;
      })

      // 🔹 CREATE
      .addCase(createCluster.fulfilled, (state, action) => {
        state.clusters.push(action.payload);
      })

      // 🔹 UPDATE
      .addCase(updateCluster.fulfilled, (state, action) => {
        state.clusters = state.clusters.map((c) =>
          c.id === action.payload.id ? action.payload : c
        );
      });
  },
});

export default clusterSlice.reducer;

export const { clearSelectedCluster } = clusterSlice.actions;