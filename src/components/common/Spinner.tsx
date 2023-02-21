import { Box, CircularProgress } from '@pankod/refine-mui';

/**
 * Loading Spinner
 */
const Spinner = () => (
    <Box component="div">
        <CircularProgress sx={{ color: "#475BE8" }} />
    </Box>
);

export default Spinner;