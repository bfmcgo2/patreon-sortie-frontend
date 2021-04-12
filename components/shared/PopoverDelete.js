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


const PopoverDelete = (props) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const initRef =useRef()


  return (
    <>
      <Popover placement="left" closeOnBlur={false} initialFocusRef={initRef}>
      {({ isOpen, onClose }) => (
        <>
          <PopoverTrigger>
            { props.trigger }
          </PopoverTrigger>
          <PopoverContent
            color="black">
           <PopoverArrow />
           <PopoverCloseButton />
           <PopoverBody 
             padding="40px 10px"
             display="flex"
             flexDirection="column"
             justifyContent="center">
             <Box padding="10px 0" textAlign="center">
               {props.children}
             </Box>
             <Button 
               colorScheme="red" 
               variant="outline"
               onClick={()=> {
                 props.action();
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

export default PopoverDelete;