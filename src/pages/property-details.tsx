// TODO : Implement Google Maps API for property location
// TODO : Add a link to the agents avatar that navigates them to their profile
// TODO : Populate agents phone number and location from db
// TODO : Add edit button to card to populate phone number and location details
// TODO : Implement functional rating system 

/* eslint-disable no-restricted-globals */
import { useMemo } from 'react';
import { useParams, useNavigate } from '@pankod/refine-react-router-v6';
import { useGetIdentity, useShow } from '@pankod/refine-core';
import { Typography, Box, Stack, DeleteButton, EditButton } from '@pankod/refine-mui';
import { ChatBubble, Delete, Edit, Phone, Place, Star } from '@mui/icons-material';

import { CustomButton, ErrorBox, Spinner } from 'components';
import { checkImage } from 'utils';
import { ratings } from 'constants/index';

/**
 * Property Details Page
 */
const PropertyDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { id } = useParams();

  const { data, isLoading, isError } = queryResult;

  const propertyDetails = useMemo(
    () => data?.data ?? {},
    [data?.data]
  );

  const creatorAvatar = useMemo(
    () => checkImage(propertyDetails?.creator?.avatar)
      ? propertyDetails?.creator?.avatar
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    [propertyDetails?.creator?.avatar]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorBox />;

  const isCurrentUser = user?.email === propertyDetails?.creator?.email;

  // const handleDeleteProperty = () => {
  //   const response = confirm('Are you sure you want to delete this property?');
  //   if (response) {
  //     mutate({
  //       resource: 'properties',
  //       id: id as string,
  //     }, {
  //       onSuccess: () => {
  //         navigate('/properties');
  //       },
  //     });
  //   }
  // };

  return (
    <Box borderRadius="15px" padding="20px" bgcolor="#FCFCFC" width="fit-content">
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Details
      </Typography>
      <Box mt="20px" display="flex" flexDirection={{ xs: 'column', lg: 'row' }} gap={4}>
        <Box flex={1} maxWidth={764}>
          <Box
            component="img"
            src={propertyDetails?.photo}
            alt="property_details-img"
            height={546}
            sx={{ objectFit: 'cover', borderRadius: '10px' }}
            className="property_details-img"
          />
          <Box mt="15px">
            <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
              <Typography fontSize={18} fontWeight={500} color="#11142D" textTransform="capitalize">
                {propertyDetails?.propertyType}
              </Typography>
              <Box>
                {ratings.map((item) => (
                  <Star key={`star-${item}`} sx={{ color: '#F2C94C' }} />
                ))}
              </Box>
            </Stack>
            <Stack direction="row" flexWrap="wrap" justifyContent="space-between" alignItems="center" gap={2}>
              <Box>
                <Typography fontSize={22} fontWeight={600} mt="10px" color="#11142D">
                  {propertyDetails?.title}
                </Typography>
                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                  <Place sx={{ color: '#808191' }} />
                  <Typography fontSize={14} color="#808191">
                    {propertyDetails?.location}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography fontSize={16} fontWeight={600} mt="10px" color="#11142D">
                  Price
                </Typography>
                <Stack direction="row" alignItems="flex-end" gap={1}>
                  <Typography fontSize={25} fontWeight={700} color="#475BE8">
                    ${propertyDetails?.price}
                  </Typography>
                  <Typography fontSize={14} color="#808191" mb={0.5}>
                    for one day
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack mt="25px" direction="column" gap="10px">
              <Typography fontSize={18} color="#11142D">
                Description
              </Typography>
              <Typography fontSize={14} color="#808191">
                {propertyDetails?.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
        <Box width="100%" flex={1} maxWidth={326} display="flex" flexDirection="column" gap="20px">
          <Stack
            width="100%"
            p={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            border="1px solid #E4E4E4"
            borderRadius={2}
          >
            <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
              <Box
                component="img"
                src={creatorAvatar}
                alt="avatar"
                width={90}
                height={90}
                sx={{ borderRadius: '100%', objectFit: 'cover' }}
              />
              <Box mt="15px">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                  {propertyDetails?.creator?.name}
                </Typography>
                <Typography mt="5px" fontSize={14} fontWeight={400} color="#808191">
                  Agent
                </Typography>
              </Box>
              <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                <Place sx={{ color: '#808191' }} />
                <Typography fontSize={14} fontWeight={400} color="#808191">
                  Connecticut, USA
                </Typography>
              </Stack>
              <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">
                {propertyDetails?.creator?.allProperties?.length} Properties
              </Typography>
            </Stack>
            <Stack width="100%" mt="25px" direction="row" flexWrap="wrap" justifyContent="space-evenly" gap={2}>
              {isCurrentUser ? (
                <EditButton
                  variant='contained'
                  size="medium"
                  recordItemId={id}
                  title={!isCurrentUser ? 'Message' : 'Edit'}
                  disableElevation
                  startIcon={!isCurrentUser ? <ChatBubble /> : <Edit />}
                  fullWidth
                  sx={{
                    flex: 1,
                    padding: "10px 15px",
                    width: "100%",
                    minWidth: 130,
                    backgroundColor: "#475BE8",
                    color: "#FCFCFC",
                    fontSize: 16,
                    fontWeight: 600,
                    gap: "10px",
                    textTransform: "capitalize",
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: "#475BE8",
                    }
                  }}
                  onClick={() => {
                    if (isCurrentUser) {
                      navigate(`/properties/edit/${propertyDetails?._id}`);
                    }
                  }}
                />
              ) : (
                <CustomButton
                  title={'Message'}
                  backgroundColor="#475BE8"
                  color="#FCFCFC"
                  fullWidth
                  icon={<ChatBubble />}
                  handleClick={() => {
                    if (isCurrentUser) {
                      navigate(`/properties/edit/${propertyDetails?._id}`);
                    }
                  }}
                />
              )}
              {isCurrentUser ? (
                <DeleteButton
                  variant='contained'
                  size="medium"
                  resourceNameOrRouteName="properties"
                  recordItemId={id}
                  title={'Delete'}
                  confirmTitle="Are you sure you want to delete this property?"
                  confirmOkText="Yes"
                  confirmCancelText="No"
                  disableElevation
                  startIcon={<Delete />}
                  fullWidth
                  sx={{
                    flex: 1,
                    padding: "10px 15px",
                    width: "100%",
                    minWidth: 130,
                    backgroundColor: '#d42e2e',
                    color: "#FCFCFC",
                    fontSize: 16,
                    fontWeight: 600,
                    gap: "10px",
                    textTransform: "capitalize",
                    "&:hover": {
                      opacity: 0.9,
                      backgroundColor: '#d42e2e',
                    }
                  }}
                  onSuccess={() => {
                    navigate('/properties');
                  }} />
              ) : (
                <CustomButton
                  title={'Call'}
                  backgroundColor={'#2ED480'}
                  color="#FCFCFC"
                  fullWidth
                  icon={<Phone />}
                  handleClick={() => {
                    // if (isCurrentUser) handleDeleteProperty();
                  }}
                />
              )}
            </Stack>
          </Stack>
          <Stack>
            <Box
              component="img"
              src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
              width="100%"
              height={306}
              sx={{ borderRadius: 10, objectFit: 'cover' }}
            />
          </Stack>
          <Box>
            <CustomButton
              title="Book Now"
              backgroundColor="#475BE8"
              color="#FCFCFC"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;