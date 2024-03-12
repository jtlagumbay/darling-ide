import React from 'react';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';

import Header from './images/header.png';
import './App.css';

function App() {
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
            <p>Note: Always say “please” at the end of the voiced instruction because it serves as the <text style={{fontWeight: 'bold'}}>ENTER</text> key</p>
            <p>When opening a file, you need to say, <text style={{fontWeight: 'bold'}}>“Honey, open the folder, please”</text></p>
          </div>
        </div>

        {/* content */}
        <div className='content'>
          <Toolbar />
          <TextEditor />
          <VoiceCommands />
        </div>
      </div>
    </div>
  );
}

export default App;
