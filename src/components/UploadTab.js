import React, { useState } from 'react';
import {
  Text,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';

import { useNotes } from '../context/NotesContext'; 
import transcribeAudio from '../services/transcriptionService';

function UploadTab() {
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const maxFileSize = 25 * 1024 * 1024;
  const { notes, handleNotesChange } = useNotes();

  const updateNotes = (newText) => {
    const event = { target: { value: newText } };
    handleNotesChange(event);
  };

  const validateFile = (file) => {
    const validFileTypes = ['mp3', 'mp4', 'mpeg', 'mpga', 'm4a', 'wav', 'webm'];
    const fileExtension = file.name.split('.').pop().toLowerCase();
  
    if (!validFileTypes.includes(fileExtension)) {
      toast({
        title: 'Invalid file type',
        description: 'Only mp3, mp4, mpeg, mpga, m4a, wav, and webm files are allowed.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  
    if (file.size > maxFileSize) {
      toast({
        title: 'File too large',
        description: 'File size should be less than 25MB.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  
    return true;
  };
  
  const handleFileChange = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      toast({
        title: 'File Upload',
        description: `${file.name} has been uploaded.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleSubmitForTranscription = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to transcribe.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const apiKey = localStorage.getItem('apiKey');

    try {
      const formData = new FormData();

      formData.append('file', selectedFile);
      const transcriptionResult = await transcribeAudio(selectedFile, apiKey);

      updateNotes(transcriptionResult.text);

      toast({
        title: 'Transcription Successful',
        description: 'The file has been transcribed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        title: 'Transcription Failed',
        description: 'There was an error transcribing the file.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
        <Text mt={2} mb={4}>
          Share your language accomplishments or import existing audio files with the "Upload" function. Personalize your learning experience and engage with conversational partners' voices.
        </Text>
        <Box
          border="2px dashed gray"
          borderRadius="lg"
          p={4}
          mt={4}
          textAlign="center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {selectedFile && <Text fontSize="md">{selectedFile.name}</Text>}

          <Text mt={2} color="gray.600">
            {selectedFile ? 'File selected' : 'Drag & Drop Your File Here or Click to Browse'}
          </Text>
          
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileChange(e.target.files[0]);
              }
            }}
            id="file-input"
            disabled={!!selectedFile}
          />
          <label htmlFor="file-input">
            <Button
              mt={4}
              colorScheme="teal"
              variant="outline"
              as="span"
              disabled={!!selectedFile}
            >
              Browse
            </Button>
          </label>
          {selectedFile && (
            <Button
              mt={4}
              ml={2}
              colorScheme="red"
              variant="outline"
              onClick={handleDeleteFile}
            >
              Delete File
            </Button>
          )}
        </Box>

        {selectedFile && (
        <Button
          mt={4}
          colorScheme="blue"
          onClick={handleSubmitForTranscription}
        >
          Submit for Transcription
        </Button>
      )}

    </div>
  );
}

export default UploadTab;
