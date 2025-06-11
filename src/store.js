import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import swapsReducer from "./features/swaps/swapsSlice";
import commentsReducer from "./features/comments/commentsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    swaps: swapsReducer,
    comments: commentsReducer,
  },
});

export default store;
