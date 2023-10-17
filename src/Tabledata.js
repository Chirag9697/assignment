import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { db } from "./firebase";
import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { FormControl } from "@chakra-ui/react";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
export default function Tabledata() {
  const [alluser, setAllUser] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const collectionref = collection(db, "users");
  const getallusers = async () => {
    try {
      const data = await getDocs(collectionref);
      const alldata = data.docs.map((item) => {
        return { ...item.data(), id: item.id };
      });
      setAllUser(alldata);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteuser=async(id)=>{
    try{
      console.log(id);
      const user=doc(db,"users",id);
      const data=await deleteDoc(user);
      console.log(data);
    }catch(err){
      console.log(err);
    }
    
  }
  useEffect(() => {
    getallusers();
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th style={{textAlign:"center"}}>Name</Th>
              <Th style={{textAlign:"center"}}>Age</Th>
              <Th style={{textAlign:"center"}}>Email</Th>
              <Th style={{textAlign:"center"}}>Gender</Th>
              <Th style={{textAlign:"center"}}>City</Th>
              <Th style={{textAlign:"center"}}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alluser.map((alluser) => {
              return (
                <Tr key={alluser.id}>
                  <Td style={{textAlign:"center"}}>{alluser.name}</Td>
                  <Td style={{textAlign:"center"}}>{alluser.age}</Td>
                  <Td style={{textAlign:"center"}}>{alluser.email}</Td>
                  <Td style={{textAlign:"center"}}>{alluser.gender}</Td>
                  <Td style={{textAlign:"center"}}>{alluser.city}</Td>
                  <Td>
                    <div style={{display:"flex",justifyContent:"center"}}>
                      <Button colorScheme="red" style={{marginRight:"20px"}} onClick={()=>deleteuser(alluser.id)}>Delete</Button>
                      <Button colorScheme="blue">Edit</Button>
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <div style={{display:'flex',width:"100%",justifyContent:"center",marginTop:"10px"}}>
        <Button colorScheme="blue">ADD USERS</Button>
      </div>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
