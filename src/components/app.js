import { Routes, Route } from "react-router-dom";
import { Flex, Text, IconButton } from "@chakra-ui/react";

import Launches from "./launches/launches";
import Launch from "./launches/launch";
import Home from "./home/home";
import LaunchPads from "./launch-pads/launch-pads";
import LaunchPad from "./launch-pads/launch-pad";
import UserDrawer from "./user-drawer/user-drawer";
import { useUiState } from '../stores/ui-state'
import { User } from "react-feather";
import { useShortcuts } from "../utils/use-shortcuts";

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/launches" element={<Launches />} />
        <Route path="/launches/:launchId" element={<Launch />} />
        <Route path="/launch-pads" element={<LaunchPads />} />
        <Route path="/launch-pads/:launchPadId" element={<LaunchPad />} />
      </Routes>
    </div>
  );
}

function NavBar() {
  const { toggleUserDrawer } = useUiState();
  useShortcuts();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="6"
      bg="gray.800"
      color="white"
    >
      <Text
        fontFamily="mono"
        letterSpacing="2px"
        fontWeight="bold"
        fontSize="lg"
      >
        ¡SPACE·R0CKETS!
      </Text>
      <IconButton
        isRound
        variant='solid'
        colorScheme='blue'
        aria-label='User menu'
        fontSize='20px'
        icon={<User />}
        onClick={() => toggleUserDrawer(true)}
        data-testid="user-drawer"
      />
      <UserDrawer />
    </Flex>
  );
}
