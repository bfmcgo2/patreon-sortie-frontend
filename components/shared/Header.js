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

const Header = ({itinOpen}) => {
  const { logout } = useContext(UserContext);
  
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
            <Avatar as={IconButton} cursor="pointer" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </MenuButton>
          
          <MenuList>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
        
      </Box>
    </Flex>
    
  )
}

export default Header;