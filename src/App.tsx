import * as React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { theme } from './components/extendThemes';
import { NavBar } from './components/navBar';
import { AddMenu } from './components/addMenu';
import { ContainerBox } from './components/container';

const menu: string[] = ['Pribadi', 'Keluarga', 'Pekerjaan', 'Pendidikan'];

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box minH='100vh' maxW='100%'>
        <NavBar />
        {menu.length === 0 ? <AddMenu /> : <ContainerBox menu={menu} />}
      </Box>
    </ChakraProvider>
  );
};
