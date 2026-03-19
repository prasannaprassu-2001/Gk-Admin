import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apis/api";
import endpoints from "../apis/endpoints";

// ✅ FETCH ALL
export const fetchRegions = createAsyncThunk(
  "regions/fetchRegions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.regions.list);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching regions");
    }
  }
);

// ✅ FETCH BY ID
export const fetchRegionById = createAsyncThunk(
  "regions/fetchRegionById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(endpoints.regions.get(id));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching region");
    }
  }
);

// ✅ CREATE
export const createRegion = createAsyncThunk(
  "regions/createRegion",
  async (data, { rejectWithValue }) => {
    try {
        console.log("API CALL DATA:", data); 
      const res = await api.post(endpoints.regions.create, data);
    console.log("✅ API RESPONSE:", res.data);
      return res.data;
    } catch (err) {
      console.error("API ERROR:", err.response);
      return rejectWithValue(err.response?.data || "Error creating region");
    }
  }
);

// ✅ UPDATE
export const updateRegion = createAsyncThunk(
  "regions/updateRegion",
  async ({ region_id, data }, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        endpoints.regions.update(region_id),
        data
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating region");
    }
  }
);

const regionSlice = createSlice({
  name: "regions",
  initialState: {
    regions: [],
    selectedRegion: null, // 🔥 REQUIRED
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedRegion: (state) => {
      state.selectedRegion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 FETCH ALL
      .addCase(fetchRegions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.loading = false;
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 FETCH BY ID
      .addCase(fetchRegionById.fulfilled, (state, action) => {
        state.selectedRegion = action.payload;
      })

      // 🔹 CREATE
      .addCase(createRegion.fulfilled, (state, action) => {
        state.regions.push(action.payload);
      })

      // 🔹 UPDATE
      .addCase(updateRegion.fulfilled, (state, action) => {
        state.regions = state.regions.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
      });
  },
});

export default regionSlice.reducer;

export const { clearSelectedRegion } = regionSlice.actions;