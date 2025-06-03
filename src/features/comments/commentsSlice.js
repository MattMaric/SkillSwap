import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching comments
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (swapId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/comments?swapId=${swapId}`
      );
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
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to post comment");
      return await response.json();
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
      const res = await fetch(`http://localhost:5000/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete comment");

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
      const response = await fetch(`http://localhost:5000/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: updatedText,
          editedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Failed to edit comment");

      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for liking comment
export const likeComment = createAsyncThunk(
  "comments/likeComment",
  async ({ commentId, userEmail }, thunkAPI) => {
    try {
      const res = await fetch(`http://localhost:5000/comments/${commentId}`);
      if (!res.ok) throw new Error("Failed to fetch comment");

      const comment = await res.json();

      const hasLiked = comment.likes.includes(userEmail);
      let updatedLikes;

      if (hasLiked) {
        updatedLikes = comment.likes.filter((email) => email !== userEmail);
      } else {
        updatedLikes = [...comment.likes, userEmail];
      }

      const updateRes = await fetch(
        `http://localhost:5000/comments/${commentId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: updatedLikes }),
        }
      );

      if (!updateRes.ok) throw new Error("Failed to like comment");

      const updatedComment = await updateRes.json();
      return updatedComment;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
        (state.loading = false), (state.error = action.payload);
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c.id !== action.payload);
      })
      .addCase(editComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      });
  },
});

export default commentsSlice.reducer;
