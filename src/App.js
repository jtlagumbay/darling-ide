import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import HeaderImg from './images/header.png';
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
  

  return (
    <div className="App">
      {/* header */}
      <div>
        <img src={HeaderImg} alt="darling" className='logo' />
      </div>

      <div className='main'>
        {/* guide bar */}
        <div className='guide'>
          <header>Guide</header>

          {/* guide content */}
          <div className='guide-content'>
            <p>Note: Always say “please” at the end of the voiced instruction because it serves as the <strong>ENTER</strong> key</p>
            <p>When opening a file, you need to say, <strong>“Honey, open the folder, please”</strong></p>
          </div>
        </div>

        {/* content */}
        <div className='content'>
          <Header />
          <TextEditor transcript={transcript} />
          <VoiceCommands setTranscript={setTranscript} />
        </div>
      </div>
    </div>
  );
}

export default App;
