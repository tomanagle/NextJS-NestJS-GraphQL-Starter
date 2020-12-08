import React from 'react';
import { Spinner, Box } from 'bumbag';

const FullPageLoading = () => {
  return (
    <Box
      backgroundColor="white"
      top="0"
      width="100%"
      height="100%"
      position="absolute"
      display="flex"
      alignItems="center"
      alignContent="center"
    >
      <Spinner size="large" />
    </Box>
  );
};

export default FullPageLoading;
