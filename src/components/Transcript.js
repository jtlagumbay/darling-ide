import React, { useState, useEffect } from 'react';

const commandOutput = {
    'new file': 'creating new file...',
    'open file': 'opening file...',
    'undo': 'undoing last action...',
    'redo': 'redoing last action...',
    'cut': 'cut text',
    'copy': 'copied text',
    'paste': 'pasted text'
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
      if (!foundCommand) { setOutput(transcript);}
      setIsCommand(foundCommand);
      
      if (foundCommand) { setKey(prevKey => prevKey + 1);}
    }, [transcript]);
    
    console.log("test")
    console.log(transcript)
    console.log(output)

    return (
      <div key={key} className={`transcript-cont ${isCommand ? 'bounce' : ''}`}> 
        <p> {output || 'No command'} </p>
      </div>
    );
  }


