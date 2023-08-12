import { useUiState } from '../stores/ui-state';
import { useEffect, useCallback } from 'react';

export function useShortcuts() {
  const { toggleUserDrawer } = useUiState();

  const handleKeyDown = useCallback((event) => {
    if (event.key === '/') {
      toggleUserDrawer();
    }
  }, [toggleUserDrawer]);

  useEffect(() => { 
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
