import {
  Flex,
  Spinner as ChakraSpinner
} from '@chakra-ui/react';

export default function Loader() {
  return (
    <Flex 
      justifyContent="center" 
      alignItems="center" 
      minHeight="50vh"
    >
      <ChakraSpinner size="lg" />
    </Flex>
  )
}
