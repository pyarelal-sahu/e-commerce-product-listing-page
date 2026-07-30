import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { Button, Collapse, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { LABELS } from "../../../constants/labels";
import FilterControlsForm from "./FilterControlsForm";
import { buildFilterFields, buildMetaFields } from "./filterSortBar.config";

/**
 * Clean, subtle toolbar with filter and sort controls.
 *
 * @param {object} props Component props.
 * @param {string[]} props.categories List of available product categories.
 * @param {string} props.categoryFilter Currently selected category filter.
 * @param {function} props.onCategoryChange Callback for category filter change.
 * @param {function} props.onRatingChange Callback for rating filter change.
 * @param {function} props.onSortChange Callback for sort order change.
 * @param {number} props.ratingFilter Currently selected rating filter.
 * @param {number} props.resultsCount Count of filtered results.
 * @param {boolean} props.showFavoritesOnly Whether to show only favorites.
 * @param {string} props.sortOrder Currently selected sort order.
 * @param {boolean} props.isMobile Whether the view is on a mobile device.
 * @returns {JSX.Element} Rendered filter and sort bar.
 */
function FilterSortBar({
  categories,
  categoryFilter,
  onCategoryChange,
  onRatingChange,
  onSortChange,
  ratingFilter,
  resultsCount,
  showFavoritesOnly,
  sortOrder,
  isMobile
}) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const controlsGap = 1.5;

  const filterFields = buildFilterFields({
    categories,
    categoryFilter,
    onCategoryChange,
    onRatingChange,
    onSortChange,
    ratingFilter,
    sortOrder,
    t
  });

  const metaFields = buildMetaFields({
    resultsCount,
    t
  });

  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky",
        top: { xs: 64, sm: 72 },
        zIndex: (theme) => theme.zIndex.appBar - 1,
        overflow: "hidden",
        py: { xs: 1.5, sm: 2 },
        px: { xs: 1, sm: 1.25 },
        mb: 3,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        backdropFilter: "blur(8px)"
      }}
    >
      {isMobile ? (
        <Stack
          direction="row"
          sx={{
            mb: isExpanded ? 1 : 0,
            minHeight: 28,
            width: "100%",
            px: { xs: 0.5, sm: 1 },
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, color: "text.disabled", textTransform: "uppercase", lineHeight: 1 }}
          >
            {t(LABELS.FILTERS)}
          </Typography>
          <Button
            onClick={() => setIsExpanded((value) => !value)}
            size="small"
            variant="text"
            endIcon={isExpanded ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
            sx={{
              minWidth: "auto",
              px: 1,
              alignSelf: "center"
            }}
          >
            {isExpanded ? t(LABELS.COLLAPSE) : t(LABELS.EXPAND)}
          </Button>
        </Stack>
      ) : null}

      <Collapse in={isMobile ? isExpanded : true} timeout="auto" unmountOnExit>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={controlsGap}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            flexWrap: "wrap",
            gap: controlsGap
          }}
        >
          <FilterControlsForm
            fields={filterFields}
            spacing={controlsGap}
            sx={{
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "flex-start",
              flexWrap: "wrap",
              rowGap: controlsGap,
              columnGap: controlsGap
            }}
          />

          <FilterControlsForm
            direction={{ xs: "column", sm: "row" }}
            fields={metaFields}
            spacing={controlsGap}
            sx={{
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: { xs: "flex-start", sm: "flex-end" },
              flexWrap: "wrap"
            }}
          />
        </Stack>
      </Collapse>
    </Paper>
  );
}

FilterSortBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryFilter: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onRatingChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  ratingFilter: PropTypes.number.isRequired,
  resultsCount: PropTypes.number.isRequired,
  showFavoritesOnly: PropTypes.bool.isRequired,
  sortOrder: PropTypes.string.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default FilterSortBar;
