import { useMemo } from "react";
import { Link } from "@pankod/refine-react-router-v6";
import { useGetIdentity } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { EmailOutlined, LocationCity, Phone, Place } from "@mui/icons-material";

import { AgentCardProp, InfoBarProps } from "interfaces/agent";
import { Image } from "components";
import { checkImage } from "utils";

/**
 * Info Bar
 */
const InfoBar = ({ icon, name }: InfoBarProps) => (
  <Stack flex={1} minWidth={{ xs: "100%", sm: 300 }} gap={1.5} direction="row">
    {icon}
    <Typography fontSize={14} color="#808191">
      {name}
    </Typography>
  </Stack>
);

/**
 * Agent Card
 */
const AgentCard = ({ id, name, email, avatar, noOfProperties }: AgentCardProp) => {
  const { data: currentUser } = useGetIdentity();

  const generateLink = () => {
    if (currentUser?.email === email) return "/my-profile";
    return `/agents/show/${id}`;
  };

  const userAvatar = useMemo(
    () => checkImage(avatar)
      ? avatar
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    [avatar]
  );

  return (
    <Box
      component={Link}
      to={generateLink()}
      width="100%"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: "20px",
        padding: "20px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(176,176,176,0.1)",
        },
      }}
    >
      {/* New Image Component */}
      <Image
        src={userAvatar}
        placeholderImg={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"}
        alt="user"
        width={90}
        height={90}
        style={{ borderRadius: "8rem", objectFit: "cover" }}
      />
      {/* Old Image Component */}
      {/* <Box
        component="img"
        src={userAvatar}
        alt="user"
        width={90}
        height={90}
        sx={{ borderRadius: 8, objectFit: "cover" }}
      /> */}
      <Stack direction="column" justifyContent="space-between" flex={1} gap={{ xs: 4, sm: 2 }}>
        <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
          <Typography fontSize={22} fontWeight={600} color="#11142d">
            {name}
          </Typography>
          <Typography fontSize={14} color="#808191">
            Real-Estate Agent
          </Typography>
        </Stack>
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
          <InfoBar
            icon={<EmailOutlined sx={{ color: "#808191" }} />}
            name={email}
          />
          <InfoBar
            icon={<Place sx={{ color: "#808191" }} />}
            name="United States"
          />
          <InfoBar
            icon={<Phone sx={{ color: "#808191" }} />}
            name="+1-800-555-1234"
          />
          <InfoBar
            icon={<LocationCity sx={{ color: "#808191" }} />}
            name={`${noOfProperties} Properties`}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default AgentCard;