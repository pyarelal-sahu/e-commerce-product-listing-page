import { Box } from "@mui/material";
import PropTypes from "prop-types";

import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

/**
 * Responsive product grid renderer.
 *
 * @param {object} props Component props.
 * @param {number[]} props.favorites Array of favorite product IDs.
 * @param {boolean} [props.isLoadingMore=false] Whether additional page items are loading.
 * @param {number} [props.loadingSkeletonCount=0] Number of skeleton cards to append.
 * @param {function} props.onToggleFavorite Callback for toggling favorite status.
 * @param {object[]} props.products Array of product data.
 * @returns {JSX.Element} Rendered grid.
 */
function ProductGrid({ favorites, isLoadingMore = false, loadingSkeletonCount = 0, onToggleFavorite, products }) {
  return (
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
      {products.map((product, index) => (
        <ProductCard
          animationIndex={index}
          isFavorite={favorites.includes(product.id)}
          key={product.id}
          onToggleFavorite={onToggleFavorite}
          product={product}
        />
      ))}

      {isLoadingMore
        ? Array.from({ length: loadingSkeletonCount }).map((_, index) => (
            <ProductCardSkeleton key={`loading-skeleton-${index}`} />
          ))
        : null}

      {isLoadingMore ? (
        <Box
          data-testid="mobile-load-more-spinner"
          sx={{
            display: "flex",
            gridColumn: "1 / -1",
            justifyContent: "center",
            alignItems: "center",
            pt: 0.75,
            pb: 1.5
          }}
        >
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              border: "2.5px solid",
              borderColor: "rgba(79, 70, 229, 0.18)",
              borderTopColor: "primary.main",
              animation: "spin 0.8s linear infinite",
              "@keyframes spin": {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" }
              }
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
}

ProductGrid.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  isLoadingMore: PropTypes.bool,
  loadingSkeletonCount: PropTypes.number,
  onToggleFavorite: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ProductGrid;
