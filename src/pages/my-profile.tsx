import { useMemo } from "react";
import { useGetIdentity, useOne } from "@pankod/refine-core";

import { ErrorBox, Profile, Spinner } from 'components';

/**
 * Current User Profile
 */
const MyProfile = () => {
  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userid,
  });

  const myProfile = useMemo(
    () => data?.data ?? {},
    [data?.data]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBox />;
  return (
    <Profile
      type="My"
      name={myProfile?.name}
      email={myProfile?.email}
      avatar={myProfile?.avatar}
      properties={myProfile?.allProperties}
    />
  );
};

export default MyProfile;