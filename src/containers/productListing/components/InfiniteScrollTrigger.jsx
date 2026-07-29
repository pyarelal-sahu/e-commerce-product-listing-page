import { Box, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { LABELS } from "../../../constants/labels";

/**
 * Sentinel component that requests more items when it enters the viewport.
 *
 * @param {object} props Component props.
 * @param {boolean} props.hasMore Whether there are more items to load.
 * @param {boolean} props.isActive Whether the infinite scroll is active.
 * @param {function} props.onLoadMore Callback to load more items.
 * @returns {JSX.Element|null} Rendered infinite scroll trigger.
 */
function InfiniteScrollTrigger({ hasMore, isActive, onLoadMore }) {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!isActive || !hasMore || !sentinelRef.current) {
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
  }, [hasMore, isActive, onLoadMore]);

  if (!isActive || !hasMore) {
    return null;
  }

  return (
    <Box ref={sentinelRef} sx={{ position: "relative", width: "100%", pt: "100%", overflow: "hidden" }}>
      <Skeleton
        animation="wave"
        height="100%"
        sx={{ position: "absolute", top: 0, left: 0 }}
        variant="rectangular"
        width="100%"
      />
    </Box>
  );
}

InfiniteScrollTrigger.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired
};

export default InfiniteScrollTrigger;
