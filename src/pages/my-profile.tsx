import { useGetIdentity, useOne } from "@pankod/refine-core";
import { Box } from "@pankod/refine-mui";

import { Profile } from 'components';

/**
 * Current User Profile
 */
const MyProfile = () => {
  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Box>Loading...</Box>
  if (isError) return <Box>Error...</Box>
  return (
    <Profile
      type="My"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default MyProfile;