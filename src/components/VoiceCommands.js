import React, {useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import OnIcon from '@mui/icons-material/Mic';
import OffIcon from '@mui/icons-material/MicOff';

const commands = [
  {
    command: 'go back',
    callback: () => window.history.back()
  },
  {
    command: 'go forward',
    callback: () => window.history.forward()
  },
  {
    command: 'Please',
    callback: ( { setIsListening }) => setIsListening(false),
    isFuzzyMatch: true, // The spoken phrase can be not a perfect match
    fuzzyMatchingThreshold: 50, // The spoken phrase can be not a perfect match
    bestMatchOnly: true // Only the best match is returned
  },
  {
    command: 'Honey',
    callback: ({ setIsListening, resetTranscript }) => {
      setIsListening(true);
      resetTranscript();
    },
    isFuzzyMatch: true,
    fuzzyMatchingThreshold: 50,
    bestMatchOnly: true
  },
  // Add more commands as needed
];

const VoiceCommands = ({ setTranscript }) => {
  const [isListening, setIsListening] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (transcript.includes('please')) {
      setIsListening(false);
    }

    setTranscript(transcript);
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
        {listening ?
          <OnIcon fontSize='large' /> : 
          <OffIcon fontSize='large' />}
      </button>

      {/* <button onClick={resetTranscript}>Reset</button> */}
      {/* <p>{transcript}</p> */}
    </div>
  );
};

export default VoiceCommands;