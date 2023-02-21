import { useMemo } from 'react';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { useTable } from '@pankod/refine-core';
import { Box, Stack, Typography, TextField, Select, MenuItem } from '@pankod/refine-mui';
import { Add } from '@mui/icons-material';

import { PropertyCard, CustomButton, Spinner, ErrorText } from 'components';
import { propertyTypes, pageCounts } from '../constants/index';

/**
 * Sort Order Type
 */
type SortOrder = "asc" | "desc" | undefined;

/**
 * Property Filter Type
 */
type PropertyFilter = {
  title: any;
  propertyType: any;
};

/**
 * All Properties Page
 */
const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProperties = useMemo(
    () => data?.data ?? [],
    [data?.data]
  );

  const currentPrice = useMemo<SortOrder>(
    () => sorter.find((item) => item.field === 'price')?.order,
    [sorter]
  );

  const toggleSort = (field: string) => {
    setSorter([{
      field,
      order: currentPrice === 'asc'
        ? 'desc'
        : 'asc'
    }]);
  };

  const currentFilterValues = useMemo<PropertyFilter>(() => {
    const logicalFilters = filters?.flatMap(
      (item) => ('field' in item ? item : [])
    );
    const title = logicalFilters?.find((item) => item.field === 'title')?.value || '';
    const propertyType = logicalFilters?.find((item) => item.field === 'propertyType')?.value || '';
    return { title, propertyType };
  }, [filters]);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorText />;
  return (
    <Box component="div">
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length ? 'There are no properties' : 'All Properties'}
          </Typography>
          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={2} flexWrap="wrap" mb={{ xs: '20px', sm: 0 }}>
              <CustomButton
                title={`Sort price ${currentPrice === 'asc' ? '↑' : '↓'}`}
                handleClick={() => toggleSort('price')}
                backgroundColor="#475be8"
                color="#fcfcfc"
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues?.title}
                onChange={(e) => {
                  setFilters([{
                    field: 'title',
                    operator: 'contains',
                    value: e.currentTarget.value
                      ? e.currentTarget.value
                      : undefined
                  }]);
                }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue=""
                value={currentFilterValues?.propertyType}
                onChange={(e) => {
                  setFilters([{
                    field: 'propertyType',
                    operator: 'eq',
                    value: e.target.value
                  }], 'replace');
                }}
              >
                <MenuItem value="">All</MenuItem>
                {propertyTypes.map((type: string, idx: number) => (
                  <MenuItem key={idx} value={type.toLowerCase()}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <CustomButton
          title="Add Property"
          handleClick={() => navigate('/properties/create')}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <Box mt="20px" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {allProperties?.map((property) => (
          <PropertyCard
            key={property?._id}
            id={property?._id}
            title={property?.title}
            location={property?.location}
            price={property?.price}
            photo={property?.photo}
          />
        ))}
      </Box>
      {allProperties?.length > 0 && (
        <Box display="flex" gap={2} mt={3} flexWrap="wrap">
          <CustomButton
            title="Previous"
            handleClick={() => setCurrent((prev) => prev - 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={!(current > 1)}
          />
          <Box display={{ xs: 'hidden', sm: 'flex' }} alignItems="center" gap="5px">
            Page{' '}<Box component="strong">{current} of {pageCount}</Box>
          </Box>
          <CustomButton
            title="Next"
            handleClick={() => setCurrent((prev) => prev + 1)}
            backgroundColor="#475be8"
            color="#fcfcfc"
            disabled={current === pageCount}
          />
          <Select
            variant="outlined"
            color="info"
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue={10}
            onChange={(e) => {
              setPageSize(e.target.value ? Number(e.target.value) : 10);
            }}
          >
            {pageCounts.map((size: number, idx: number) => (
              <MenuItem key={idx} value={size}>
                Show {size}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}
    </Box>
  );
};

export default AllProperties;