import axios from 'axios';

const TRANSCRIPTION_API_URL = 'https://api.openai.com/v1/audio/transcriptions';

const transcribeAudio = async (file, apiKey) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', 'whisper-1');

  try {
    const response = await axios.post(TRANSCRIPTION_API_URL, formData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in transcribing audio:', error);
    throw error;
  }
};

export default transcribeAudio;
