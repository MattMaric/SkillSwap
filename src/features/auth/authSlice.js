import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}?email=${email}`);
      const users = res.data;

      const user = users.find((u) => u.password === password);

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);

// Async thunk for user signup
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const checkRes = await axios.get(`${API_URL}?email=${email}`);
      const existingUsers = checkRes.data;

      if (existingUsers.length > 0) {
        return thunkAPI.rejectWithValue("Email already in use");
      }

      const res = await axios.post(API_URL, {
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      });

      const newUser = res.data;

      // Auto-login
      await thunkAPI.dispatch(loginUser({ name, email, password }));

      return newUser;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const userFromStorage = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
