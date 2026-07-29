import { Box } from "@mui/material";
import PropTypes from "prop-types";

import ProductCard from "./ProductCard";

/**
 * Responsive product grid renderer.
 *
 * @param {object} props Component props.
 * @param {number[]} props.favorites Array of favorite product IDs.
 * @param {function} props.onToggleFavorite Callback for toggling favorite status.
 * @param {object[]} props.products Array of product data.
 * @returns {JSX.Element} Rendered grid.
 */
function ProductGrid({ favorites, onToggleFavorite, products }) {
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
    </Box>
  );
}

ProductGrid.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
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
