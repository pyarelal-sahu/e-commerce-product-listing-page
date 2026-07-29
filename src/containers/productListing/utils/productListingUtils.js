/**
 * Builds a sorted list of unique categories.
 *
 * @param {Array} products Full product list.
 * @returns {Array<string>} Category list.
 */
export function getCategoryOptions(products) {
  const categories = new Set(products.map((product) => product.category));

  return Array.from(categories).sort((left, right) => left.localeCompare(right));
}

/**
 * Filters products and applies sort order.
 *
 * @param {Array} products Full product list.
 * @param {string} categoryFilter Active category filter.
 * @param {number} ratingFilter Active minimum rating filter.
 * @param {string} sortOrder Active sort order.
 * @param {Array<number>} favoriteIds Favorite product ids.
 * @param {boolean} showFavoritesOnly Whether to show favorites only.
 * @returns {Array} Processed products.
 */
export function getFilteredAndSortedProducts(
  products,
  categoryFilter,
  ratingFilter,
  sortOrder,
  favoriteIds,
  showFavoritesOnly
) {
  const filteredProducts = products.filter((product) => {
    const categoryPass = categoryFilter === "all" || product.category === categoryFilter;
    const ratingPass = product.rating >= ratingFilter;
    const favoritePass = !showFavoritesOnly || favoriteIds.includes(product.id);

    return categoryPass && ratingPass && favoritePass;
  });

  return [...filteredProducts].sort((left, right) => {
    if (sortOrder === "asc") {
      return left.price - right.price;
    }

    return right.price - left.price;
  });
}

/**
 * Paginates a list of products.
 *
 * @param {Array} products Processed product list.
 * @param {number} currentPage Active page.
 * @param {number} itemsPerPage Page size.
 * @returns {Array} Current page products.
 */
export function getPaginatedProducts(products, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return products.slice(startIndex, endIndex);
}

/**
 * Calculates total page count.
 *
 * @param {number} totalItems Count of filtered products.
 * @param {number} itemsPerPage Page size.
 * @returns {number} Page count.
 */
export function getTotalPages(totalItems, itemsPerPage) {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}
