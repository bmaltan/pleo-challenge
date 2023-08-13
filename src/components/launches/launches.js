import { SimpleGrid } from "@chakra-ui/react";
import { useSpaceXPaginatedQuery } from "../../utils/use-space-x";
import Error from "../shared/error";
import Breadcrumbs from "../shared/breadcrumbs";
import LoadMoreButton from "../shared/load-more-button";
import LaunchItem from "../launches/launch-item";

const PAGE_SIZE = 12;

export default function Launches() {
  const { data, error, isValidating, setSize } = useSpaceXPaginatedQuery(
    "launches",
    {
      query: { upcoming: false },
      options: {
        limit: PAGE_SIZE,
        populate: ["rocket", "launchpad"],
        sort: { date_utc: "desc" },
      },
    }
  );

  return (
    <div>
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Launches" }]}
      />
      <SimpleGrid m={[2, null, 6]} minChildWidth="350px" spacing="4">
        {error && <Error />}
        {data
          ?.map((page) => page.docs)
          .flat()
          .map((launch) => (
            <LaunchItem launch={launch} key={launch.id} />
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
