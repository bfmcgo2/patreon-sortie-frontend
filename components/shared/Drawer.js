import Link from 'next/link'
import { useState, useRef, useEffect } from 'react';
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

const DrawerComponent = ({ isOpen, onClose, user, addItin, itin}) => {

  const [itin_name, createItinName] = useState(''); //create itinerary bucket
  const btnRef = useRef();

  console.log(itin)

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
                      <Link href={`/itineraries/${loc.id}`}>
                         <Button onClick={onClose}>{loc.name}</Button>
                       </Link>
                      
                    )
                  })
                }
              </Stack>
            </DrawerBody>
            <DrawerFooter>
              <Popover 
                createItinName={createItinName}
                action={()=> addItin(itin_name)}/>
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