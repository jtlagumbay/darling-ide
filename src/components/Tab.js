import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react';
import { cleanInputForId, getLocalStorageItem, LOCAL_STORAGE_KEYS } from "../utils"
import Modal from './Modal/Modal';
import './Modal/Modal.css';

/**
 * This component represents a single tab in a tabbed interface.
 * @param {*} name - the name of the tab
 * @param {*} isSelected - whether the tab is currently selected or not
 * @param {*} onTabDelete - function to call when the tab is deleted
 * @param {*} onTabChangeName - function to call when the tab name is changed
 * @param {*} onTabClick - function to call when the tab is clicked
 * @param {*} hasUnsavedChanges - whether the tab has unsaved changes
 * @param {*} id - the unique identifier of the tab
 * @returns tab component
 */
export default function Tab({ name, isSelected, onTabDelete, onTabChangeName, onTabClick, hasUnsavedChanges, id}) {
  const [tabName, setTabName] = useState(name);
  const [error, setError] = useState(false);
  const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);

  /* This function handles renaming of the tab. */
  const handleChange = (e) => {
    setTabName(e.target.value);
  };

  /**
   * This function handles the onBlur event for the tab name input field.
   * It first retrieves the list of tabs from local storage.
   * Then, it checks if there is another tab with the same name and a different id.
   * If such a tab exists, it sets an error state, resets the tab name after a delay, and clears the error state.
   * If no such tab exists, it calls the onTabChangeName callback with the new tab name and clears the error state.
   */
  const handleBlur = () => {
    var tabs = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST)
    if (tabs.some(tab => tab.name === tabName && tab.key !== id)) {
      setError(true)
      setTimeout(() => {
        setTabName(name)
        setError(false)
      }, 1500)
    } else {
      onTabChangeName(tabName);
      setError(false)
    }
  };

  /**
   * This function handles the deletion of a tab.
   * If the tab has unsaved changes, it opens a confirmation modal.
   * Otherwise, it calls the onTabDelete callback directly.
   */
  const handleTabDelete = () => {
    if(hasUnsavedChanges){
      setIsClosedModalOpen(true);
    } else {
      onTabDelete();
    }
  }

  /**
   * This function handles the confirmation of tab deletion in the modal.
   * It calls the onTabDelete callback and then closes the modal.
   */
  const handleCloseModalConfirm = () => {
    onTabDelete();
    setIsClosedModalOpen(false);
  }

  return (
    /**
     * The div's class depends whether the tab is selected or not.
     * The tab name input field is rendered as read-only if the tab is not selected.
     * Error message is displayed if the tab name is already used.
     * The tab close container is rendered with a close icon.
     * When the close icon is clicked, the handleTabDelete function is called.
     * If there are unsaved changes, a modal is opened to confirm the tab closure.
     * The modal's confirm action is handled by the handleCloseModalConfirm function.
     */
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