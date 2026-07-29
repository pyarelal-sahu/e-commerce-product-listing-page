import { alpha, Pagination, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LABELS } from "../../../constants/labels";

/**
 * Paginated navigation controls.
 *
 * @param {object} props Component props.
 * @param {number} props.currentPage Currently selected page number.
 * @param {function} props.onPageChange Callback for page change.
 * @param {number} props.totalPages Total number of pages available.
 * @returns {JSX.Element} Rendered pagination.
 */
function PaginationControls({ currentPage, onPageChange, totalPages }) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  return (
    <Stack 
      spacing={2} 
      sx={{ 
        pt: 4, 
        pb: 4,
        alignItems: "center"
      }}
    >
      <Pagination
        color="primary"
        count={totalPages}
        onChange={(_, nextPage) => onPageChange(nextPage)}
        page={currentPage}
        shape="rounded"
      />
      <Typography color="text.secondary" variant="caption" sx={{ fontWeight: 600 }}>
        {t(LABELS.PAGE)} {currentPage} of {totalPages}
      </Typography>
    </Stack>
  );
}

PaginationControls.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default PaginationControls;
