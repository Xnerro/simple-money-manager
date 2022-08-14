import * as React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const date = new Date();

export const NavBar = () => {
  const [time, setTime] = React.useState<any>();

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
  React.useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <header>
      <Box
        p={{ base: 2, lg: 4 }}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        borderBottomWidth='3px'
        borderBottomColor='gray.200'>
        <ColorModeSwitcher />
        <Heading fontSize={{ base: '2xl', lg: '4xl' }}>Money Manager</Heading>
        <Box display='flex' flexDir='column' minW='80px' alignItems='center'>
          <Heading fontSize={{ base: 'xs', lg: 'sm' }}>
            {date.toLocaleDateString()}
          </Heading>
          <Heading fontSize={{ base: 'xs', sm: 'sm' }}>{time}</Heading>
        </Box>
      </Box>
    </header>
  );
};
