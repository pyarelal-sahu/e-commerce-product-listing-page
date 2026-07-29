import { Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LABELS } from "../../../constants/labels";

/**
 * Empty state shown when no results are available.
 *
 * @param {object} props Component props.
 * @param {boolean} props.isFavoritesFilter Whether the current view is filtered by favorites.
 * @returns {JSX.Element} Rendered empty state.
 */
function EmptyState({ isFavoritesFilter }) {
  const { t } = useTranslation();

  const title = isFavoritesFilter
    ? t(LABELS.FAVORITES_EMPTY_TITLE)
    : t(LABELS.EMPTY_TITLE);
  const subtitle = isFavoritesFilter
    ? t(LABELS.FAVORITES_EMPTY_SUBTITLE)
    : t(LABELS.EMPTY_SUBTITLE);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        minHeight: "13rem",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        textAlign: "center",
        border: "0.0625rem dashed",
        borderColor: "border.main",
        backgroundColor: "surface.main",
        px: 2.5
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Typography color="text.secondary" variant="body2">
        {subtitle}
      </Typography>
    </Paper>
  );
}

EmptyState.propTypes = {
  isFavoritesFilter: PropTypes.bool.isRequired
};

export default EmptyState;
