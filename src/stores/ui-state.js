import { atom, useAtom } from 'jotai';

const userDrawerOpen = atom(false);

export function useUiState() {
  const [isUserDrawerOpen, setUserDrawerOpen] = useAtom(userDrawerOpen);

  function toggleUserDrawer() {
    setUserDrawerOpen(!isUserDrawerOpen);
  }

  return { isUserDrawerOpen, toggleUserDrawer };
}
