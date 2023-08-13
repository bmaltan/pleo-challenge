import { formatDate } from "../../utils/format-date";
import { Badge, Box, Image, Text, Flex, Grid } from "@chakra-ui/react";
import { format as timeAgo } from "timeago.js";
import { Link } from "react-router-dom";
import FavoriteButton from "../favorites/favorite-button"

export default function LaunchItem({ launch, size }) {
  const imageHeight = size === "sm" ? ["100px", null, "150px"] : ["200px", null, "300px"];

  return (
    <Box
      as={Link}
      to={`/launches/${launch.id}`}
      boxShadow="md"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      position="relative"
      data-testid="launch-item"
      aria-label="Launch"
    >
      <Image
        src={launch.links.flickr.original[0] ?? launch.links.patch.small}
        alt={`${launch.name} launch`}
        height={imageHeight}
        width="100%"
        objectFit="contain"
        objectPosition="center"
      />

      <Image
        position="absolute"
        top="5"
        right="5"
        src={launch.links.mission_patch_small}
        height="75px"
        objectFit="contain"
        objectPosition="bottom"
      />

      <Flex
        p="6"
        justifyContent="space-between"
        align="center"
      >
        <Grid>
          <Flex alignItems="baseline">
            {launch.success ? (
              <Badge px="2" variant="solid" colorScheme="green">
                Successful
              </Badge>
            ) : (
              <Badge px="2" variant="solid" colorScheme="red">
                Failed
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
              {launch.rocket?.name} &bull; {launch.launchpad?.name}
            </Box>
          </Flex>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {launch.name}
          </Box>
          <Flex>
            <Text fontSize="sm">{formatDate(launch.date_utc)} </Text>
            <Text color="gray.500" ml="2" fontSize="sm">
              {timeAgo(launch.date_utc)}
            </Text>
          </Flex>
        </Grid>
        <FavoriteButton 
          id={launch.id} 
          type="launches" 
        />
      </Flex>
    </Box>
  );
}
