import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Textarea,
  Text,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Container,
  Heading
} from '@chakra-ui/react';

import UploadTab from '../components/UploadTab';
import RecordTab from '../components/RecordTab';
import WelcomeMessage from '../components/WelcomeMessage';
import { useNotes } from '../context/NotesContext'; 

function WelcomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const { notes, handleNotesChange } = useNotes();
  const [isApiDisabled, setIsApiDisabled] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    if (!apiKey || !apiKey.startsWith('sk')) {
      setIsApiDisabled(true);
    }
  }, []);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const goToSettings = () => {
    window.location.href = '/settings';
  };

  if (isApiDisabled) {
    return (
      <Container maxW="8xl" centerContent>
        <Heading mt="6" mb="4">API Key Required</Heading>
        <Text>Please go to the settings page to enter your API Key.</Text>
        <Button mt="4" colorScheme="teal" onClick={goToSettings}>
          Go to Settings
        </Button>
      </Container>
    );
  }

  return (
    <Container maxW="8xl">
      <Flex direction={{ base: 'column', lg: 'row' }} gap={6} mt={4}>
        <Box flex="1" p={4}>
            <WelcomeMessage />
            <Tabs onChange={handleTabChange} index={tabIndex} isFitted >
                <TabList mb="1em">
                  <Tab>Record your voice</Tab>
                  <Tab>Upload your file</Tab>
                </TabList>
                <TabPanels>
                <TabPanel>
                    <RecordTab />
                </TabPanel>
                <TabPanel>
                    <UploadTab />
                </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>

        <Box flex="1" p={4}>
          <Textarea
            placeholder="Your text will be in here..."
            value={notes}
            readOnly
            size="lg"
            resize="vertical"
            height="xl"
          />
        </Box>
      </Flex>
    </Container>
  );
}

export default WelcomePage;
