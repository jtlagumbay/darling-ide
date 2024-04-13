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
    var activeTab = {}
    var updatedTabs = tabs.filter(tab => tab.name !== tabToDelete);
    if (checkSelected)
    {
      updatedTabs = updatedTabs.map(tab => ({
        ...tab,
        isSelected: false
      }));

      if (indexToDelete <= updatedTabs.length - 1 && updatedTabs.length > 0) {
        updatedTabs[indexToDelete].isSelected = true
        activeTab = updatedTabs[indexToDelete]
      } else if (indexToDelete > updatedTabs.length - 1 && updatedTabs.length >0) {
        updatedTabs[--indexToDelete].isSelected = true
        activeTab = updatedTabs[--indexToDelete]
      }
      setActiveTab(activeTab.name, activeTab.content, activeTab.initialContent)

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
        isSelected: true
      }
    } else {
      newTab = {
        name: generateUniqueTabName(tabs),
        content: "<p>Write content here</p>",
        initialContent: "<p>Write content here</p>",
        isSelected: true
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

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Menubar onTabAdd={onTabAdd} onTabSave={onTabSave} enableSaveAs={enableSaveAs}/>
      <Toolbar />
      <Tabbar tabs={tabs} onTabDelete={onTabDelete} onTabAdd={onTabAdd} onTabChangeName={onTabChangeName} onTabClick={onTabClick} />
  </div>
  );
}
