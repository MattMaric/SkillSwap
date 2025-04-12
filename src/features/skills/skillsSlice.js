import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [],
};

const skillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills(state, action) {
      state.skills = action.payload;
    }
  }
});

export const { setSkills } = skillsSlice.actions;
export default skillsSlice.reducer;