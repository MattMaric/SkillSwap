import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, {rejectWithValue}) => {
    try {
      const res = await fetch(`http://localhost:5000/users?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      const user = users.find((u) => u.password === password);

      if (!user) {
        return rejectWithValue("Invalid email or password");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    } catch (err) {
      return rejectWithValue("Something went wrong");
    }
  }
);

// Async thunk for user signup
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, {rejectWithValue}) => {
    try {
      const checkRes = await fetch(`http://localhost:5000/users?email=${email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        return rejectWithValue("Email already in use");
      }

      const res = await fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) throw new Error("Failed to register");

      const newUser = await res.json();

      // Auto-login
      await thunkAPI.dispatch(loginUser({ name, email, password }));

      return newUser;
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
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
    }
  },
  extraReducers: (builder) => {
    builder
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
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;