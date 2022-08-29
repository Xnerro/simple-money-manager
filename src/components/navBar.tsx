import * as React from 'react';
import {
  Box,
  Heading,
  IconButton,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const date = new Date();

interface Props {
  getNewId: getNewIdHand;
}

export const NavBar: React.FC<Props> = ({ getNewId }) => {
  const [time, setTime] = React.useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function refreshClock() {
    setTime(
      new Date().toLocaleTimeString('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      })
    );
  }

  const addData = async (e: any) => {
    e.preventDefault();
    let value = e.target?.elements;
    await axios
      .post(process.env.REACT_APP_API_URL + 'keuangan/menu', {
        name: value.menu.value,
        is_active: true,
      })
      .then(res => {
        getNewId(res.data.data.id);
      })
      .catch(err => {
        console.log(err);
      });
    onClose();
  };

  React.useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, [onClose]);
  return (
    <header>
      <Box
        p={{ base: 1, lg: 4, sm: 2 }}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        borderBottomWidth='3px'
        borderBottomColor='gray.200'
        _dark={{
          borderBottomColor: 'gray.700',
        }}>
        <Box display='flex' alignItems='center'>
          <ColorModeSwitcher />
          <IconButton
            size={{ base: 'sm', lg: 'md', sm: 'md' }}
            fontSize='lg'
            variant='ghost'
            color='current'
            marginLeft='2'
            aria-label='addMenu'
            icon={<FaPlus />}
            onClick={onOpen}
          />
        </Box>
        <Heading fontSize={{ base: 'sm', lg: '4xl', md: '2xl' }}>
          Money Manager
        </Heading>
        <Box display='flex' flexDir='column' minW='80px' alignItems='center'>
          <Heading fontSize={{ base: 'xs', lg: 'sm' }}>
            {date.toLocaleDateString()}
          </Heading>
          <Heading fontSize={{ base: 'xs', sm: 'sm' }}>{time}</Heading>
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as='form'
              onSubmit={addData}
              p='3'
              display='flex'
              flexDir='column'
              alignItems='center'>
              <FormLabel htmlFor='menu' alignSelf='start'>
                Nama Menu
              </FormLabel>
              <Input type='text' id='menu' />
              <Button type='submit' w='50%' mt='5'>
                Tambah
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </header>
  );
};
