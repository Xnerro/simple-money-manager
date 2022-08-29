import * as React from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import axios from 'axios';
import { BsTrash } from 'react-icons/bs';

interface Props {
  menu?: MenuItem[];
  setActive: setActiveHand;
  active?: string;
  prevId?: number;
  getNewId: getNewIdHand;
}

export const SideBar: React.FC<Props> = ({
  menu,
  setActive,
  active,
  prevId,
  getNewId,
}) => {
  const [data, setData] = React.useState<Result>();
  const getData = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + 'keuangan/result/' + active)
      .then(res => {
        setData(res.data.data);
      });
  };

  const removeMenu = async (id: number) => {
    await axios.delete(process.env.REACT_APP_API_URL + 'keuangan/menu/' + id);
    getNewId(id);
    window.location.reload();
  };

  React.useEffect(() => {
    getData();
  }, [prevId, active]);
  return (
    <>
      <Box
        display='flex'
        flexDir={{ lg: 'column', sm: 'column', base: 'row' }}
        overflowX={{ base: 'auto', lg: 'hidden', sm: 'hidden' }}
        width={{ base: '100%', lg: '300px', sm: '200px' }}
        maxW={{ base: '100%', lg: '100%', sm: '100%' }}
        alignItems='center'
        rowGap='5'
        columnGap='2'>
        {menu?.map(
          (item: any, index: number) =>
            item.is_active && (
              <Box
                role='group'
                position='relative'
                w={{ lg: '100%', sm: '100%', base: '400px' }}
                key={index}
                bg={active === item.name ? 'white' : 'gray.200'}
                _dark={{
                  bg: active === item.name ? 'gray.800' : 'gray.700',
                }}
                textAlign='center'
                p={{ lg: '4', sm: '4', base: '2' }}
                _hover={{
                  bg: 'gray.300',
                  _dark: {
                    bg: 'gray.600',
                  },
                }}
                onClick={() => setActive(item.name)}
                _active={{
                  bg: 'gray.200',
                  _dark: {
                    bg: 'gray.500',
                  },
                }}
                cursor='pointer'>
                <Text
                  fontSize={{ lg: 'xl', md: 'lg', base: 'sm' }}
                  w={{ lg: '100%', sm: '100%', base: '100px' }}>
                  {item.name}
                </Text>
                <Icon
                  position='absolute'
                  as={BsTrash}
                  right='5%'
                  top='15%'
                  visibility='hidden'
                  _groupHover={{
                    visibility: 'visible',
                  }}
                  fontSize={{ lg: 'md', sm: 'md', base: 'xs' }}
                  onClick={() => {
                    removeMenu(item.id);
                  }}
                />
              </Box>
            )
        )}
        <Box
          visibility={{ lg: 'visible', sm: 'visible', base: 'hidden' }}
          position='absolute'
          bottom='2%'
          left='2%'
          h={{ lg: '200px', base: '150px' }}
          border='1px solid'
          w={{ lg: '275px', base: '150px' }}
          display='flex'
          flexDir='column'
          justifyContent='center'
          alignItems='center'>
          <Text fontSize={{ lg: 'xl', base: 'sm' }}>Total :</Text>
          <Text fontSize={{ lg: 'xl', base: 'sm' }}>Rp. {data?.total}</Text>
          <Text fontSize={{ lg: 'xl', base: 'sm' }}>Max Pengeluaran :</Text>
          <Text fontSize={{ lg: 'xl', base: 'sm' }}>Rp. {data?.max}</Text>
          <Text fontSize={{ lg: 'xl', base: 'sm' }}>Max Pemasukan :</Text>
          <Text fontSize={{ lg: 'xl', base: 'sm' }}>Rp. {data?.min}</Text>
        </Box>
      </Box>
    </>
  );
};
