import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { cleanInputForId } from "../utils"
export default function Tab({ name, isSelected, onTabDelete, onTabChangeName, onTabClick, hasUnsavedChanges }) {
  const [tabName, setTabName] = useState(name);
  const handleChange = (e) => {
    setTabName(e.target.value);
  };

  const handleBlur = () => {
    onTabChangeName(tabName);
  };


  return (
    <div className="tab-container">
      <div className="tab-name-cont "onClick={onTabClick} id={"TAB-CONTAINER-"+cleanInputForId(tabName)}>
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
        <CloseIcon  className="tab-close"/>
      </div>
      
    </div>
  )
}