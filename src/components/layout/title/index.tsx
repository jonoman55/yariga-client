import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Box, Button } from "@pankod/refine-mui";

import { logo, yariga } from "assets";

/**
 * Sidebar Title Image
 */
export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();
  return (
    <Button fullWidth variant="text" disableRipple sx={{
      bgcolor: 'inherit',
      '&:hover': {
        bgcolor: 'transparent',
      },
    }}>
      <Link to="/">
        {collapsed ? (
          <Box component="img" src={logo} alt="Yariga" width="28px" />
        ) : (
          <Box component="img" src={yariga} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};