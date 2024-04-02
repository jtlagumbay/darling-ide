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
import { useCurrentEditor } from "@tiptap/react";
import React, { useState, useEffect } from 'react';

export default function Menubar() {
  const { editor } = useCurrentEditor();
  const [zoomLevel, setZoomLevel] = useState(100); // Initial zoom level

  /** Undo Redo Functionalities **/
  const handleUndo = () => {
    editor.commands.undo();
  };

  const handleRedo = () => {
    editor.commands.redo();
  };

  /** Cut Copy Paste Functionalities **/
  const handleCopy = async () => {
    try {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);
      await navigator.clipboard.writeText(text)
    } catch (error) {
      console.error('Failed to perform copy operation:', error);
    }
  };

  const handlePaste = async (event) => {
    event.preventDefault();
    try {
      const text = await navigator.clipboard.readText();
      console.log(text)
      editor.chain().focus().insertContent(text).run()
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleCut = async () => {
    try {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to);
      
      // Remove the selected text
      editor.chain().focus().deleteSelection().run();
      
      // Copy the selected text to the clipboard
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to perform cut operation:', error);
    }
  };

  /** Zoom Functionalities **/ 
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


  if (!editor) {
    return null;
  }
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
      <button id="MENU-UNDO" className="menubar-button">
        <UndoIcon className="menubar-button-icon"/>
        <span className="menubar-button-label" onClick={handleUndo}>Undo</span>
      </button>
      <button id="MENU-REDO" className="menubar-button">
        <RedoIcon className="menubar-button-icon"/>
        <span className="menubar-button-label" onClick={handleRedo}>Redo</span>
      </button>
      <button id="MENU-CUT" className="menubar-button" onClick={handleCut}>
        <ContentCutIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Cut</span>
      </button>
      <button id="MENU-COPY" className="menubar-button" onClick={handleCopy}>
        <ContentCopyIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Copy</span>
      </button>
      <button id="MENU-PASTE" className="menubar-button" onClick={handlePaste}>
        <ContentPasteIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Paste</span>
      </button>
      <div className="vertical-division"/>
      <button id="MENU-ZOOM-IN" className="menubar-button" onClick={handleZoomIn}>
        <ZoomInIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Zoom in</span>
      </button>
      <button id="MENU-ZOOM-OUT" className="menubar-button" onClick={handleZoomOut}>
        <ZoomOutIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Zoom out</span>
      </button>
     </div>
  )
}