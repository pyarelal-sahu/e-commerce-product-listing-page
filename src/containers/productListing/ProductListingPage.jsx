import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import { Alert, AppBar, Box, Button, Container, Switch, Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
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
 * @param {object} props Component props.
 * @param {boolean} props.isDarkMode Whether dark mode is enabled.
 * @param {function} props.onToggleTheme Callback for toggling theme mode.
 * @returns {JSX.Element} Rendered product listing experience.
 */
function ProductListingPage({ isDarkMode, onToggleTheme }) {
  const { t } = useTranslation();
  const loadMoreTimeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 599.95px)").matches;
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  useEffect(() => {
    return () => {
      if (loadMoreTimeoutRef.current) {
        clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, []);

  const mobileVisibleCount = currentPage * itemsPerPage;
  const mobileRemainingCount = Math.max(0, filteredProducts.length - mobileVisibleCount);
  const mobileLoadingSkeletonCount = Math.min(itemsPerPage, Math.max(4, mobileRemainingCount));

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || currentPage >= totalPages) {
      return;
    }

    setIsLoadingMore(true);
    loadMoreTimeoutRef.current = setTimeout(() => {
      handlePageChange(currentPage + 1);
      loadMoreTimeoutRef.current = setTimeout(() => {
        setIsLoadingMore(false);
        loadMoreTimeoutRef.current = null;
      }, 300);
    }, 500);
  }, [currentPage, handlePageChange, isLoadingMore, totalPages]);

  useEffect(() => {
    if (!isMobile || currentPage >= totalPages) {
      return undefined;
    }

    const triggerThreshold = 900;

    const handleScroll = () => {
      const scrollElement = document.documentElement;
      const distanceToBottom = scrollElement.scrollHeight - (window.innerHeight + window.scrollY);

      if (distanceToBottom <= triggerThreshold) {
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const pollId = window.setInterval(handleScroll, 250);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearInterval(pollId);
    };
  }, [currentPage, handleLoadMore, isMobile, totalPages]);

  return (
    <Box sx={{ pb: 6, minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          top: 0,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "rgba(15, 23, 42, 0.9)" : "rgba(255,255,255,0.92)"),
          backdropFilter: "blur(8px)"
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 56, sm: 60 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", letterSpacing: "-0.01em" }}>
              {t(LABELS.PAGE_TITLE)}
            </Typography>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 999,
                  px: 0.45,
                  py: 0.3,
                  bgcolor: "background.paper"
                }}
              >

                <Switch
                  checked={isDarkMode}
                  onChange={onToggleTheme}
                  slotProps={{ input: { "aria-label": t(LABELS.TOGGLE_THEME) } }}
                  size="small"
                  icon={
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "#ffffff"
                      }}
                    >
                      <LightModeRoundedIcon sx={{ fontSize: 13, color: "warning.main" }} />
                    </Box>
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "#ffffff"
                      }}
                    >
                      <DarkModeRoundedIcon sx={{ fontSize: 13, color: "primary.main" }} />
                    </Box>
                  }
                  sx={{
                    width: 54,
                    height: 30,
                    p: 0,
                    mx: 0.1,
                    "& .MuiSwitch-switchBase": {
                      p: 0.45,
                      transitionDuration: "260ms",
                      "&.Mui-checked": {
                        transform: "translateX(24px)",
                        color: "inherit",
                        "& + .MuiSwitch-track": {
                          bgcolor: "primary.light",
                          opacity: 1
                        }
                      },
                      "&.Mui-focusVisible .MuiSwitch-thumb": {
                        outline: "2px solid",
                        outlineColor: "primary.light",
                        outlineOffset: 2
                      }
                    },
                    "& .MuiSwitch-track": {
                      borderRadius: 999,
                      bgcolor: "rgba(148, 163, 184, 0.55)",
                      opacity: 1,
                      transition: "background-color 240ms ease, opacity 240ms ease"
                    }
                  }}
                />
              </Box>

              <Button
                onClick={() => handleShowFavoritesChange(!showFavoritesOnly)}
                startIcon={
                  showFavoritesOnly ? (
                    <FavoriteRoundedIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderRoundedIcon fontSize="small" />
                  )
                }
                sx={{
                  borderRadius: 3,
                  borderWidth: 1.5,
                  borderColor: showFavoritesOnly ? "secondary.main" : "divider",
                  color: showFavoritesOnly ? "secondary.main" : "text.secondary",
                  backgroundColor: showFavoritesOnly ? "action.selected" : "background.paper",
                  px: { xs: 1.25, sm: 1.75 },
                  py: 0.6,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: showFavoritesOnly ? "secondary.main" : "text.light",
                    backgroundColor: showFavoritesOnly ? "action.selected" : "action.hover"
                  }
                }}
                variant="outlined"
              >
                {t(LABELS.WISHLIST_ONLY)} ({favorites.length})
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl">
        <FilterSortBar
          categories={categories}
          categoryFilter={categoryFilter}
          onCategoryChange={handleCategoryChange}
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
                isLoadingMore={isLoadingMore}
                loadingSkeletonCount={mobileLoadingSkeletonCount}
                onToggleFavorite={handleToggleFavorite}
                products={filteredProducts.slice(0, mobileVisibleCount)}
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
                isLoadingMore={isLoadingMore}
                onLoadMore={handleLoadMore}
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

ProductListingPage.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired
};

export default ProductListingPage;
