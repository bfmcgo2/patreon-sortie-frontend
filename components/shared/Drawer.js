import { useState, useRef, useContext } from 'react';
import getConfig from 'next/config';
import cookie from 'cookie'

const { publicRuntimeConfig } = getConfig();
const client = publicRuntimeConfig.CLIENT_URL;

import UserContext from '../../context/UserContext';

import { 
  Button, 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Box } from "@chakra-ui/react";



import Input from './Input';

const DrawerComponent = ({ isOpen, onClose, itin}) => {
  const { user } = useContext(UserContext);

  const btnRef = useRef();
  const [itin_name, setItin] = useState('');

  const addItin = async() => {
    const add_itin = await fetch('/api/add_itinerary', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        itin_name
      })
    })
    const res = await add_itin;
    const add_res = await res.json();
    console.log(add_res);
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Itineraries</DrawerHeader>
            <DrawerBody>
              <Stack spacing="24px">
                {itin &&
                  itin.map((loc, i)=> {
                    return(
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        key={i}>
                        <Button
                          size="md"
                          height="48px"
                          width="90%"
                          border="1px"
                          onClick={()=> console.log('fuck')}
                        >
                          {loc.name}
                        </Button>
                      </Box>
                    )
                  })
                }
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Popover placement="left">
                <PopoverTrigger>
                  <Button color="blue" mr={3}>Create Itinerary</Button>
                </PopoverTrigger>
                <PopoverContent
                  bg="rgb(254, 235, 200)" color="black">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody 
                    padding="40px 10px"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center">
                    <Box padding="10px 0">
                      <Input 
                        action ={setItin} 
                        locked={false} 
                        active={false} 
                        light={false} 
                        label={'Create Itinerary'}
                        type={'text'}/>
                    </Box>
                    
                    <Button 
                      color="blue"
                      onClick={addItin}>Confirm</Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Button variant="outline"  onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      
    </>
    
  )
}

export default DrawerComponent;