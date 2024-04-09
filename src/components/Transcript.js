import React, { useState, useEffect } from 'react';

const commandOutput = {
    'new file': 'creating new file...',
    'open file': 'opening file...',
    'save': 'saving file...',
    'save as': 'saving file as...',
    'undo': 'undo last action...',
    'redo': 'redo last action...',
    'cut': 'cut text',
    'copy': 'copied text',
    'paste': 'pasted text',
    'zoom in': 'zoomed in',
    'zoom out': 'zoomed out'
}

export default function Transcript({ transcript }) {
    const [output, setOutput] = useState(transcript);
    const [isCommand, setIsCommand] = useState(false);
    const [key, setKey] = useState(0);
  
    useEffect(() => {
      let foundCommand = false;
      Object.keys(commandOutput).forEach(command => {
        if (transcript && transcript.includes(command)) {
          setOutput(commandOutput[command]);
          foundCommand = true;
        }
      });
      if (!foundCommand) { 
        setIsCommand(false)
        setOutput(transcript);
      } else {
        setIsCommand(foundCommand);
        setKey(prevKey => prevKey + 1);
      }
    }, [transcript]);
    
    console.log("trascript:", transcript)
    console.log("output:", output)

    return (
      <div key={key} className={`transcript-cont ${isCommand ? 'bounce' : ''}`}> 
        <p className={!isCommand ? 'italic' : ''}> {output} </p>
      </div>
    );
}