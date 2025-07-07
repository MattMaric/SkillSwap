import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a notification
export const createNotification = createAsyncThunk(
  "notifications/createNotification",
  async (notificationData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData),
      });
      if (!response.ok) throw new Error("Failed to create notification");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to fetch notifications for a user
export const fetchNotificationsByUser = createAsyncThunk(
  "notifications/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/notifications?recipientId=${userId}&_sort=timestamp&_order=desc`
      );
      if (!response.ok) throw new Error("Failed to fetch notifications");
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk to update notification status
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/notifications/${notificationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ read: true }),
        }
      );

      if (!response.ok) throw new Error("Failed to mark notification as read");

      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    markAllAsRead(state) {
      state.notifications = state.notifications.map((n) => ({
        ...n,
        read: true,
      }));
    },
  },
  extraReducers: (builder) => {
    builder
      // Create notifications
      .addCase(createNotification.fulfilled, (state, action) => {
        state.notifications.unshift(action.payload);
      })
      // Fetch notifications by user
      .addCase(fetchNotificationsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotificationsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update notification status
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n.id === action.payload.id
        );
        if (index !== -1) {
          state.notifications[index] = action.payload;
        }
      });
  },
});

export const { markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
