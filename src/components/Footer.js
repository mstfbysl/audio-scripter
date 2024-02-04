import React from 'react';
import { Box, Container, Text, Link, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaGithub, FaHeart } from 'react-icons/fa'; // Using react-icons for the heart icon

function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
      <Container>
        <VStack spacing={1}>
          <HStack spacing={2} justifyContent="center">
            <Text fontSize="sm">Made with</Text>
            <Icon as={FaHeart} color="red.500" />
            <Text fontSize="sm">by the <a href="https://www.github.com/mstfbysl" target="_blank" rel="mstfbysl github">mstfbysl</a></Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default Footer;
