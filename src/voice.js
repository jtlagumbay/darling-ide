import React from 'react';
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
  // Add more commands as needed
];

const VoiceCommands = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceCommands;