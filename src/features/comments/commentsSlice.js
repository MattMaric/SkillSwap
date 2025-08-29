import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/comments";

// Async thunk for fetching comments by swap ID
export const fetchCommentsBySwapId = createAsyncThunk(
  "comments/fetchCommentsBySwapId",
  async (swapId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}?swapId=${swapId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for fetching comments by user ID
export const fetchCommentsByUser = createAsyncThunk(
  "comments/fetchCommentsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}?userId=${userId}`);
      return res.data;
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
      const res = await axios.post(API_URL, newComment);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for deleting comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${commentId}`);
      return commentId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for editing comment
export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ id, updatedText }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, {
        text: updatedText,
        editedAt: new Date().toISOString(),
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for liking comment
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId, userEmail }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${commentId}`);
      const comment = res.data;

      const hasLiked = comment.likes.includes(userEmail);
      const updatedLikes = hasLiked
        ? comment.likes.filter((email) => email !== userEmail)
        : [...comment.likes, userEmail];

      const updateRes = await axios.patch(`${API_URL}/${commentId}`, {
        likes: updatedLikes,
      });

      return updateRes.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    commentsBySwap: [],
    commentsByUser: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Comments by SwapId
      .addCase(fetchCommentsBySwapId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsBySwapId.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsBySwap = action.payload;
      })
      .addCase(fetchCommentsBySwapId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Comments by UserId
      .addCase(fetchCommentsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsByUser = action.payload;
      })
      .addCase(fetchCommentsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Post Comment
      .addCase(postComment.fulfilled, (state, action) => {
        state.commentsBySwap.push(action.payload);
        state.commentsByUser.push(action.payload);
      })

      // Delete Comment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.commentsBySwap = state.commentsBySwap.filter(
          (c) => c.id !== action.payload
        );
        state.commentsByUser = state.commentsByUser.filter(
          (c) => c.id !== action.payload
        );
      })

      // Edit Comment
      .addCase(editComment.fulfilled, (state, action) => {
        const update = (arr) => {
          const index = arr.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) {
            arr[index] = action.payload;
          }
        };
        update(state.commentsBySwap);
        update(state.commentsByUser);
      })

      // Like Comment
      .addCase(likeComment.fulfilled, (state, action) => {
        const update = (arr) => {
          const index = arr.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) {
            arr[index] = action.payload;
          }
        };
        update(state.commentsBySwap);
        update(state.commentsByUser);
      });
  },
});

export default commentsSlice.reducer;
