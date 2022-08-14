import React from "react";
import {
  Box,
  FormLabel,
  Heading,
  Input,
  Container,
  Button,
} from "@chakra-ui/react";

export const AddMenu = () => {
  return (
    <>
      <Box
        w="40vw"
        p="6"
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        borderRadius="lg"
        boxShadow="md"
        border="1px solid"
      >
        <Container>
          <Heading>Add Menu</Heading>
          <Box as="form">
            <FormLabel htmlFor="name">Nama Menu</FormLabel>
            <Input placeholder="Name" id="name" />
            <Button mt="5">Tambah</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
