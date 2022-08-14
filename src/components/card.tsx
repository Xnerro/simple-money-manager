import * as React from 'react';
import { Box, Text, Heading, useColorModeValue } from '@chakra-ui/react';

const day = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export const Card: React.FC<{ data: CardData }> = ({ data }) => {
  return (
    <>
      <Box
        display='flex'
        flexDir='column'
        boxShadow='0 2px 5px rgba(0,0,0,.3)'
        border='1px solid'
        borderRadius='md'
        w={{ lg: '60', base: '36' }}
        h={{ lg: '44', base: '32' }}
        justifyContent='space-evenly'
        alignItems='center'>
        <Heading fontSize={{ lg: '2xl', base: 'lg' }}>{data?.type}</Heading>
        <Text
          textOverflow='ellipsis'
          whiteSpace='nowrap'
          overflow='hidden'
          w={{ lg: '36', base: '24' }}
          fontSize={{ lg: 'xl', base: 'sm' }}
          textAlign='center'>
          {data?.desc}
        </Text>
        <Text
          color={useColorModeValue(
            data.type === 'Pemasukan' ? 'green.400' : 'red.400',
            data.type === 'Pemasukan' ? 'green.200' : 'red.200'
          )}
          fontWeight='bold'
          fontSize={{ lg: 'xl', base: 'sm' }}>
          Rp. {data?.amount}
        </Text>
        <Text fontSize={{ lg: 'md', base: 'xs' }}>
          {day[new Date(new Date().toLocaleDateString()).getDay()] +
            ' ' +
            new Date().toLocaleDateString()}
        </Text>
      </Box>
    </>
  );
};
