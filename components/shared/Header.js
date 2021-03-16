import { useContext } from 'react';
import { Button, 
          Box, 
          Heading, 
          Flex, 
          Spacer, 
          Avatar, 
          MenuList, 
          MenuItem, 
          Menu,
          MenuButton, 
          IconButton  } from "@chakra-ui/react";

import UserContext from '../../context/UserContext';

const Header = ({itinOpen, user}) => {
  const { logout } = useContext(UserContext);

  const userPage = () => {
    window.open(
      user.url,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  return (
    <Flex 
      position="fixed"
      width="100%"
      top="0"
      left="0"
      zIndex="999"
      backgroundColor="#fff">
      <Box p="4">
        <Heading size="md">Sortie</Heading>
      </Box>
      <Spacer />
      <Box
        alignSelf="center"
        paddingRight= "15px"
        display="flex"
        alignItems="center"
        >
        <Button onClick={()=> {
          itinOpen()
          console.log('open')
        }} colorScheme="teal" mr="6" >
          Your Itinerary
        </Button>
        <Menu >
          <MenuButton >
            <Avatar as={IconButton} cursor="pointer" name={user.full_name} src={user.image_url} />
          </MenuButton>
          
          <MenuList>
            <MenuItem onClick={userPage}>User Patreon Page</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
        
      </Box>
    </Flex>
    
  )
}



export default Header;