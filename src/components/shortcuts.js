import { useUiState } from '../stores/ui-state';
import { useEffect, useCallback } from 'react';

export function useShortcuts() {
  const { toggleUserDrawer } = useUiState();

  const handleKeyDown = useCallback((event) => {
    if (fullScreenViewerOpen) return;

    if (event.key === '/') {
      toggleUserDrawer();
    }
  }, [toggleUserDrawer]);

  const fullScreenViewerOpen = !!document.getElementById('full-screen-viewer');

  useEffect(() => { 
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
