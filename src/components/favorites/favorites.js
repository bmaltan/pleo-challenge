
import { 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel, 
  Text,
  Flex,
} from '@chakra-ui/react';
import { useSpaceXQuery } from "../../utils/use-space-x";
import Error from "../shared/error";
import { useFavorites } from '../../stores/favorites-state';
import LaunchItem from "../launches/launch-item";
import LaunchPadItem from "../launch-pads/launch-pad-item";
import Loader from '../shared/loader';

function FavoritesList(type) {
  const { favoritesList } = useFavorites(type);

  const request = {
    query: { _id: { $in: favoritesList } },
  }

  if (type === 'launches') {
    request.options = {
      populate: ["rocket", "launchpad"],
    };
  }
  
  const { data, error } = useSpaceXQuery(type, request);
  const favorites = data?.docs;

  if (error) return <Error />;
  if (!favorites) return <Loader />;
  if (!favoritesList.length) return <Text data-testid="no-favorites">No favorites yet. Click the Star button next to the name of a launch or a launch pad to favorite it!</Text>;

  return <Flex
    direction="column"
    gap="1rem"
    py="1rem"
  >
    {type === 'launches' && favorites.map((launch) =>
      <LaunchItem
        key={launch.id}
        launch={launch}
        size="sm"
      />)
    }
    {type === 'launchpads' && favorites.map((launchpad) =>
      <LaunchPadItem
        key={launchpad.id}
        launchPad={launchpad}
        size="sm"
      />)
    }
  </Flex>
};

export default function Favorites() {
  return (
    <Tabs isLazy>
      <TabList>
        <Tab>Favorite Launches</Tab>
        <Tab>Favorite Launch Pads</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          { FavoritesList('launches') }
        </TabPanel>
        <TabPanel>
          { FavoritesList('launchpads') }
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
