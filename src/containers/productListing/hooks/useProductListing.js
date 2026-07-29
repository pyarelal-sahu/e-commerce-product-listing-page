import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FAVORITES_STORAGE_KEY } from "../../../constants/storageKeys";
import {
  fetchProducts,
  setCategoryFilter,
  setCurrentPage,
  setRatingFilter,
  setShowFavoritesOnly,
  setSortOrder,
  toggleFavorite
} from "../../../RTK/slices/productsSlice";
import {
  getCategoryOptions,
  getFilteredAndSortedProducts,
  getPaginatedProducts,
  getTotalPages
} from "../utils/productListingUtils";

/**
 * Product listing controller hook.
 *
 * @returns {object} View model and actions for product listing UI.
 */
function useProductListing() {
  const dispatch = useDispatch();
  const {
    categoryFilter,
    currentPage,
    error,
    favorites,
    items,
    itemsPerPage,
    ratingFilter,
    showFavoritesOnly,
    sortOrder,
    status
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const categories = useMemo(() => getCategoryOptions(items), [items]);

  const filteredProducts = useMemo(
    () =>
      getFilteredAndSortedProducts(
        items,
        categoryFilter,
        ratingFilter,
        sortOrder,
        favorites,
        showFavoritesOnly
      ),
    [categoryFilter, favorites, items, ratingFilter, showFavoritesOnly, sortOrder]
  );

  const totalPages = useMemo(
    () => getTotalPages(filteredProducts.length, itemsPerPage),
    [filteredProducts.length, itemsPerPage]
  );

  const currentProducts = useMemo(() => {
    return getPaginatedProducts(filteredProducts, currentPage, itemsPerPage);
  }, [currentPage, filteredProducts, itemsPerPage]);

  const handleCategoryChange = useCallback(
    (value) => {
      dispatch(setCategoryFilter(value));
    },
    [dispatch]
  );

  const handleRatingChange = useCallback(
    (value) => {
      dispatch(setRatingFilter(value));
    },
    [dispatch]
  );

  const handleSortChange = useCallback(
    (value) => {
      dispatch(setSortOrder(value));
    },
    [dispatch]
  );

  const handleShowFavoritesChange = useCallback(
    (value) => {
      dispatch(setShowFavoritesOnly(value));
    },
    [dispatch]
  );

  const handleToggleFavorite = useCallback(
    (id) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch]
  );

  const handlePageChange = useCallback(
    (nextPage) => {
      dispatch(setCurrentPage(nextPage));
    },
    [dispatch]
  );

  return {
    categories,
    categoryFilter,
    currentPage,
    currentProducts,
    error,
    favorites,
    filteredProducts,
    handleCategoryChange,
    handlePageChange,
    handleRatingChange,
    handleShowFavoritesChange,
    handleSortChange,
    handleToggleFavorite,
    itemsPerPage,
    ratingFilter,
    showFavoritesOnly,
    sortOrder,
    status,
    totalPages
  };
}


export default useProductListing;
