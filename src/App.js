import React from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import Speech from './components/Speech';
import VoiceCommands from './voice';

function App() {
  return (
    <div className="App">
      <Toolbar />

      <div className='main'>
        <TextEditor />
        <Speech />
        <VoiceCommands />
      </div>
    </div>
  );
}

export default App;
