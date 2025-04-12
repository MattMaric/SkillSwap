import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  swaps: [],
}

const swapsSlice = createSlice({
  name: "swaps",
  initialState,
  reducers: {
    setSwaps(state, action) {
      state.swaps = action.payload;
    }
  }
});

export const { setSwaps } = swapsSlice.actions;
export default swapsSlice.reducer;