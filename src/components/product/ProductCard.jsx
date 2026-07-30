import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import LazyImage from "../common/LazyImage";
import { LABELS } from "../../constants/labels";
import { fadeSlideUp, getStaggerDelay } from "../../utilities/motionTokens";

/**
 * Product card component with favorite actions.
 *
 * @param {object} props Component props.
 * @param {number} [props.animationIndex=0] Index for staggered animation.
 * @param {boolean} props.isFavorite Whether the product is marked as favorite.
 * @param {function} props.onToggleFavorite Callback for toggling favorite status.
 * @param {object} props.product Product data.
 * @returns {JSX.Element} Rendered product card.
 */
function ProductCard({ animationIndex = 0, isFavorite, onToggleFavorite, product }) {
  const { t } = useTranslation();
  const favoriteAriaLabel = isFavorite ? t(LABELS.REMOVE_FAVORITE) : t(LABELS.ADD_FAVORITE);
  const entryDelay = getStaggerDelay(animationIndex, 90, 720);

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        overflow: "hidden",
        opacity: 0,
        animation: `${fadeSlideUp} 380ms cubic-bezier(0.22, 1, 0.36, 1) ${entryDelay} forwards`,
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          opacity: 1,
          transform: "none"
        },
        transition: "box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderColor: "rgba(15, 23, 42, 0.18)",
          "& .product-card-image": {
            transform: "scale(1.04)",
            filter: "saturate(1.02)"
          }
        }
      }}
    >
      <Box
        sx={{
          position: "relative",
          pt: { xs: "78%", sm: "100%" },
          overflow: "hidden",
          bgcolor: "grey.50"
        }}
      >
        <Box
          className="product-card-image"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "transform 0.45s cubic-bezier(0.4, 0, 0.2, 1), filter 0.45s ease"
          }}
        >
          <LazyImage
            alt={product.name}
            className="h-full w-full object-cover"
            errorLabel={t(LABELS.IMAGE_UNAVAILABLE)}
            src={product.image}
          />
        </Box>
        
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(product.id);
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.9)",
            color: isFavorite ? "secondary.main" : "text.secondary",
            "&:hover": {
              bgcolor: "white",
            }
          }}
          size="small"
        >
          {isFavorite ? (
            <FavoriteRoundedIcon fontSize="small" />
          ) : (
            <FavoriteBorderRoundedIcon fontSize="small" />
          )}
        </IconButton>
      </Box>

      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Stack 
          direction="row" 
          mb={0.75}
          sx={{ 
            justifyContent: "space-between", 
            alignItems: "center" 
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 600, color: "text.disabled", textTransform: "uppercase", fontSize: { xs: "0.65rem", sm: "0.75rem" } }}>
            {product.category}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <StarRoundedIcon sx={{ color: "warning.main", fontSize: 16 }} />
            <Typography variant="caption" fontWeight={700}>
              {product.rating.toFixed(1)}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            mb: 0.75,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.25,
            fontSize: { xs: "0.95rem", sm: "1rem" }
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="h6" color="primary.main" sx={{ mt: "auto", fontWeight: 700, fontSize: { xs: "1.1rem", sm: "1.25rem" } }}>
          ${product.price.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  animationIndex: PropTypes.number,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  product: PropTypes.shape({
    category: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired
};

export default ProductCard;
