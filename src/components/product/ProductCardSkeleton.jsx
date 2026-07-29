import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";

/**
 * Skeleton loader for the ProductCard component.
 *
 * @returns {JSX.Element} Rendered skeleton card.
 */
function ProductCardSkeleton() {
  return (
    <Card
      className="h-full"
      elevation={0}
      sx={{
        border: "0.0625rem solid",
        borderColor: "border.main",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <Skeleton animation="wave" height="14rem" variant="rectangular" width="100%" />
      <CardContent>
        <Stack 
          direction="row" 
          spacing={1}
          sx={{ justifyContent: "space-between" }}
        >
          <Skeleton animation="wave" height="1.5rem" variant="rectangular" width="4rem" />
          <Skeleton animation="wave" height="1.5rem" variant="rectangular" width="3rem" />
        </Stack>

        <Box mt={1.25}>
          <Skeleton animation="wave" height="1.75rem" variant="text" width="80%" />
        </Box>

        <Box mt={0.8}>
          <Skeleton animation="wave" height="1.75rem" variant="text" width="40%" />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCardSkeleton;
