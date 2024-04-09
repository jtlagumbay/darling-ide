import React, { useEffect, useState } from 'react';
import './App.css';
import Guide from './components/Guide';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import WelcomeScreen from './components/WelcomeScreen';
import HeaderImg from './images/header.png';
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from './utils';

function App() {
  const [transcript, setTranscript] = useState('');
  useEffect(() => {
    const storedFileContent = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT);
    if (storedFileContent) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, storedFileContent)
    }

    const fileList = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST)
    if (!fileList) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, [])
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
        <img src={HeaderImg} alt="darling" className='logo' />

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
