import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import skillsReducer from "./features/auth/skillsSlice";
import swapsReducer from "./features/auth/swapsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    skills: skillsReducer,
    swaps: swapsReducer,
  }
});

export default store;