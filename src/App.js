import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import Menubar from './components/Menubar';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './images/header.png';
import './App.css';
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from './utils';
import Guide from './components/Guide';

function App() {
  const [transcript, setTranscript] = useState('');
  useEffect(() => {
    const storedFileContent = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT);
    if (storedFileContent) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, storedFileContent)
    }
  }, []);
  
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 20000); // 20 seconds

    return () => clearTimeout(timer); 
  }, []);

  if (showWelcomeScreen) {
    return <WelcomeScreen />;
  }

  return (
    <div className="App">
      <div className='left-component'>
        {/* header */}
        <img src={Header} alt="darling" className='logo' />

        <Guide />
      </div>
        

        {/* content */}
        <div className='right-component'>
          <Toolbar />
          <TextEditor />
          <VoiceCommands />
        </div>
    </div>
  );
}

export default App;
