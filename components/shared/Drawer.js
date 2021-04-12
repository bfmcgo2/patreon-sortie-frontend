import Link from 'next/link'
import { useState, useRef, useEffect, useContext } from 'react';
import getConfig from 'next/config';
import cookie from 'cookie'
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
  CloseButton,
  PopoverTrigger,
  PopoverCloseButton,
  Popover,
  Box } from "@chakra-ui/react";


const { publicRuntimeConfig } = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

import Input from './Input';
import PopoverAdd from './PopoverAdd';
import PopoverDelete from './PopoverDelete';

import ItineraryContext from '../../context/ItineraryContext';

const DrawerComponent = ({ isOpen, onClose}) => {
  const { itin, addItin, createItinName, itin_name, deleteItinerary, fetchItineraries } = useContext(ItineraryContext);


  const btnRef = useRef();

  const removeAndUpdateItineraries = (id) => {
    deleteItinerary(id);
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
                        key={i}>
                      <Link href={`/itineraries/${loc.id}`}>
                         <Button flex="100%" onClick={onClose}>{loc.name}</Button>
                       </Link>
                       
                         
                       <PopoverDelete
                        trigger={<CloseButton size="sm" m="5px"/>}
                        action={()=> removeAndUpdateItineraries(loc.id)}>
                        Remove this itinerary?
                       </PopoverDelete>
                      </Box>
                      
                      
                    )
                  })
                }
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <PopoverAdd 
                action={()=> addItin(itin_name)}>
                <Input 
                  action ={createItinName} 
                  locked={false} 
                  active={false} 
                  light={false} 
                  label={'Create Itinerary'}
                  type={'text'}/>
              </PopoverAdd>
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