import React, {useState, useEffect } from 'react';  
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import OnIcon from '@mui/icons-material/Mic';
import OffIcon from '@mui/icons-material/MicOff';
import { commands } from './commands';
import Transcript from './Transcript';

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [script, setScript] = useState('');
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.includes('please')) {
      setIsListening(false);
      setScript(transcript.replace('please', '').toLowerCase());
      resetTranscript();
    }


    if(transcript.includes('honey')) {
      setIsListening(true);
      resetTranscript();
    }
  
  }, [transcript]);

  useEffect(() => {
    commands.forEach(({ command, callback }) => {
      if (script.toLowerCase().includes(command)) {
        callback();
        // setScript('');
      }
    });
  }, [script]);

  useEffect(() => {
    if(!listening)
      SpeechRecognition.startListening({ autoStart: true, continuous: true });
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='voice-cont'>
        <Transcript transcript={script || 'Say something...'}/>
      <button onClick={() => setIsListening(prevState => !prevState)} className='mic-icon'>
        {isListening ?
          <OnIcon fontSize='large' /> : 
          <OffIcon fontSize='large' />}
      </button>
    </div>
  );
};

export default VoiceCommands;