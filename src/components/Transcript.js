import React, { useState, useEffect } from 'react';

const commandOutput = {
    'new file': 'created new file',
    'open file': 'opening file...',
    'save': 'saving file...',
    'save as': 'saving file as...',
    'undo': 'last action undone',
    'redo': 'last action redone',
    'cut': 'cut text',
    'copy': 'copied text',
    'paste': 'pasted text',
    'zoom in': 'zoomed in',
    'zoom out': 'zoomed out',
    'select all': 'selected all text',
    'deselect': 'deselected text',
    'enter': 'entered',
    'delete': 'deleted text',
    'delete all': 'deleted all text',
    'bold': 'bolded text',
    'italic': 'italicized text',
    'strike': 'striked through text',
    'code': 'coded text',
    'bullets': 'bulleted text',
    'numbers': 'added numbers',
    'block': 'added block',
    'type': 'typed text'
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
  

    return (
      <div key={key} className={`transcript-cont ${isCommand ? 'bounce' : ''}`}> 
        <p className={!isCommand ? 'italic' : ''}> {output} </p>
      </div>
    );
}
