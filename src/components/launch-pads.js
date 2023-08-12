import { SimpleGrid } from "@chakra-ui/react";

import Error from "./error";
import Breadcrumbs from "./breadcrumbs";
import LoadMoreButton from "./load-more-button";
import { useSpaceXPaginatedQuery } from "../utils/use-space-x";
import LaunchPadItem from "./launch-pad-item";

const PAGE_SIZE = 12;

export default function LaunchPads() {
  const { data, error, isValidating, setSize } = useSpaceXPaginatedQuery(
    "launchpads",
    {
      query: { upcoming: false },
      options: {
        limit: PAGE_SIZE,
        populate: ["rockets"],
        sort: { full_name: "asc" },
      },
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launch Pads" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data
          ?.map((page) => page.docs)
          .flat()
          .map((launchPad) => (
            <LaunchPadItem key={launchPad.id} launchPad={launchPad} />
          ))}
      </SimpleGrid>
      <LoadMoreButton
        loadMore={() => setSize((size) => size + 1)}
        data={data}
        pageSize={PAGE_SIZE}
        isLoadingMore={isValidating}
      />
    </div>
  );
}

