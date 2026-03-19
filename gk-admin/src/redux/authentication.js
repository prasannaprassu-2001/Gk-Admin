import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../apis/api";
import endpoints from "../apis/endpoints";

// 🔐 LOGIN API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(endpoints.auth.login, credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
 initialState: {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("access") || null,
  loading: false,
  error: null,
},
  reducers: {
  logout: (state) => {
  state.user = null;
  state.token = null;

  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;

  // ✅ Correct extraction
  const { access_token, refresh_token, user } = action.payload;

  state.token = access_token;
  state.user = user;

  // ✅ Store in localStorage
  localStorage.setItem("access", access_token);
  localStorage.setItem("refresh", refresh_token);
  localStorage.setItem("user", JSON.stringify(user));
})
 .addCase(loginUser.rejected, (state, action) => {
  state.loading = false;

  // ✅ ALWAYS return string
  state.error =
    action.payload?.detail?.[0]?.msg ||  // API error
    action.payload ||                   // fallback
    "Login failed";
});
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;