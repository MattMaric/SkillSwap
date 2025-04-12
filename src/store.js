import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import skillsReducer from "./features/skills/skillsSlice";
import swapsReducer from "./features/swaps/swapsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    swaps: swapsReducer,
  }
});

export default store;