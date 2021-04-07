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
  Box } from "@chakra-ui/react";


const { publicRuntimeConfig } = getConfig();
const CLIENT = publicRuntimeConfig.CLIENT_URL;

import Input from './Input';
import Popover from './Popover';

import ItineraryContext from '../../context/ItineraryContext';

const DrawerComponent = ({ isOpen, onClose}) => {
  const { itin, addItin, createItinName, itin_name } = useContext(ItineraryContext);
  

  const btnRef = useRef();


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
                      <Link href={`/itineraries/${loc.id}`} key={i}>
                         <Button onClick={onClose}>{loc.name}</Button>
                       </Link>
                      
                    )
                  })
                }
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Popover 
                action={()=> addItin(itin_name)}>
                <Input 
                  action ={createItinName} 
                  locked={false} 
                  active={false} 
                  light={false} 
                  label={'Create Itinerary'}
                  type={'text'}/>
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