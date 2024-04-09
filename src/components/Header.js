import { useCurrentEditor } from "@tiptap/react";
import Menubar from "./Menubar";
import {useState, useEffect} from "react"
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from "../utils";
import Tabbar from "./Tabbar"
import Toolbar from "./Toolbar";

export default function Header() {
  
  const { editor } = useCurrentEditor();
  const [fileName, setFileName] = useState("Untitled.txt");
  const [tabs, setTabs] = useState(getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST))

  useEffect(() => {
    const storedFileName = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME);
    if (storedFileName) {
      setFileName(storedFileName);
    } else {
      setFileName("Untitled.txt")
    }
  }, [getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME)]);

  useEffect(() => {
    tabs && tabs.map(tab => {
      if (tab.isSelected) {
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_INITIAL_CONTENT, tab.content)
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT, tab.content)
        setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME, tab.name)
      }
    })
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, (tabs))
  }, [tabs])

  function onTabDelete(tabToDelete) {
    var indexToDelete = tabs.findIndex(tab => tab.name === tabToDelete);
    var checkSelected = tabs[indexToDelete].isSelected
    
    var updatedTabs = tabs.filter(tab => tab.name !== tabToDelete);
    if (checkSelected)
    {
      updatedTabs = updatedTabs.map(tab => ({
        ...tab,
        isSelected: false
      }));

      if (indexToDelete <= updatedTabs.length - 1 && updatedTabs.length > 0) {
        updatedTabs[indexToDelete].isSelected = true
      } else if (indexToDelete > updatedTabs.length - 1 && updatedTabs.length >0) {
        updatedTabs[--indexToDelete].isSelected = true
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

  function onTabAdd() {
    setTabs(tabs =>
      tabs.map(tab =>
        ({ ...tab, isSelected: false })
      )
    );
    var newTab = {
      name: "untitled"+tabs.length,
      content: "<p>untitled "+tabs.length + "</p>",
      isSelected: true
    }
    setTabs(tabs=>[...tabs, newTab])
  }

  function onTabClick(name) {
    setTabs(tabs => 
      tabs.map(tab =>{
          var isSelected = tab.name===name
          return ({ ...tab, isSelected: isSelected })
      }
      )
    )
  }

  if (!editor) {
    return null;
  }

  return (
  <div>
      <Menubar />
      <Toolbar />
      <Tabbar tabs={tabs} onTabDelete={onTabDelete} onTabAdd={onTabAdd} onTabChangeName={onTabChangeName} onTabClick={onTabClick} />
  </div>
  );
}
