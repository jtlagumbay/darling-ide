import React, {useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
    callback: ( {resetTranscript }) => resetTranscript(),
    isFuzzyMatch: false, // The spoken phrase must be a perfect match
    fuzzyMatchingThreshold: 0, // The spoken phrase must be a perfect match
    bestMatchOnly: true // Only the best match is returned
  },
  // Add more commands as needed
];

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
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
      <button onClick={() => setIsListening(prevState => !prevState)}>
        {listening ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceCommands;