import React, { useEffect, useState } from 'react';
import Toolbar from './components/Toolbar';
import TextEditor from './components/TextEditor';
import VoiceCommands from './components/VoiceCommands';
import Menubar from './components/Menubar';
import WelcomeScreen from './components/WelcomeScreen';
import Header from './images/header.png';
import './App.css';
import Guide from './components/Guide';

function App() {
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
          <Toolbar />
          <TextEditor />
          <VoiceCommands />
        </div>
    </div>
  );
}

export default App;
