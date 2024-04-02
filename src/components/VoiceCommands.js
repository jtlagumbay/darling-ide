import React, {useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import OnIcon from '@mui/icons-material/Mic';
import OffIcon from '@mui/icons-material/MicOff';

const VoiceCommands = ({ setTranscript }) => {
  const [isListening, setIsListening] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.includes('please')) {
      setIsListening(false);
      resetTranscript();
    }

    if(transcript.includes('honey')) {
      setIsListening(true);
      resetTranscript();
    }
    
    setTranscript(transcript)
    console.log(transcript)
  }, [transcript]);

  useEffect(() => {
    if (isListening) {
      SpeechRecognition.startListening({ autoStart: true, continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [isListening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='voice-cont'>
      <button onClick={() => setIsListening(prevState => !prevState)} className='mic-icon'>
        {isListening ?
          <OnIcon fontSize='large' /> : 
          <OffIcon fontSize='large' />}
      </button>

      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
    </div>
  );
};

export default VoiceCommands;