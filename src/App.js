import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import Menubar from './components/Menubar';
import Header from './images/header.png';
import './App.css';
import Guide from './components/Guide';

function App() {

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
