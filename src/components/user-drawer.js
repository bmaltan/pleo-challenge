import {
  VStack,
  StackDivider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { useUiState } from '../stores/ui-state'
import FavoritesContainer from './favorites';
import UserCard from './user-card';

export default function UserDrawer(props) {
  const {isUserDrawerOpen, toggleUserDrawer} = useUiState();

  return (
    <Drawer
      size="md"
      isOpen={isUserDrawerOpen}
      placement='right'
      preserveScrollBarGap
      onClose={() => toggleUserDrawer()}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{props.header}</DrawerHeader>
        <DrawerBody>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
            data-testid="user-drawer-body"
          >
          <UserCard />
          <FavoritesContainer />
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
