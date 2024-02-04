import React, { useState } from 'react';
import {
  Text,
  VStack,
  Container,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Heading,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineSave } from 'react-icons/ai'; // Importing an icon for the save button

function Settings() {
  const [apiKey, setApiKey] = useState(() => {
    // Get the API key from localStorage if it exists
    const savedApiKey = localStorage.getItem('apiKey');
    return savedApiKey || '';
  });
  const toast = useToast();

  const handleSave = () => {
    localStorage.setItem('apiKey', apiKey);
    toast({
      title: "API Key saved.",
      description: "Your API key has been successfully saved.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="8xl">
      <VStack marginTop={4} spacing={4} w="100%">
        <FormControl id="api-key" isRequired>
          <FormLabel>API Key</FormLabel>
          <Input
            placeholder="Enter your API key here"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
                  <Text>
          You can get your API key by signing up at{' '}
          <a href="https://www.openai.com" target="_blank" rel="noreferrer">
            <strong>OpenAI</strong>
          </a>
        </Text>

        </FormControl>
        <Flex w="100%">
          <Button
            leftIcon={<Icon as={AiOutlineSave} />}
            colorScheme="blue"
            onClick={handleSave}
          >
            Save API Key
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
}

export default Settings;
