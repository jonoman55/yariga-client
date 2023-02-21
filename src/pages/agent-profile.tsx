import { useMemo } from 'react';
import { useParams } from '@pankod/refine-react-router-v6';
import { useOne } from "@pankod/refine-core"

import { ErrorBox, Profile, Spinner } from 'components';

/**
 * Agent Profile Page
 */
const AgentProfile = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string
  });

  const myProfile = useMemo(
    () => data?.data ?? {},
    [data?.data]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBox />;
  return (
    <Profile
      type="Agent"
      name={myProfile?.name}
      email={myProfile?.email}
      avatar={myProfile?.avatar}
      properties={myProfile?.allProperties}
    />
  );
};

export default AgentProfile;