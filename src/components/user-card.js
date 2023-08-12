import {
  Flex,
  Avatar,
  Text,
} from '@chakra-ui/react'

export default function UserCard() {
  return (
    <Flex 
      align="center"
      gap="1rem"
    >
      <Avatar size="sm" />
      <Text fontSize='md'>Awesome User</Text>
    </Flex>
  )
}
