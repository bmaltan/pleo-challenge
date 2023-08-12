import { Badge, Box, Text, Flex, Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FavoriteButton from "./favorite-button"

export default function LaunchPadItem({ launchPad }) {
  return (
    <Box
      as={Link}
      to={`/launch-pads/${launchPad.id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      data-testid="launch-pad-item"
      aria-label="Launch pad"
    >
      <Flex 
        p="6"
        gap="1rem"
        justifyContent="space-between"
        align="center"
      >
        <Grid>
          <Flex alignItems="baseline">
            {launchPad.status === "active" ? (
              <Badge px="2" variant="solid" colorScheme="green">
                Active
              </Badge>
            ) : (
              <Badge px="2" variant="solid" colorScheme="red">
                Retired
              </Badge>
            )}
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {launchPad.launch_attempts} attempted &bull;{" "}
              {launchPad.launch_successes} succeeded
            </Box>
          </Flex>
          <Text
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          > 
            {launchPad.full_name}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {launchPad.rockets.map((r) => r.name).join(", ")}
          </Text>
        </Grid>
        <FavoriteButton 
          id={launchPad.id} 
          type="launchpads" 
        />
      </Flex>
    </Box>
  );
}
