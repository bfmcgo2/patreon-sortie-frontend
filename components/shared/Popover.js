import { useState, useRef, useEffect } from 'react';
import { 
  Button, 
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
  Box } from "@chakra-ui/react";

import Input from './Input';


const PopoverComponent = ({ action, createItinName }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const initRef =useRef()


  return (
    <>
      <Popover placement="left" closeOnBlur={false} initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
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
                  action ={createItinName} 
                  locked={false} 
                  active={false} 
                  light={false} 
                  label={'Create Itinerary'}
                  type={'text'}/>
              </Box>
              
              <Button 
                color="blue"
                onClick={()=> {
                  action();
                  onClose();
                }}>Confirm</Button>
            </PopoverBody>
          </PopoverContent>
        </>
        )}
      </Popover>
    </>
    
  )
}

export default PopoverComponent;