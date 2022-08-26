import * as React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { theme } from './components/extendThemes';
import { NavBar } from './components/navBar';
import { AddMenu } from './components/addMenu';
import { ContainerBox } from './components/container';
import axios from 'axios';

export const App = () => {
  const [menu, setMenu] = React.useState<MenuItem[] | any[]>();
  const [prevId, setPrevId] = React.useState<number>(0);

  const getData = async () => {
    await axios
      .get(process.env.REACT_APP_API_URL + 'keuangan/menu')
      .then(res => {
        setMenu(res.data.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getNewIdHand = (id: number) => {
    setPrevId(id);
  };

  React.useEffect(() => {
    getData();
  }, [prevId]);
  return (
    <ChakraProvider theme={theme}>
      <Box minH='100vh' maxW='100%'>
        <NavBar getNewId={getNewIdHand} />
        {menu?.length === 0 ? (
          <AddMenu />
        ) : (
          <ContainerBox menu={menu} getNewId={getNewIdHand} />
        )}
      </Box>
    </ChakraProvider>
  );
};
