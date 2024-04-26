import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Button,
  IconButton,
  Image,
  Icon,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FiHome, FiSettings, FiCoffee } from 'react-icons/fi';

import logo from '../images/logo.png';

function Navbar() {

  const buyMeACoffee = () => {
    window.open('https://buymeacoffee.com/mbaysal', '_blank');
  };

  return (
    <Box boxShadow="md" p={4}>
      <Flex align="center">
      <Image src={logo}  alt="Company Logo" height={35} />
        <Spacer />
        <Button as={ReactRouterLink} to="/" variant="ghost" mr={2} leftIcon={<Icon as={FiHome} />}>
          Home
        </Button>
        <Button as={ReactRouterLink} to="/settings" variant="ghost" mr={2} leftIcon={<Icon as={FiSettings} />}>
          Settings
        </Button>
        <Button onClick={buyMeACoffee} variant="ghost" mr={2} leftIcon={<Icon as={FiCoffee} />}>
          Buy me a coffee
        </Button>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
}

export default Navbar;
