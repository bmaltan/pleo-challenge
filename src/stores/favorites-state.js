import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const favorites = {
  launches: atom(getFavorites('launchesFavorites')),
  launchpads: atom(getFavorites('launchpadsFavorites')),
};

function getFavorites(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error(`Error parsing ${key} from local storage: ${error.message}. Clearing local storage.`);
    localStorage.setItem(key, JSON.stringify([]));
    return [];
  }
}

export function useFavorites(type) {
  const [favoritesList, setFavoritesList] = useAtom(favorites[type]);

  function isInFavorites(id) {
    return favoritesList.includes(id);
  }

  function addToFavorites(id) {
    setFavoritesList([...favoritesList, id]);
  }

  function removeFromFavorites(id) {
    setFavoritesList(favoritesList.filter((item) => item !== id));
  }

  useEffect(() => {
    localStorage.setItem(`${type}Favorites`, JSON.stringify(favoritesList));
  }, [favoritesList, type]);

  return { favoritesList, addToFavorites, removeFromFavorites, isInFavorites };
}
