import * as React from 'react';
import {
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { SideBar } from './sidebar';
import { Card } from './card';

interface Props {
  menu?: string[];
}

export const ContainerBox: React.FC<Props> = ({ menu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState<CardData[]>([
    {
      desc: 'Jajan',
      type: 'Pengeluaran',
      amount: 100.0,
      date: '2020-01-01',
    },
  ]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target?.elements);
    let value = e.target?.elements;
    setData([
      ...data,
      {
        desc: value.desc.value,
        type: value.type.value,
        amount: value.amount.value,
        date: new Date().toLocaleDateString(),
      },
    ]);
    onClose();
  };
  return (
    <>
      <Box display='flex' flexDir='row' w='100%' maxW='100vw'>
        <SideBar menu={menu} />
        <Box
          w='100'
          position='relative'
          display='fl ex'
          justifyContent='center'>
          <Box
            h='80vh'
            w='78vw'
            p='6'
            display='flex'
            flexWrap='wrap'
            columnGap='10'
            rowGap='7'
            alignContent='start'
            alignItems='start'
            justifyContent='center'>
            {data?.map((item: any, index: number) => (
              <Card key={index} data={item} />
            ))}
          </Box>
          <Button
            position='absolute'
            left='50%'
            transform='translate(-50%, 0%)'
            bottom='-5%'
            onClick={onOpen}>
            Tambah Transaksi
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              as='form'
              p='3'
              display='flex'
              flexDir='column'
              alignItems='center'
              onSubmit={handleSubmit}>
              <FormLabel htmlFor='desc' alignSelf='start'>
                Description
              </FormLabel>
              <Input type='text' id='desc' />
              <FormLabel htmlFor='category' alignSelf='start'>
                Jenis
              </FormLabel>
              <Select placeholder='Pilih Jenis' id='type'>
                <option value='Pemasukan'>Pemasukan</option>
                <option value='Pengeluaran'>Pengeluaran</option>
              </Select>
              <FormLabel htmlFor='amount' alignSelf='start'>
                Amount
              </FormLabel>
              <Input type='number' id='amount' />
              <Button mt='3' type='submit'>
                Tambah
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
