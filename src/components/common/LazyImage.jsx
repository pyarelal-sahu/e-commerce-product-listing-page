import { useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Generic lazy-loaded image component with skeleton loader and error fallback.
 *
 * @param {object} props Component props.
 * @param {string} props.alt Alt text for the image.
 * @param {string} [props.className] Optional CSS class names.
 * @param {string} [props.errorLabel] Fallback text for image failures.
 * @param {string} props.src Image source URL.
 * @returns {JSX.Element} Rendered image.
 */
function LazyImage({ alt, className = "", errorLabel = "Image unavailable", src }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <Box className="relative h-full w-full">
      {!isLoaded && !hasError && (
        <Skeleton
          animation="wave"
          height="100%"
          sx={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
          variant="rectangular"
          width="100%"
        />
      )}

      {hasError ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "surface.muted",
            p: 4,
            textAlign: "center"
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500
            }}
          >
            {errorLabel}
          </Typography>
        </Box>
      ) : (
        <img
          alt={alt}
          className={`${className} ${!isLoaded ? "invisible" : "visible"}`}
          loading="lazy"
          onError={() => setHasError(true)}
          onLoad={() => setIsLoaded(true)}
          src={src}
        />
      )}
    </Box>
  );
}

LazyImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  errorLabel: PropTypes.string,
  src: PropTypes.string.isRequired
};

export default LazyImage;
