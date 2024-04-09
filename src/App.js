import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import Menubar from './components/Menubar';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './images/header.png';
import './App.css';
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from './utils';

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
      localStorage.setItem('showWelcomeScreen', 'true');
    }, 19000); // 19 seconds

    return () => clearTimeout(timer); 
  }, [showWelcomeScreen]);

  if (localStorage.getItem('showWelcomeScreen') === null){
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
          <Header />
          <TextEditor />
          <VoiceCommands />
        </div>
    </div>
  );
}

export default App;
