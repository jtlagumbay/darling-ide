import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import Menubar from './components/Menubar';
import Header from './images/header.png';
import './App.css';
import Modal from './components/Modal/Modal';
import './components/Modal/Modal.css';

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
            <p className='note'>Note: Always say <strong>"please"</strong> at the end of the voiced instruction because it serves as the <strong>ENTER</strong> key</p>
            <p>When opening a file, you need to say, <strong>“Honey, open new file, please”</strong></p>
            <p>When opening an existing file, you need to say, <strong>“Honey, open the folder, please”</strong></p>
            <p>When saving a file, you need to say, <strong>“Honey, save the file, please”</strong></p>
            <p>When saving as a new file, you need to say, <strong>“Honey, save as new file, please”</strong></p>
            <p>When undoing, you need to say, <strong>“Honey, undo, please”</strong></p>
            <p>When redoing, you need to say, <strong>“Honey, redo, please”</strong></p>
            <p>When cutting, you need to say, <strong>“Honey, cut, please”</strong></p>
            <p>When pasting, you need to say, <strong>“Honey, paste, please”</strong></p>
            <p>When zooming out, you need to say, <strong>“Honey, zoom out, please”</strong></p>
            <p>When zooming in, you need to say, <strong>“Honey, zoom in, please”</strong></p>
            <p>When closing, you need to say, <strong>“Honey, close, please”</strong></p>
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
