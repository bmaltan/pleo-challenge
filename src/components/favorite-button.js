import { IconButton, useToast } from "@chakra-ui/react";
import { X, Star } from "react-feather";
import { useFavorites } from '../stores/favorites-state'

export default function FavoriteButton(props) {
  const { id, type } = props;
  const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites(type);
  const toast = useToast();

  const toggleFavorite = (event) => {
    if (isInFavorites(id)) {
      removeFromFavorites(id);
      toast({
        description: "Favorite removed.",
        variant: 'subtle',
        duration: 3000,
        isClosable: true,
      })
    } else {
      addToFavorites(id);
      toast({
        description: "Favorite added!",
        duration: 3000,
        isClosable: true,
      })
    }
    event.preventDefault(); // prevents the parent from receiving the click and navigating
  }

  return (
    <IconButton
      isRound
      size="sm"
      variant='solid'
      colorScheme={isInFavorites(id) ? 'red' : 'yellow'}
      icon={isInFavorites(id) ? <X /> : <Star />}
      onClick={(e) => toggleFavorite(e)}
      data-testid='favorite-button'
      aria-label={isInFavorites(id) ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isInFavorites(id)}
    />
  )
}
