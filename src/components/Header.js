import { useCurrentEditor } from "@tiptap/react";
import Menubar from "./Menubar";
import {useState, useEffect} from "react"
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem, generateUniqueTabName } from "../utils";
import Tabbar from "./Tabbar"
import Toolbar from "./Toolbar";
import { act } from "react-dom/test-utils";

export default function Header() {
  
  const { editor } = useCurrentEditor();
  const [tabs, setTabs] = useState(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))
  const [enableSaveAs, setEnableSaveAs] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);


  useEffect(() => {
    tabs && tabs.map(tab => {
      if (tab.isSelected) {
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, tab.content)
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT, tab.content)
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME, tab.name)
      }
    })
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, (tabs))
    if (tabs && tabs.length > 0) {
      setEnableSaveAs(true)
    }
  }, [tabs])

  function onTabDelete(tabToDelete) {
    /**
     * TODO: Add modal to check if walay unsaved changes
     */
    var indexToDelete = tabs.findIndex(tab => tab.name === tabToDelete);
    var checkSelected = tabs[indexToDelete].isSelected
    var updatedTabs = tabs.filter(tab => tab.name !== tabToDelete);
    if (checkSelected)
    {
      updatedTabs = updatedTabs.map(tab => ({
        ...tab,
        isSelected: false
      }));
      console.log(indexToDelete, updatedTabs.length)
      if (indexToDelete===0 && updatedTabs.length ===0) {
        setEnableSaveAs(false)
        setUnsavedChanges(false)
      } else if (indexToDelete <= updatedTabs.length - 1 && updatedTabs.length > 0) {
        updatedTabs[indexToDelete].isSelected = true
        var activeTab = updatedTabs[indexToDelete]
        setActiveTab(activeTab.name, activeTab.content, activeTab.initialContent)
      } else if (indexToDelete > updatedTabs.length - 1 && updatedTabs.length >0) {
        updatedTabs[--indexToDelete].isSelected = true
        var activeTab = updatedTabs[indexToDelete]
        setActiveTab(activeTab.name, activeTab.content, activeTab.initialContent)
      }

    }
    setTabs(updatedTabs)

  }

  function onTabChangeName(newName, oldName) {
    var indexToUpdate = tabs.findIndex(tab => tab.name === oldName);

    var updatedTabs = [...tabs];

    updatedTabs[indexToUpdate] = { ...updatedTabs[indexToUpdate], name: newName };

    setTabs(updatedTabs)
  }

  function onTabAdd(name, content) {
    setTabs(tabs =>
      tabs.map(tab =>
        ({ ...tab, isSelected: false })
      )
    );
    var newTab = {}
    if (name && content) {
      newTab = {
        name: name,
        content: content,
        initialContent: content,
        isSelected: true,
        key:Date.now()
      }
    } else {
      newTab = {
        name: generateUniqueTabName(tabs),
        content: "<p>Write content here</p>",
        initialContent: "<p>Write content here</p>",
        isSelected: true,
        key:Date.now()
      }
    }
    setActiveTab(newTab.name, newTab.content, newTab.initialContent)
    setTabs(tabs => [...tabs, newTab])
    setEnableSaveAs(true)
  }

  function onTabClick(name) {
    setTabs(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))
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

  function onTabSave() {
    setTabs(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))
    setTabs(tabs => 
      tabs.map(tab =>{
        if (tab.isSelected) {
          setActiveTab(tab.name, tab.content, tab.content)
          return ({ ...tab, initialContent: tab.content })
          }
          return tab
      }
      )
    )
  }

  function setActiveTab(name, content, initialContent) {
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME, name)
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT, content)
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, initialContent)
    editor.commands.setContent(content)
  }

  useEffect(() => {
    editor && editor.on('transaction', () => {
      var initialContent = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT)
      var content = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT)
      setUnsavedChanges(initialContent != content)
    })

  },[])


  if (!editor) {
    return null;
  }

  return (
  <div style={{width: '100%'}}>
      <Menubar onTabAdd={onTabAdd} onTabSave={onTabSave}
        enableSaveAs={enableSaveAs}
        unsavedChanges={unsavedChanges}
      />
      <Toolbar />
      <Tabbar tabs={tabs} onTabDelete={onTabDelete} onTabAdd={onTabAdd} onTabChangeName={onTabChangeName} onTabClick={onTabClick} />
  </div>
  );
}
