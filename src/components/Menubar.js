import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UndoIcon from '@mui/icons-material/Undo';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useCurrentEditor } from "@tiptap/react";
import React, { useEffect, useRef, useState } from 'react';

export default function Menubar() {
  const { editor } = useCurrentEditor();
  const [zoomLevel, setZoomLevel] = useState(100); // Initial zoom level
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const fileInputRef = useRef(null);

  /** New/Open File Functionalities **/
  const handleNewFile = (event) => {
    if (!unsavedChanges) {
      // Clear the content of the editor
      editor.commands.clearContent();
    } else {
      const confirmNewFile = window.confirm("There are unsaved changes. Are you sure you want to create a new file?");
      if (confirmNewFile) {
        // Clear the content of the editor
        editor.commands.clearContent();
        // Reset unsavedChanges state
        setUnsavedChanges(false);
      } 
    }
  }

  const handleOpenFile = () => {
    if (unsavedChanges) {
      const confirmOpenFile = window.confirm("There are unsaved changes. Are you sure you want to open a new file?");
      if (!confirmOpenFile) { 
        return
      }
    } 
    fileInputRef.current.click()
  }
  const openFileExplorer = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;
      editor.commands.setContent(fileContent);
    };

    reader.readAsText(file);
  };

  const handleSave = () => {
    handleSaveAs()
  }

  /** Save/As Functionalities **/
  const handleSaveAs = () => {
    // Get the HTML content of the editor
    const content = editor.getText();
    console.log(content)
    // Create a Blob object containing the HTML content
    const blob = new Blob([content], { type: 'text/html' });

    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'document.txt';
    
     // Listen for the download start event
    anchor.addEventListener('click', () => {
      // Update unsavedChanges only if the download starts
      setUnsavedChanges(false);
    });
    
    // Programmatically click the anchor element to start the download
    anchor.click();
    
    // Clean up by revoking the object URL
    URL.revokeObjectURL(anchor.href);

    // reset unsaved changes
    setUnsavedChanges(false)
  };

  /** Undo Redo Functionalities **/
  const handleUndo = () => {
    console.log("undo")
    editor.commands.undo();
  };

  const handleRedo = () => {
    console.log("redo")
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

  /** Extra Commands **/
  const handleSelectAll = () => {
    editor.chain().focus().selectAll().run();
  };

  const handleDelete = () => {
    editor.chain().focus().clearContent().run();
  };

  const handleEnter = () => {
    editor.commands.newlineInCode();
  }

  useEffect(() => {
    document.body.style.zoom = zoomLevel+'%';
  }, [zoomLevel])

  const handleChange = () => {
    // Set unsavedChanges to true when changes are made
    setUnsavedChanges(true);
  };

  // Attach handleChange to editor's change event
  editor.on('transaction', () => {
    handleChange();
  });



  if (!editor) {
    return null;
  }
  return (
    <div className="container menubar-container" >
      <button id="MENU-NEW" className="menubar-button" onClick = {handleNewFile}>
        <NoteAddIcon />
        <span className="menubar-button-label">New</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={openFileExplorer}
      />
      <button id="MENU-OPEN" className="menubar-button" onClick={handleOpenFile}>
        <NoteAddIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Open</span>
      </button>
      <button id="MENU-SAVE" className="menubar-button" onClick={handleSave} disabled={!unsavedChanges}>
        <SaveIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Save</span>
      </button>
      <button id="MENU-SAVE-AS" className="menubar-button" onClick={handleSaveAs} disabled={!unsavedChanges}>
        <SaveAsIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Save As</span>
      </button>
      <div className="vertical-division"/>
      <button id="MENU-UNDO" className="menubar-button" onClick={handleUndo} disabled={!editor.can().undo()}>
        <UndoIcon className="menubar-button-icon"/>
        <span className="menubar-button-label" >Undo</span>
      </button>
      <button id="MENU-REDO" className="menubar-button" disabled={!editor.can().redo()} onClick={handleRedo}>
        <RedoIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Redo</span>
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
      <button id="MENU-SELECT-ALL" onClick={handleSelectAll} hidden />
      <button id="MENU-DELETE" onClick={handleDelete} hidden />
      <button id="MENU-ENTER" onClick={handleEnter} hidden />
     </div>
  )
}