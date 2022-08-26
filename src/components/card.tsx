import * as React from 'react';
import { Box, Text, Heading, Icon } from '@chakra-ui/react';
import { BsTrash } from 'react-icons/bs';
import axios from 'axios';

const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

interface Props {
  data?: CardData;
  removeData?: RemoveData;
}

export const Card: React.FC<Props> = ({ data, removeData }) => {
  const deletedData = async (id: any) => {
    await axios
      .delete(process.env.REACT_APP_API_URL + 'keuangan/info_keuangan/' + id)
      .then(res => {
        removeData?.(id);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      {data?.id_menu && (
        <Box
          display='flex'
          flexDir='column'
          boxShadow='0 2px 5px rgba(0,0,0,.3)'
          border='1px solid'
          borderRadius='md'
          w={{ lg: '60', sm: '36', base: '28' }}
          h={{ lg: '44', sm: '32', base: '28' }}
          justifyContent='space-evenly'
          alignItems='center'
          cursor='pointer'
          position='relative'
          role='group'>
          <Icon
            as={BsTrash}
            position='absolute'
            right='5%'
            top='10%'
            visibility='hidden'
            fontSize='sm'
            _groupHover={{
              visibility: 'visible',
            }}
            onClick={() => {
              deletedData(data?.id);
            }}
          />
          <Heading fontSize={{ lg: '2xl', sm: 'xl', base: 'sm' }}>
            {data?.is_income === true ? 'Pemasukan' : 'Pengeluaran'}
          </Heading>
          <Text
            textOverflow='ellipsis'
            whiteSpace='nowrap'
            overflow='hidden'
            w={{ lg: '36', base: '24' }}
            fontSize={{ lg: 'xl', sm: 'sm', base: 'x-small' }}
            textAlign='center'>
            {data?.description}
          </Text>
          <Text
            color={data?.is_income === true ? 'green.400' : 'red.400'}
            _dark={{
              color: data?.is_income === true ? 'green.200' : 'red.200',
            }}
            fontWeight='bold'
            fontSize={{ lg: 'xl', sm: 'sm', base: 'x-small' }}>
            Rp. {data?.nominal}
          </Text>
          <Text fontSize={{ lg: 'md', sm: 'xs', base: 'x-small' }}>
            {day[new Date(data?.created_at).getDay()] +
              ' ' +
              new Date(data?.created_at).toLocaleDateString()}
          </Text>
        </Box>
      )}
    </>
  );
};
