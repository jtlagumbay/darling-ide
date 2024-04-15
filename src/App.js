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

  // make the welcome screen component appear for 19 seconds
  useEffect(() => {
    // after 19 seconds, record locally that welcome screen has been shown 
    // to avoid showing it again when the user refreshes
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
      localStorage.setItem('showWelcomeScreen', 'true');
    }, 19000); // 19 seconds

    return () => clearTimeout(timer);
    // call this hook every time showWelcomeScreen changes value 
  }, [showWelcomeScreen]);

  // if the welcome screen has not been shown, display the welcome screen
  if (localStorage.getItem('showWelcomeScreen') === null){
    return <WelcomeScreen />;
  }

  return (
    <div className="App">
      {/* holds the left components of the screen */}
      <div className='left-component'>
        {/* header */}
        <img src={HeaderImg} alt="darling" className='logo' />

        <Guide />
      </div>
        

        {/* holds the right ccomponent of the screen */}
        <div className='right-component'>
          <Header />
          <TextEditor />
          <VoiceCommands />
        </div>
    </div>
  );
}

export default App;
