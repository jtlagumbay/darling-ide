import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import React, { useState, useEffect } from 'react';

export default function Menubar({ transcript, cursorPosition }) {
  /** File Functionalities **/ 

  /** Zoom Functionalities **/ 
  const [zoomLevel, setZoomLevel] = useState(100); // Initial zoom level

  const handleZoomIn = () => {
    setZoomLevel(prev => prev+=5)
    console.log("in "+zoomLevel)
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => prev-=5)
    console.log("out "+zoomLevel)
  };

  useEffect(() => {
    document.body.style.zoom = zoomLevel+'%';
  }, [zoomLevel])

  return (
    <div className="container menubar-container" >
      <button className="menubar-button">
        <NoteAddIcon />
        <span className="menubar-button-label">New</span>
      </button>
      <button className="menubar-button">
        <NoteAddIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Open</span>
      </button>
      <button className="menubar-button">
        <SaveIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Save</span>
      </button>
      <button className="menubar-button">
        <SaveAsIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Save As</span>
      </button>
      <div className="vertical-division"/>
      <button className="menubar-button">
        <UndoIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Undo</span>
      </button>
      <button className="menubar-button">
        <RedoIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Redo</span>
      </button>
      <button className="menubar-button">
        <ContentCutIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Cut</span>
      </button>
      <button className="menubar-button">
        <ContentCopyIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Copy</span>
      </button>
      <button className="menubar-button">
        <ContentPasteIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Paste</span>
      </button>
      <div className="vertical-division"/>
      <button className="menubar-button" onClick={handleZoomIn}>
        <ZoomInIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Zoom in</span>
      </button>
      <button className="menubar-button" onClick={handleZoomOut}>
        <ZoomOutIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Zoom out</span>
      </button>
     </div>
  )
}