import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apis/api";
import endpoints from "../apis/endpoints";

// =======================
// ✅ FETCH ALL
// =======================
export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.branches.list);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching branches");
    }
  }
);

// =======================
// ✅ FETCH BY ID
// =======================
export const fetchBranchById = createAsyncThunk(
  "branches/fetchBranchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.branches.get(id));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching branch");
    }
  }
);

// =======================
// ✅ CREATE
// =======================
export const createBranch = createAsyncThunk(
  "branches/createBranch",
  async (data, { rejectWithValue }) => {
    try {
      console.log("📤 CREATE BRANCH:", data);

      const res = await api.post(endpoints.branches.create, data);

      console.log("✅ RESPONSE:", res.data);

      return res.data;
    } catch (err) {
      console.error("❌ ERROR:", err.response);
      return rejectWithValue(err.response?.data || "Error creating branch");
    }
  }
);

// =======================
// ✅ UPDATE (PATCH)
// =======================
export const updateBranch = createAsyncThunk(
  "branches/updateBranch",
  async ({ branch_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        endpoints.branches.update(branch_id),
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating branch");
    }
  }
);

// =======================
// ✅ SLICE
// =======================
const branchesSlice = createSlice({
  name: "branches",
  initialState: {
    branches: [],
    selectedBranch: null,
    loading: false,
    error: null,
  },

  reducers: {
    clearSelectedBranch: (state) => {
      state.selectedBranch = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;

        // 🔥 SORT FIX
        state.branches = action.payload.sort((a, b) => a.id - b.id);
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH BY ID
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.selectedBranch = action.payload;
      })

      // CREATE
      .addCase(createBranch.fulfilled, (state, action) => {
        state.branches.push(action.payload);
      })

      // UPDATE
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.branches = state.branches.map((b) =>
          b.id === action.payload.id ? action.payload : b
        );
      });
  },
});

export default branchesSlice.reducer;
export const { clearSelectedBranch } = branchesSlice.actions;