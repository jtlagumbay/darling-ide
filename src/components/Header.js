/** Importing the libraries and functions **/

// useCurrentEditor will be used to have access on the text editor functions from the tiptap library
import { useCurrentEditor } from "@tiptap/react"; 

// useState is used for handling reactive states in ReactJS and useEffect is used for handling side effects. Both are built-in functionalities provided by React.
import { useState, useEffect } from "react"

// These are the functions from the Utils files. Each of these are explained in the Utils file.
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem, generateUniqueTabName } from "../utils";

// Import the created Menubar, Tabbar, Toolbar
import Menubar from "./Menubar";
import Tabbar from "./Tabbar"
import Toolbar from "./Toolbar";

/**
 * 
 * @description React Functional Component for the Header (Tools above the text editor)
 */
export default function Header() {
  // Get the instance of the text editor
  const { editor } = useCurrentEditor();

  // Set the default tabs to the content of the localstorage
  const [tabs, setTabs] = useState(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))

  // Stores whether to enable save as button, defaulted to false
  const [enableSaveAs, setEnableSaveAs] = useState(false);

  // Stores whether there are unsaved changes in the active tab, defaulted to false
  const [unsavedChanges, setUnsavedChanges] = useState(false);


  // Everytime the tab is changed, it saves it to the localStorage to allow data persistence
  useEffect(() => {
    // Iterates through each tab to check if it is the currently selected tab because its content has to be saved to another localStorage key.
    tabs && tabs.map(tab => {
      if (tab.isSelected) {
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, tab.initialContent)
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT, tab.content)
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME, tab.name)
        setUnsavedChanges(tab.initialContent != tab.content)
      }
    })

    // Saves the entire list of tabs to localStorage
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, (tabs))

    // Enable save as if there is an opened tab
    if (tabs && tabs.length > 0) {
      setEnableSaveAs(true)
    } 
    if (tabs.length == 0) {
      editor && editor.setEditable(false)
    }
  }, [tabs])


  /**
   * 
   * @param {String} tabToDelete Name of the tab to be deleted
   * @description Deletes an object from the tabs that matches with the parameter, it will be called when the close button on the tab is clicked.
   */
  function onTabDelete(tabToDelete) {
    // Finds the index of the tab to be deleted
    var indexToDelete = tabs.findIndex(tab => tab.name === tabToDelete);
    // Holds the boolean if the tab to be deleted is an active tab
    var checkSelected = tabs[indexToDelete].isSelected
    // Creates a temporary variable that stores the tabs without the tab to be deleted
    var updatedTabs = tabs.filter(tab => tab.name !== tabToDelete);

    // If the tab to be deleted is an active tab, find the next tab to be deleted.
    if (checkSelected)
    {
      // Set isSelected to all files to be false first.
      updatedTabs = updatedTabs.map(tab => ({
        ...tab,
        isSelected: false
      }));

      // If the index to be deleted is the last remaining tab, disable save as and set unsavedChanges to false
      if (indexToDelete===0 && updatedTabs.length ===0) {
        setEnableSaveAs(false)
        setUnsavedChanges(false)
        editor.commands.clearContent()
      }
      
      // If there are tabs to the left of the deleted tab, make it the new active tab
      else if (indexToDelete <= updatedTabs.length - 1 && updatedTabs.length > 0) {
        updatedTabs[indexToDelete].isSelected = true
        var activeTab = updatedTabs[indexToDelete]
        setActiveTab(activeTab.name, activeTab.content, activeTab.initialContent)
      }
      
      // If there are only tabs to the right, make it the new active tab.
      else if (indexToDelete > updatedTabs.length - 1 && updatedTabs.length > 0) {
        updatedTabs[--indexToDelete].isSelected = true
        var activeTab = updatedTabs[indexToDelete]
        setActiveTab(activeTab.name, activeTab.content, activeTab.initialContent)
      }
    }

    // Update the list of tabs to the updatedTabs
    setTabs(updatedTabs)

  }

  /**
   * 
   * @param {String} newName New name of the tab
   * @param {String} oldName Current name of the tab
   * @description Changes the name of the tab
   */
  function onTabChangeName(newName, oldName) {
    // Finds the index of the tab 
    var indexToUpdate = tabs.findIndex(tab => tab.name === oldName);

    // Copies the tabs to updated tabs
    var updatedTabs = [...tabs];

    // Sets the name of the tab to newName
    updatedTabs[indexToUpdate] = { ...updatedTabs[indexToUpdate], name: newName };

    // Save the updatedTabs to tabs
    setTabs(updatedTabs)
  }

  /**
   * 
   * @param {String} name Name of the tab [Optional]
   * @param {String} content Content of the tab [Optional]
   * @description Adds tab to the list, called when plus icon on Tabbar is selected (name and content is empty), and when Open File in Menubar is clicked, where the name and content comes from the file opened.
   */
  function onTabAdd(name, content) {

    // Get the current content of the tabs first from the localStorage, since this is also altered by the text editor.
    setTabs(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))

    // Sets isSelected of all tabs to be false, suince the new tab added shall be the active tab.
    setTabs(tabs =>
      tabs.map(tab =>
        ({ ...tab, isSelected: false })
      )
    );
    // Object for the new tab created
    var newTab = {}

    // If there was name and content passed, used it for the newTab
    if (name && content) {
      newTab = {
        name: name,
        content: content,
        initialContent: content,
        isSelected: true, // set it to true, to make it the active tab
        key:Date.now() // generate unique key for each tab
      }
    }
    // If no name, add default name and content
    else {
      newTab = {
        name: generateUniqueTabName(tabs),
        content: "<p></p>",
        initialContent: "<p></p>",
        isSelected: true,
        key:Date.now()
      }
    }

    // Set the active tab to be the newTab
    setActiveTab(newTab.name, newTab.content, newTab.initialContent)
    // Make the content of the tabs to be the previous content, plus the newTab
    setTabs(tabs => [...tabs, newTab])
    // Enable SaveAs Button, this is specifically called since initially, when there are no tabs, the save as button is disabled.
    setEnableSaveAs(true)
    editor.setEditable(true)
  }

  /**
   * 
   * @param {String} name Name of the tab clicked
   * @description When the tab is clicked, it sets the isSelected of the clicked tab to be true, and activates it. 
   */
  function onTabClick(name) {
    // Get the current content of the tabs first from the localStorage, since this is also altered by the text editor.
    setTabs(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))
    // Go through each tab and set the isSelected to be true when it matches the name of the input parameter. If it is selected, activate the tab.
    setTabs(tabs => 
      tabs.map(tab =>{
          var isSelected = tab.name === name
          if (isSelected) {
            setActiveTab(tab.name, tab.content, tab.initialContent)
          }
          return ({ ...tab, isSelected: isSelected })
      }
      )
    )
  }

  /**
   * 
   * @description When the tab button is saved, it saves the content to the initial content. 
   */
  function onTabSave() {
    setTabs(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))
    setTabs(tabs => 
      tabs.map(tab =>{
        if (tab.isSelected) {
          setActiveTab(tab.name, tab.content, tab.content)
          // Copies the content of the tab to the initialContent
          return ({ ...tab, initialContent: tab.content })
          }
          return tab
      }
      )
    )
  }

  /**
   * 
   * @param {String} name 
   * @param {String} content 
   * @param {String} initialContent 
   */
  function setActiveTab(name, content, initialContent) {
    // Saves the name of the active tab to localStorage
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME, name)
    // Saves the file content of the active tab to localStorage
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT, content)
    // Saves the file initial content of the active tab to localStorage
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, initialContent)
    // set the content of the text editor to the content of the tab that is active
    editor.commands.setContent(content)
  }

  // Reacts whenever there is transaction in the text editor so it can check if there is unsaved changes
  useEffect(() => {
    editor && editor.on('transaction', () => {
      // Fetch the initialContent from the localStorage
      var initialContent = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT)
      // Fetch the content from the localStorage
      var content = editor.getHTML()
      // If the initial content does not match with the current content, make unsavedChanges to true
      setUnsavedChanges(initialContent != content)
    })

  }, [])

  // If the editor was not instantiated, do not render anything
  if (!editor) {
    return null;
  }

  return (
  // Create a container for the header, which includes the menubar, Toolbar, and the Tabbar
  <div style={{ width: '100%' }}>
      {/* Pass to the Menubar the onTabAdd, onTabSave, enableSaveAs, and unsavedChanges, since it will be used by some of the buttons on the Menubar */}
      <Menubar onTabAdd={onTabAdd} onTabSave={onTabSave}
        enableSaveAs={enableSaveAs}
        unsavedChanges={unsavedChanges}
      />
      {/* No props for the Toolbar */}
      <Toolbar />
      {/* Pass  to the Tabbar the tabs and the functionalities of the tab*/}
      <Tabbar tabs={tabs} onTabDelete={onTabDelete} onTabAdd={onTabAdd} onTabChangeName={onTabChangeName} onTabClick={onTabClick} unsavedChanges={unsavedChanges}/>
  </div>
  );
}
