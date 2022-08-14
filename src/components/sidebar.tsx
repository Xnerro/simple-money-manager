import * as React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface Props {
  menu?: string[];
}

export const SideBar: React.FC<Props> = ({ menu }) => {
  const [active, setActive] = React.useState<string>('Pribadi');
  return (
    <>
      <Box
        display='flex'
        flexDir='column'
        w='xs'
        alignItems='center'
        rowGap='5'>
        {menu?.map(item => (
          <Box
            key={item}
            bg={active === item ? 'whitw' : 'gray.200'}
            _dark={{
              bg: active === item ? 'gray.800' : 'gray.700',
            }}
            w='100%'
            textAlign='center'
            p='4'
            _hover={{
              bg: 'gray.300',
              _dark: {
                bg: 'gray.600',
              },
            }}
            onClick={() => setActive(item)}
            _active={{
              bg: 'gray.200',
              _dark: {
                bg: 'gray.500',
              },
            }}
            cursor='pointer'>
            <Text fontSize='xl'>{item}</Text>
          </Box>
        ))}
      </Box>
    </>
  );
};
