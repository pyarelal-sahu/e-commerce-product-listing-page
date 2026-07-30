import { Box, Button, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import PropTypes from "prop-types";

/**
 * Reusable form renderer for select-based filter controls.
 *
 * @param {object} props Component props.
 * @param {Array} props.fields Field configuration list.
 * @param {object} [props.sx] Stack styles.
 * @param {object} [props.direction] Stack direction.
 * @param {object} [props.spacing] Stack spacing.
 * @returns {JSX.Element} Rendered filter controls form.
 */
function FilterControlsForm({
  direction = { xs: "column", sm: "row" },
  fields,
  spacing = 1.5,
  sx
}) {
  const renderOptionLabel = (field, option) => {
    const labelText = String(option.label ?? "");

    if (field.id === "rating-filter" && labelText.includes("★")) {
      const [valueLabel] = labelText.split("★");

      return (
        <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.55 }}>
          <Typography
            component="span"
            sx={{
              minWidth: "3.3ch",
              textAlign: "left",
              fontVariantNumeric: "tabular-nums",
              fontFeatureSettings: '"tnum" 1'
            }}
          >
            {valueLabel.trim()}
          </Typography>
          <Typography component="span" sx={{ lineHeight: 1 }}>
            ★
          </Typography>
        </Box>
      );
    }

    return option.label;
  };

  const renderField = (field) => {
    if (field.type === "switch") {
      return (
        <FormControlLabel
          key={field.id}
          sx={field.formControlLabelSx}
          control={
            <Switch
              checked={field.checked}
              color={field.color ?? "secondary"}
              onChange={(event) => field.onChange(event.target.checked)}
              size={field.size ?? "small"}
            />
          }
          label={
            <Typography sx={field.labelSx} variant={field.labelVariant ?? "body2"}>
              {field.label}
            </Typography>
          }
        />
      );
    }

    if (field.type === "divider") {
      return <Divider key={field.id} {...field.dividerProps} sx={field.sx} />;
    }

    if (field.type === "text") {
      return (
        <Typography key={field.id} variant={field.variant ?? "caption"} sx={field.sx}>
          {field.text}
        </Typography>
      );
    }

    if (field.type === "button") {
      const startIcon =
        field.startIcon === "favoriteBorder"
          ? <FavoriteBorderRoundedIcon fontSize="small" />
          : field.startIcon;

      return (
        <Button
          key={field.id}
          onClick={field.onClick}
          startIcon={startIcon}
          sx={field.sx}
          variant={field.variant ?? "outlined"}
        >
          {field.label}
        </Button>
      );
    }

    return (
      <FormControl key={field.id} size="small" sx={field.formControlSx}>
        <InputLabel id={field.labelId}>{field.label}</InputLabel>
        <Select
          label={field.label}
          labelId={field.labelId}
          onChange={(event) => field.onChange(event.target.value)}
          value={field.value}
          sx={field.selectSx}
        >
          {field.options.map((option) => (
            <MenuItem
              key={String(option.value)}
              value={option.value}
              sx={field.id === "rating-filter" ? { fontVariantNumeric: "tabular-nums", fontFeatureSettings: '"tnum" 1' } : undefined}
            >
              {renderOptionLabel(field, option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Stack direction={direction} spacing={spacing} sx={sx}>
      {fields.map(renderField)}
    </Stack>
  );
}

FilterControlsForm.propTypes = {
  direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      color: PropTypes.string,
      dividerProps: PropTypes.object,
      formControlSx: PropTypes.object,
      formControlLabelSx: PropTypes.object,
      id: PropTypes.string.isRequired,
      label: PropTypes.node,
      labelId: PropTypes.string,
      labelSx: PropTypes.object,
      labelVariant: PropTypes.string,
      onChange: PropTypes.func,
      onClick: PropTypes.func,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.node.isRequired,
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
        })
      ),
      selectSx: PropTypes.object,
      size: PropTypes.string,
      sx: PropTypes.object,
      text: PropTypes.node,
      type: PropTypes.oneOf(["select", "switch", "divider", "text", "button"]),
      startIcon: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    })
  ).isRequired,
  spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  sx: PropTypes.object
};

export default FilterControlsForm;