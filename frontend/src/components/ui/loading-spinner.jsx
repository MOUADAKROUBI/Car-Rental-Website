import { Box, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      display="grid"
      placeContent="center"
      height="100vh"
      width="100vw"
    >
      <Spinner
        borderTop={5}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      {' '}
      Loading...
    </Box>
  );
};

export default LoadingSpinner;
