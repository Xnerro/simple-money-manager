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
import axios from 'axios';

interface Props {
  menu?: MenuItem[];
  getNewId: getNewIdHand;
}

export const ContainerBox: React.FC<Props> = ({ menu, getNewId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState<CardData[]>([]);
  const [active, setActive] = React.useState<string>('Pribadi');
  const [prevId, setPrevId] = React.useState<number>(0);

  const getData = async () => {
    await axios.get(process.env.REACT_APP_API_URL + 'keuangan').then(res => {
      setData(res.data.data);
    });
  };

  const addData = async (data: CardData) => {
    await axios
      .post(process.env.REACT_APP_API_URL + 'keuangan/info_keuangan', data)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let value = e.target?.elements;
    addData({
      id_menu: menu?.filter(item => item.name === active)[0].id,
      description: value.desc.value,
      is_income: value.type.value === 'Pemasukan' ? true : false,
      nominal: value.amount.value,
      is_active: true,
      created_at: new Date().toLocaleDateString(),
    });
    onClose();
  };

  const setActiveHand = (name: string) => {
    setActive(name);
  };

  const removeHand = (id: number) => {
    setPrevId(id);
  };

  React.useEffect(() => {
    getData();
  }, [isOpen, prevId]);
  return (
    <>
      <Box
        display='flex'
        flexDir={{ lg: 'row', sm: 'row', base: 'column' }}
        minW={{ lg: '100%', sm: '100%', base: '100vw' }}
        maxW={{ lg: '100%', sm: '100%', base: '10000vw' }}
        overflowX='hidden'>
        <SideBar
          menu={menu}
          setActive={setActiveHand}
          active={active}
          prevId={prevId}
          getNewId={getNewId}
        />
        <Box w='100' position='relative' display='flex' justifyContent='center'>
          <Box
            h={{ lg: '85vh', sm: '85vh', base: '85vh' }}
            w={{ lg: '78vw', sm: '78vw', base: '100vw' }}
            p={{ lg: '6', sm: '6', base: '4' }}
            display='flex'
            flexWrap='wrap'
            columnGap={{ lg: '10', sm: '10', base: '4' }}
            rowGap={{ lg: '7', sm: '5', base: '4' }}
            alignContent='start'
            alignItems='start'
            justifyContent='center'>
            {data.map(
              (item, index) =>
                item.id_menu ===
                  menu?.filter(item => item.name === active)[0].id && (
                  <Card key={index} data={item} removeData={removeHand} />
                )
            )}
          </Box>
          <Button
            position='absolute'
            left='50%'
            transform='translate(-50%, 0%)'
            bottom={{ lg: '0%', sm: '0%', base: '0%' }}
            onClick={onOpen}>
            Tambah Transaksi
          </Button>
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ lg: 'lg', base: 'sm' }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambah Transaksi</ModalHeader>
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
