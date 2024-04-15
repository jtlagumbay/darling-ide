// imports
import React, { useEffect, useState } from 'react';
import './App.css';
import Guide from './components/Guide';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import WelcomeScreen from './components/WelcomeScreen';
import HeaderImg from './images/header.png';
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from './utils';

/**
 * 
 * @returns Main component of the application
 */
function App() {
  // a react hook component to set the initial file content and file list
  useEffect(() => {
    // fetch the stored file content
    const storedFileContent = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT);

    // if there is a stored file content, set it to the initial content
    if (storedFileContent) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, storedFileContent)
    }

    // fetch the stored file list
    const fileList = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST)
    
    // if there is no file list, create an empty file list 
    if (!fileList) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, [])
    }
  }, []);
  
  // initialize welcome screen component
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  // make the welcome screen component appear for 15 seconds
  useEffect(() => {
    // after 15 seconds, record locally that welcome screen has been shown 
    // to avoid showing it again when the user refreshes
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false); 
      localStorage.setItem('show_welcome_screen', 'true'); 
    }, 15000);
    return () => clearTimeout(timer); 
  }, [showWelcomeScreen]);

  if (localStorage.getItem('show_welcome_screen') === null){
    return <WelcomeScreen />;
  }

  return (
    <div className="App">
      {/* holds the left components of the screen */}
      <div className='left-component'>
        {/* logo */}
        <img src={HeaderImg} alt="darling" className='logo' />

        {/* guide */}
        <Guide />
      </div>
        

        {/* holds the right components of the screen */}
        <div className='right-component'>
          {/* contains toolbar and menubar */}
          <Header />

          {/* text editor */}
          <TextEditor />

          {/* voice commands */}
          <VoiceCommands />
        </div>
    </div>
  );
}

export default App;
