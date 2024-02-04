import React, { useState } from 'react';
import {
  Box,
  Flex,
  Textarea,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Container,
  Heading
} from '@chakra-ui/react';
import languages from '../content/languages.json';

import UploadTab from '../components/UploadTab';
import RecordTab from '../components/RecordTab';
import WelcomeMessage from '../components/WelcomeMessage';
import { useNotes } from '../context/NotesContext'; // Import the hook

function WelcomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [tabIndex, setTabIndex] = useState(0);
  const { notes, handleNotesChange } = useNotes(); // Use the hook

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

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
