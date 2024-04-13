import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { cleanInputForId, getLocalStorageItem, LOCAL_STORAGE_KEYS } from "../utils"

export default function Tab({ name, isSelected, onTabDelete, onTabChangeName, onTabClick, hasUnsavedChanges }) {
  const [tabName, setTabName] = useState(name);
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setTabName(e.target.value);
  };

  const handleBlur = () => {
    var tabs = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST)
    if(!tabs.some(tab => tab.name === tabName)){
      onTabChangeName(tabName);
      setError(false)
    } else {
      setError(true)
      setTimeout(() => {
        setTabName(name)
        setError(false)
      }, 1500)
    }
  };


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
      <div className="tab-close-cont" onClick={onTabDelete} id={"TAB-CLOSE-"+cleanInputForId(tabName)}>
        <CloseIcon  className="tab-close" fontSize='small' />
      </div>
      
    </div>
  )
}