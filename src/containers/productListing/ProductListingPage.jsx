import { Alert, Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ProductGrid from "../../components/product/ProductGrid";
import ProductCardSkeleton from "../../components/product/ProductCardSkeleton";
import EmptyState from "./components/EmptyState";
import FilterSortBar from "./components/FilterSortBar";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import PaginationControls from "./components/PaginationControls";
import useProductListing from "./hooks/useProductListing";
import { LABELS } from "../../constants/labels";

/**
 * Main product listing page.
 *
 * @returns {JSX.Element} Rendered product listing experience.
 */
function ProductListingPage() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 599.95px)").matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 599.95px)");

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const {
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
  } = useProductListing();

  return (
    <Box sx={{ pb: 6, pt: 4, minHeight: "100vh", bgcolor: "grey.50" }}>
      <Container maxWidth="xl">
        <Stack
          spacing={1}
          sx={{ 
            mb: 3, 
            textAlign: "center",
            alignItems: "center"
          }}
        >
          <Typography 
            variant="h4"
            sx={{ 
              fontWeight: 800,
              color: "text.primary",
              letterSpacing: "-0.01em"
            }}
          >
            {t(LABELS.PAGE_TITLE)}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 500 }}>
            {t(LABELS.PAGE_SUBTITLE)}
          </Typography>
        </Stack>

        <FilterSortBar
          categories={categories}
          categoryFilter={categoryFilter}
          favoritesCount={favorites.length}
          onCategoryChange={handleCategoryChange}
          onFavoritesOnlyChange={handleShowFavoritesChange}
          onRatingChange={handleRatingChange}
          onSortChange={handleSortChange}
          ratingFilter={ratingFilter}
          resultsCount={filteredProducts.length}
          showFavoritesOnly={showFavoritesOnly}
          sortOrder={sortOrder}
          isMobile={isMobile}
        />

        {status === "loading" ? (
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(4, minmax(0, 1fr))"
              }
            }}
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </Box>
        ) : null}

        {status === "failed" ? (
          <Alert severity="error" sx={{ mb: "1rem" }}>
            {t(LABELS.ERROR_LOADING)} {error}
          </Alert>
        ) : null}

        {status === "succeeded" && currentProducts.length > 0 ? (
          <>
            {isMobile ? (
              <ProductGrid
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                products={filteredProducts.slice(0, currentPage * itemsPerPage)}
              />
            ) : (
            <ProductGrid
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              products={currentProducts}
            />
            )}

            {isMobile ? (
              <InfiniteScrollTrigger
                hasMore={currentPage < totalPages}
                isActive
                onLoadMore={() => handlePageChange(currentPage + 1)}
              />
            ) : (
              <PaginationControls
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            )}
          </>
        ) : null}

        {status === "succeeded" && currentProducts.length === 0 ? (
          <EmptyState isFavoritesFilter={showFavoritesOnly} />
        ) : null}
      </Container>
    </Box>
  );
}

export default ProductListingPage;
