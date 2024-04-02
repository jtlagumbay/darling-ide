import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import Menubar from './components/Menubar';
import Header from './images/header.png';
import './App.css';

function App() {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    console.log("off: " + transcript);
  }, [transcript])

  return (
    <div className="App">
      {/* header */}
      <div>
        <img src={Header} alt="darling" className='logo' />
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
          <Toolbar />
          <TextEditor transcript={transcript} />
          <VoiceCommands setTranscript={setTranscript} />
        </div>
      </div>
    </div>
  );
}

export default App;
