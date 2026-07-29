import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { FAVORITES_STORAGE_KEY } from "../../constants/storageKeys";
import { fetchProductsApi } from "../../services/productService";

/**
 * Reads persisted favorite product ids from local storage.
 *
 * @returns {Array<number>} Persisted favorite ids.
 */
function getInitialFavorites() {
  try {
    const rawValue = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const parsedValue = JSON.parse(rawValue ?? "[]");

    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    return [];
  }
}

/**
 * Async action for loading products.
 */
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => fetchProductsApi());

/**
 * Product slice for listing controls and favorites.
 */
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    categoryFilter: "all",
    ratingFilter: 0,
    sortOrder: "asc",
    showFavoritesOnly: false,
    favorites: getInitialFavorites(),
    currentPage: 1,
    itemsPerPage: 8
  },
  reducers: {
    /**
     * Sets active category filter.
     *
     * @param {object} state Redux state.
     * @param {object} action Redux action.
     */
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
      state.currentPage = 1;
    },
    /**
     * Sets active minimum rating filter.
     *
     * @param {object} state Redux state.
     * @param {object} action Redux action.
     */
    setRatingFilter(state, action) {
      state.ratingFilter = action.payload;
      state.currentPage = 1;
    },
    /**
     * Sets the active sort order.
     *
     * @param {object} state Redux state.
     * @param {object} action Redux action.
     */
    setSortOrder(state, action) {
      state.sortOrder = action.payload;
      state.currentPage = 1;
    },
    /**
     * Toggles favorites-only listing mode.
     *
     * @param {object} state Redux state.
     * @param {object} action Redux action.
     */
    setShowFavoritesOnly(state, action) {
      state.showFavoritesOnly = action.payload;
      state.currentPage = 1;
    },
    /**
     * Toggles product id in the favorites collection.
     *
     * @param {object} state Redux state.
     * @param {object} action Redux action.
     */
    toggleFavorite(state, action) {
      const productId = action.payload;
      const currentIndex = state.favorites.indexOf(productId);

      if (currentIndex === -1) {
        state.favorites.push(productId);
      } else {
        state.favorites.splice(currentIndex, 1);
      }
    },
    /**
     * Sets current page for pagination.
     *
     * @param {object} state Redux state.
     * @param {object} action Redux action.
     */
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const {
  setCategoryFilter,
  setCurrentPage,
  setRatingFilter,
  setShowFavoritesOnly,
  setSortOrder,
  toggleFavorite
} = productsSlice.actions;

export default productsSlice.reducer;
