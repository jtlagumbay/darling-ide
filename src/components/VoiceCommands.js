import React, {useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import OnIcon from '@mui/icons-material/Mic';
import OffIcon from '@mui/icons-material/MicOff';

const commands = [
  {
    command: 'copy',
    callback: () => {
      document.getElementById('MENU-COPY').click();
    }
  },
  {
    command: 'paste',
    callback: () => {
      document.getElementById('MENU-PASTE').click();
    }
  }
]

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
  
    console.log(transcript)
  }, [transcript]);

  useEffect(() => {
    commands.forEach(({ command, callback }) => {
      if (script.toLowerCase().includes(command)) {
        callback();
        setScript('');
      }
    });
  }, [script]);

  useEffect(() => {
    console.log(listening)
    if(!listening)
      SpeechRecognition.startListening({ autoStart: true, continuous: true });
  }, [listening]);

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