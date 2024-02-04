import React, { useState, useEffect } from 'react';
import { Button, Box, Text, Flex, Spacer } from '@chakra-ui/react';
import { useNotes } from '../context/NotesContext'; 

import transcribeAudio from '../services/transcriptionService';

function RecordTab() {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingText, setRecordingText] = useState('');
  const { notes, handleNotesChange } = useNotes(); 

  const updateNotes = (newText) => {
    const event = { target: { value: newText } };
    handleNotesChange(event);
  };
  
  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);

  const startRecording = async () => {
    try {

      updateNotes('');

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
  
      let chunks = [];
  
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
  
      recorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
      
        const apiKey = localStorage.getItem('apiKey');
      
        try {
          const transcriptionResult = await transcribeAudio(audioBlob, apiKey);
          console.log('Transcription:', transcriptionResult);

          updateNotes(transcriptionResult.text);

        } catch (error) {
          console.error('Error transcribing audio:', error);
        }
      };
        
      recorder.start();
      setMediaRecorder(recorder);
      setAudioChunks(chunks);
      setRecordingText('Recording...');
    } catch (error) {
      if (error.name === "NotAllowedError") {
        alert("Microphone access is denied. Please allow microphone access to start recording.");
      } else {
        console.error('Error accessing microphone:', error);
      }
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setRecordingText('');

      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleRecordClick = () => {
    setIsRecording(!isRecording);
  };

  return (
    <Box p={2}>
      <Text mb={4}>
        Record your voice by clicking the button below. You can stop the recording at any time. You can speak in any language.
      </Text>

      <Flex justifyContent="center" mb={4}>
        <Button
          onClick={handleRecordClick}
          colorScheme={isRecording ? 'red' : 'blue'}
          size="lg"
          width="200px"
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </Flex>

      {recordingText && (
        <Flex alignItems="center">
          <Text fontSize="lg">{recordingText}</Text>
          <Spacer />
          <div className="spinner" />
        </Flex>
      )}
    </Box>
  );
}

export default RecordTab;
