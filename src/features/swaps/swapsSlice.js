import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for submitting a new swap
export const createSwap = createAsyncThunk(
  "swaps/createSwap",
  async (swapData, { rejectWithValue }) => {
    try {
      // replace with real API later
      const response = await fetch("http://localhost:5000/swaps", {
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

// Async thunk for fetching swaps
export const fetchSwaps = createAsyncThunk(
  "swaps/fetchSwaps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/swaps");
      if (!response.ok) throw new Error("Failed to fetch swaps");
      const data = await response.json();
      return data
        .slice(0, 10)
        .map((swap) => ({ ...swap, isFavorite: swap.isFavorite ?? false })); // limit the mock
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for deleting swaps
export const deleteSwap = createAsyncThunk(
  "swaps/deleteSwap",
  async (swapId, { rejectWithValue }) => {
    try {
      // Replace with real API later
      const response = await fetch(`http://localhost:5000/swaps/${swapId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete swap");

      return swapId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Async thunk for editing swaps
export const editSwap = createAsyncThunk(
  "swaps/editSwap",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      // Replace with real API later
      const response = await fetch(`http://localhost:5000/swaps/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to update swap");

      const data = await response.json();
      return { id, updatedData: data };
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
    search: "",
    category: "",
    sortOption: "title-asc",
  },
  reducers: {
    clearSwapStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.category = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    toggleFavorite: (state, action) => {
      const swap = state.swaps.find((s) => s.id === action.payload);
      if (swap) {
        swap.isFavorite = !swap.isFavorite;
      }
    },
    addComment: (state, action) => {
      const { swapId, comment } = action.payload;
      const swap = state.swaps.find((s) => s.id === swapId);
      if (swap) {
        if (!swap.comments) {
          swap.comments = [];
        }
        swap.comments.push(comment);
      }
    },
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
      .addCase(fetchSwaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSwaps.fulfilled, (state, action) => {
        state.loading = false;
        state.swaps = action.payload;
      })
      .addCase(fetchSwaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSwap.fulfilled, (state, action) => {
        state.swaps = state.swaps.filter((swap) => swap.id !== action.payload);
      })
      .addCase(editSwap.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(editSwap.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const { id, updatedData } = action.payload;
        const index = state.swaps.findIndex((swap) => swap.id === id);
        if (index !== -1) {
          state.swaps[index] = { ...state.swaps[index], ...updatedData };
        }
      })
      .addCase(editSwap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const {
  clearSwapStatus,
  setSearch,
  setCategoryFilter,
  setSortOption,
  toggleFavorite,
  addComment,
} = swapsSlice.actions;

export const selectFilteredSwaps = (state) => {
  const { swaps, search, category, sortOption } = state.swaps;

  let filteredSwaps = swaps.filter((swap) => {
    const matchesSearch = swap.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category ? swap.category === category : true;
    return matchesSearch && matchesCategory;
  });

  // Sorting filtered swaps
  if (sortOption === "title-asc") {
    filteredSwaps.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "title-desc") {
    filteredSwaps.sort((a, b) => b.title.localeCompare(a.title));
  }

  return filteredSwaps;
};

export default swapsSlice.reducer;
