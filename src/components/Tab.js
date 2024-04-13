import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { cleanInputForId, getLocalStorageItem, LOCAL_STORAGE_KEYS } from "../utils"
import Modal from './Modal/Modal';
import './Modal/Modal.css';

export default function Tab({ name, isSelected, onTabDelete, onTabChangeName, onTabClick, hasUnsavedChanges, id}) {
  const [tabName, setTabName] = useState(name);
  const [error, setError] = useState(false);
  const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);

  const handleChange = (e) => {
    setTabName(e.target.value);
  };

  const handleBlur = () => {
    var tabs = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST)
    if (tabs.some(tab => tab.name === tabName && tab.key !== id)) {
      setError(true)
      setTimeout(() => {
        setTabName(name)
        setError(false)
      }, 1500)
      console.log(tabs)
    } else {
      onTabChangeName(tabName);
      setError(false)
    }
  };

  const handleTabDelete = () => {
    if(hasUnsavedChanges){
      setIsClosedModalOpen(true);
    } else {
      onTabDelete();
    }
  }

  const handleCloseModalConfirm = () => {
    onTabDelete();
    setIsClosedModalOpen(false);
  }

  return (
    <div className={isSelected ? "tab-container-active" : "tab-container-inactive"}>
      <div className="tab-name-cont " onClick={onTabClick} id={"TAB-CONTAINER-" + cleanInputForId(tabName)}>
      {error && <span className='tab-name-error'>Name already used.</span>}
        <input
          id={"TAB-INPUT-"+cleanInputForId(tabName)}
          value = {tabName}
          type = "text"
          readOnly={!isSelected}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${isSelected ? "tab-name-input-editable" : "tab-name-input-readonly"} ${hasUnsavedChanges ? "italicize" : ""}`}
        />
      </div>
      <div className="tab-close-cont" onClick={handleTabDelete} id={"TAB-CLOSE-"+cleanInputForId(tabName)}>
        <CloseIcon  className="tab-close" fontSize='small' />
      </div>
      
      {/* Modal for Closing the Tab with Unsaved Changes */}
      <Modal 
        isOpen={isClosedModalOpen}
        onClose={() => setIsClosedModalOpen(false)}
        headerText="Unsaved Changes"
        content="There are unsaved changes. Are you sure you want to close the tab?"
        buttonText1="No"
        buttonText2="Yes"
        onCancel={() => setIsClosedModalOpen(false)}
        onConfirm={handleCloseModalConfirm}
      />
    </div>
  )
}