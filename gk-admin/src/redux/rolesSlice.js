// src/redux/rolesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apis/api";
import endpoints from "../apis/endpoints";

// 🔹 Fetch roles
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(endpoints.roles.list);
      return response.data;
    } catch (err) {
      console.error("Error fetching roles:", err);
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch roles");
    }
  }
);

// 🔹 Create a new role
export const createRole = createAsyncThunk(
  "roles/createRole",
  async (roleData, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.roles.create, roleData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // newly created role
    } catch (err) {
      console.error("Error creating role:", err);
      return rejectWithValue(err.response?.data?.detail || err.message || "Failed to create role");
    }
  }
);

// Fetch a single role
export const fetchRoleById = createAsyncThunk(
  "roles/fetchRoleById",
  async (roleId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/roles/${roleId}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching role:", err);
      return rejectWithValue(err.response?.data || err.message || "Failed to fetch role");
    }
  }
);

// redux/rolesSlice.js
export const updateRole = createAsyncThunk(
  "roles/updateRole",
  async ({ role_id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/roles/${role_id}`, data, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data;
    } catch (err) {
      console.error("Error updating role:", err);
       const msg = err?.response?.data?.detail || "Failed to update role";
  toast.error(msg);
    }
  }
);

const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: [],
    selectedRole: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch roles
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create role
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      // Fetch single role
builder
  .addCase(fetchRoleById.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchRoleById.fulfilled, (state, action) => {
    state.loading = false;
    state.selectedRole = action.payload; // new field
  })
  .addCase(fetchRoleById.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  .addCase(updateRole.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateRole.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.roles.findIndex(r => r.id === action.payload.id);
  if (index !== -1) state.roles[index] = action.payload;
})
.addCase(updateRole.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  },
});

export default rolesSlice.reducer;