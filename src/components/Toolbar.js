import { useCurrentEditor } from "@tiptap/react";
import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import Menubar from "./Menubar";
import {useState, useEffect} from "react"
import { LOCAL_STORAGE_KEYS, getLocalStorageItem } from "../utils";
import TabContainer from "./TabContainer"
import { VapingRooms } from "@mui/icons-material";
export default function Toolbar() {
  const { editor } = useCurrentEditor();
  const [fileName, setFileName] = useState("Untitled.txt");
  const [tabs, setTabs] = useState([])

  useEffect(() => {
    const storedFileName = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME);
    if (storedFileName) {
      setFileName(storedFileName);
    } else {
      setFileName("Untitled.txt")
    }
  }, [getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME)]);

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
  );    var newTab = {
      name: "untitled"+tabs.length,
      content: "<p>untitledx</p>",
      isSelected: true
    }
    setTabs(tabs=>[...tabs, newTab])
  }

  function onTabClick(name) {
    console.log(name)
    setTabs(tabs => 
      tabs.map(tab =>{
          var isSelected = tab.name===name
          return ({ ...tab, isSelected: isSelected })
      }
      )
    )
  }

  useEffect(()=>{console.log(tabs)}, [tabs])

  if (!editor) {
    return null;
  }

  return (
    <div>
    <Menubar />
    <div className="container">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <BoldIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <ItalicIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="Strikethrough"
      >
        <StrikethroughIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
        title="Code"
      >
        <CodeIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="List Bullets"
      >
        <FormatListBulletedIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="List Numbers"
      >
        <FormatListNumberedIcon />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        title="Code Block"
      >
        <DeveloperModeIcon />
      </button>
      </div>
      <h1>{fileName ?? "Untitled.txt"}</h1>
      <TabContainer tabs={tabs} onTabDelete={onTabDelete} onTabAdd={onTabAdd} onTabChangeName={onTabChangeName} onTabClick={onTabClick} />
  </div>
  );
}
