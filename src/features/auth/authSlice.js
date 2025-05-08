import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/users?email=${email}`);
      if (!res.ok) throw new Error("Failed to fetch users");

      const users = await res.json();
      const user = users.find((u) => u.password === password);

      if (!user) {
        return thunkAPI.rejectWithValue("Invalid email or password");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    } catch (err) {
      return thunkAPI.rejectWithValue("Something went wrong");
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
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;