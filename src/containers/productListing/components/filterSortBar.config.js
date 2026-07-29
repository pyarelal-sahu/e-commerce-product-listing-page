import { LABELS } from "../../../constants/labels";

/**
 * Builds config for the select-based filter fields.
 *
 * @param {object} params Builder params.
 * @param {string[]} params.categories Available product categories.
 * @param {string} params.categoryFilter Selected category filter.
 * @param {function} params.onCategoryChange Category change handler.
 * @param {function} params.onRatingChange Rating change handler.
 * @param {function} params.onSortChange Sort change handler.
 * @param {number} params.ratingFilter Selected rating filter.
 * @param {string} params.sortOrder Selected sort order.
 * @param {function} params.t Translation function.
 * @returns {Array<object>} Field configuration for filter controls.
 */
export function buildFilterFields({
  categories,
  categoryFilter,
  onCategoryChange,
  onRatingChange,
  onSortChange,
  ratingFilter,
  sortOrder,
  t
}) {
  const filterFieldWidth = { xs: "100%", sm: "10.5rem", lg: "13rem" };
  const fixedFieldWidthSx = {
    width: filterFieldWidth,
    minWidth: filterFieldWidth,
    maxWidth: filterFieldWidth,
    flex: { sm: "0 0 10.5rem", lg: "0 0 13rem" }
  };

  return [
    {
      formControlSx: fixedFieldWidthSx,
      id: "category-filter",
      label: t(LABELS.CATEGORY_FILTER_LABEL),
      labelId: "category-filter-label",
      onChange: onCategoryChange,
      options: [
        { label: t(LABELS.ALL_CATEGORIES), value: "all" },
        ...categories.map((category) => ({ label: category, value: category }))
      ],
      selectSx: { borderRadius: 1.5 },
      value: categoryFilter
    },
    {
      formControlSx: fixedFieldWidthSx,
      id: "rating-filter",
      label: t(LABELS.RATING_FILTER_LABEL),
      labelId: "rating-filter-label",
      onChange: (value) => onRatingChange(Number(value)),
      options: [
        { label: "0+ ★", value: 0 },
        { label: "3+ ★", value: 3 },
        { label: "3.5+ ★", value: 3.5 },
        { label: "4+ ★", value: 4 },
        { label: "4.5+ ★", value: 4.5 }
      ],
      selectSx: { borderRadius: 1.5 },
      value: ratingFilter
    },
    {
      formControlSx: fixedFieldWidthSx,
      id: "sort-order",
      label: t(LABELS.SORT_LABEL),
      labelId: "sort-order-label",
      onChange: onSortChange,
      options: [
        { label: t(LABELS.SORT_ASC), value: "asc" },
        { label: t(LABELS.SORT_DESC), value: "desc" }
      ],
      selectSx: { borderRadius: 1.5 },
      value: sortOrder
    }
  ];
}

/**
 * Builds config for meta fields (favorites toggle and results summary).
 *
 * @param {object} params Builder params.
 * @param {number} params.favoritesCount Favorite count.
 * @param {function} params.onFavoritesOnlyChange Favorites toggle handler.
 * @param {number} params.resultsCount Filtered result count.
 * @param {boolean} params.showFavoritesOnly Favorites-only state.
 * @param {function} params.t Translation function.
 * @returns {Array<object>} Field configuration for meta controls.
 */
export function buildMetaFields({
  favoritesCount,
  onFavoritesOnlyChange,
  resultsCount,
  showFavoritesOnly,
  t
}) {
  return [
    {
      checked: showFavoritesOnly,
      formControlLabelSx: { m: 0 },
      id: "favorites-only",
      label: `${t(LABELS.FAVORITES)} (${favoritesCount})`,
      labelSx: { fontWeight: 500, color: "text.secondary" },
      onChange: onFavoritesOnlyChange,
      type: "switch"
    },
    {
      dividerProps: { orientation: "vertical", flexItem: true },
      id: "meta-divider",
      sx: { display: { xs: "none", sm: "block" }, height: 20, my: "auto" },
      type: "divider"
    },
    {
      id: "results-count",
      sx: { fontWeight: 700, color: "text.disabled", whiteSpace: "nowrap" },
      text: `${resultsCount} ${t(LABELS.RESULTS)}`,
      type: "text",
      variant: "caption"
    }
  ];
}
