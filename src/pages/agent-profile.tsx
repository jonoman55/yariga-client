import { useParams } from '@pankod/refine-react-router-v6';
import { useOne } from "@pankod/refine-core"
import { Box } from "@pankod/refine-mui";

import { Profile } from 'components';

/**
 * Agent Profile Page
 */
const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Box>Loading...</Box>
  if (isError) return <Box>Error...</Box>
  return (
    <Profile
      type="Agent"
      name={myProfile.name}
      email={myProfile.email}
      avatar={myProfile.avatar}
      properties={myProfile.allProperties}
    />
  );
};

export default AgentProfile;