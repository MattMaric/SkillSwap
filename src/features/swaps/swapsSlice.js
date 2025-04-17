import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting a new swap
export const createSwap = createAsyncThunk(
  "swaps/createSwap",
  async (swapData, { rejectWithValue }) => {
    try {
      // replace with real API later
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify(swapData),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to create swap");
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const swapsSlice = createSlice({
  name: "swaps",
  initialState: {
    swaps: [],
    loading: false,
    error: null,
    success: false,
  }, 
  reducers: {
    clearSwapStatus: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSwap.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createSwap.fulfilled, (state, action) => {
        state.loading = false;
        state.swaps.push(action.payload);
        state.success = true;
      })
      .addCase(createSwap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  },
});

export const { clearSwapStatus } = swapsSlice.actions;
export default swapsSlice.reducer;