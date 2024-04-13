import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import RedoIcon from '@mui/icons-material/Redo';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import UndoIcon from '@mui/icons-material/Undo';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import DownloadIcon from '@mui/icons-material/Download';
import { useCurrentEditor } from "@tiptap/react";
import React, { useState, useEffect, useRef } from 'react';
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem, generateUniqueTabName } from '../utils';
import Modal from './Modal/Modal';
import './Modal/Modal.css';

export default function Menubar({ onTabAdd, onTabSave,
  enableSaveAs, unsavedChanges
}) {
  const { editor } = useCurrentEditor();
  const [zoomLevel, setZoomLevel] = useState(100); // Initial zoom level
  const [isSaveAsModelOpen, setIsSaveAsModelOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloadConfirm, setIsDownloadConfirm] = useState(false);
  const [fileNameInput, setFileNameInput] = useState('');
  const fileInputRef = useRef(null);

  /** New/Open File Functionalities **/
  const handleNewFile = (event) => {
    onTabAdd()
  }

  const handleOpenFile = () => {
    fileInputRef.current.click()
  }

  const openFileExplorer = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    else {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME, file["name"])
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fileContent = reader.result;
      onTabAdd(file["name"], fileContent)
    };

    reader.readAsText(file);
  };

  /** Save/As Functionalities **/

  const handleSave = () => {
    // saveFile()
    onTabSave()
  }

  const handleDownload = () => {
    /* modal to check if there are no unsaved changes */
    if(unsavedChanges){
      setIsDownloadModalOpen(true);
    } else {
      setIsDownloadConfirm(true);
    }
  }

  const handleConfirmDownload = () => {
    saveFile();
    setIsDownloadModalOpen(false);
    setIsDownloadConfirm(false);
  }

  const handleSaveAs = () => {
    /* modal to ask for file name using input field */
    setFileNameInput('');
    setIsSaveAsModelOpen(true);
  }

  const handleConfirmSaveAs = () => {
    let newFileName = fileNameInput;
    let fileContent = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT);

    if (!newFileName) {
      newFileName = generateUniqueTabName(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST));
    }

    // Add the new tab with the file name
    onTabAdd(newFileName, fileContent);

    // Close the modal
    setIsSaveAsModelOpen(false);
  }

  const saveFile = () => {
    const content = editor.getHTML();
    const blob = new Blob([content], { type: 'text' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME);
    
    // Programmatically click the anchor element to start the download
    anchor.click();
    
  };

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
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => prev-=5)
  };

  /** Extra Commands **/
  const handleSelectAll = () => {
    editor.chain().focus().selectAll().run();
  };

  const handleDelete = () => {
    const { from, to } = editor.state.selection;

    if(from === to) {
      editor.chain().focus().setTextSelection({from: from - 1, to: to}).run();
    }

    editor.chain().focus().deleteSelection().run();
  };

  const handleDeleteAll = () => {
    editor.chain().focus().clearContent().run();
  }

  const handleEnter = () => {
    editor.chain().focus().enter().run();
  }

  const handleDeselect = () => {
    editor.chain().focus().selectTextblockEnd().run();
  }

  const handleTyping = () => {
    const element = document.getElementById('MENU-TYPE');
    const text = element.dataset.text;
    editor.chain().focus().insertContent(text).run();
  }

  useEffect(() => {
    document.body.style.zoom = zoomLevel+'%';
  }, [zoomLevel])
  

  if (!editor) {
    return null;
  }
  return (
    <div className="container menubar-container" >
      <button id="MENU-NEW" className="menubar-button" onClick = {handleNewFile}>
        <NoteAddIcon />
        <span className="menubar-button-label">New File</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        accept='.txt'
        style={{ display: 'none' }}
        onChange={openFileExplorer}
      />
      <button id="MENU-OPEN" className="menubar-button" onClick={handleOpenFile}>
        <FileOpenIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Open File</span>
      </button>
      <button id="MENU-SAVE" className="menubar-button" onClick={handleSave} disabled={!unsavedChanges}>
        <SaveIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Save File</span>
      </button>
      <button id="MENU-SAVE-AS" className="menubar-button" onClick={handleSaveAs} disabled={!enableSaveAs}>
        <SaveAsIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Save As File</span>
      </button>
      <button id="MENU-DOWNLOAD" className="menubar-button" onClick={handleDownload} disabled={!enableSaveAs}>
        <DownloadIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Download</span>
      </button>

      {/* Modal for Save As File */}
      <Modal 
        isOpen={isSaveAsModelOpen}
        onClose={() => setIsSaveAsModelOpen(false)}
        headerText="Save File As"
        content="Please enter the name of the file."
        inputField={
          <input
            type='text'
            value={fileNameInput}
            placeholder='Please enter the file name...'
            onChange={(e) => setFileNameInput(e.target.value)}
          />
        }
        buttonText1="Cancel"
        buttonText2="Save"
        onCancel={() => setIsSaveAsModelOpen(false)}
        onConfirm={handleConfirmSaveAs}
      />

      {/* Modal for Download File with Unsaved Changes */}
      <Modal 
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        headerText="Unsaved Changes"
        content="There are unsaved changes. Are you sure you want to download the file? The contents will be automatically saved."
        buttonText1="No"
        buttonText2="Yes"
        onCancel={() => setIsDownloadModalOpen(false)}
        onConfirm={handleConfirmDownload}
      />

      {/* Modal for Download File with NO Unsaved Changes*/}
      <Modal 
        isOpen={isDownloadConfirm}
        onClose={() => setIsDownloadConfirm(false)}
        headerText="Download File"
        content="Are you sure you want to download the file?"
        buttonText1="No"
        buttonText2="Yes"
        onCancel={() => setIsDownloadConfirm(false)}
        onConfirm={handleConfirmDownload}
      />


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
        <span className="menubar-button-label">Zoom In</span>
      </button>
      <button id="MENU-ZOOM-OUT" className="menubar-button" onClick={handleZoomOut}>
        <ZoomOutIcon className="menubar-button-icon"/>
        <span className="menubar-button-label">Zoom Out</span>
      </button>
      <button id="MENU-SELECT-ALL" onClick={handleSelectAll} hidden />
      <button id="MENU-DESELECT" onClick={handleDeselect} hidden />
      <button id="MENU-DELETE" onClick={handleDelete} hidden />
      <button id="MENU-DELETE-ALL" onClick={handleDeleteAll} hidden />
      <button id="MENU-ENTER" onClick={handleEnter} hidden />
      <button id="MENU-TYPE" onClick={handleTyping} hidden />
     </div>
  )
}