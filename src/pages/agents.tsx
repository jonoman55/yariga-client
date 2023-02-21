import { useMemo } from 'react';
import { useList } from '@pankod/refine-core';
import { Box, Typography } from '@pankod/refine-mui';

import { AgentCard, ErrorBox, Spinner } from 'components';

/**
 * Agents Page
 */
const Agents = () => {
  const { data, isLoading, isError } = useList({
    resource: 'users'
  });

  const allAgents = useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBox />;
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Agents List
      </Typography>
      <Box
        mt="20px"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          backgroundColor: '#fcfcfc'
        }}
      >
        {allAgents?.map((agent) => (
          <AgentCard
            key={agent?._id}
            id={agent?._id}
            name={agent?.name}
            email={agent?.email}
            avatar={agent?.avatar}
            noOfProperties={agent?.allProperties?.length}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Agents;