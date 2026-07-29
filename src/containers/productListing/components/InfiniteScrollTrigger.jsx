import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import ProductCardSkeleton from "../../../components/product/ProductCardSkeleton";

/**
 * Sentinel component that requests more items when it enters the viewport.
 *
 * @param {object} props Component props.
 * @param {boolean} props.hasMore Whether there are more items to load.
 * @param {boolean} props.isActive Whether the infinite scroll is active.
 * @param {boolean} props.isLoadingMore Whether the next page is currently loading.
 * @param {function} props.onLoadMore Callback to load more items.
 * @returns {JSX.Element|null} Rendered infinite scroll trigger.
 */
function InfiniteScrollTrigger({ hasMore, isActive, isLoadingMore, onLoadMore }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!isActive || !hasMore || isLoadingMore || !sentinelRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: "160px 0px"
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isActive, isLoadingMore, onLoadMore]);

  if (!isActive || !hasMore) {
    return null;
  }

  return (
    <Box sx={{ mt: 1.5 }}>
      {isLoadingMore ? (
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
          {Array.from({ length: 2 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </Box>
      ) : null}

      <Box ref={sentinelRef} sx={{ height: 1, width: "100%" }} />
    </Box>
  );
}

InfiniteScrollTrigger.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired
};

export default InfiniteScrollTrigger;
