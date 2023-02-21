import { Construction } from '@mui/icons-material';
import { Box, Stack, Typography } from '@pankod/refine-mui';

/**
 * Under Construction Page
 */
const UnderConstruction = () => (
  <Box component="div">
    <Stack direction="row" spacing={2} justifyContent="flex-start" alignItems="center">
      <Construction fontSize="large" sx={{ color: "#475be8" }} />
      <Typography variant="h6" fontSize={18} fontWeight={600}>Under Construction</Typography>
    </Stack>
  </Box>
);

export default UnderConstruction;