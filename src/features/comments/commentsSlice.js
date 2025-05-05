import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching comments
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async(swapId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/comments?swapId=${swapId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for posting a new comment
export const postComment = createAsyncThunk(
  "comments/postComment",
  async (newComment, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/comments", {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) throw new Error("Failed to post comment");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false,
        state.error = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;