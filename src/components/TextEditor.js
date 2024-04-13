import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Header from "./Header";
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from "../utils";
import { useEffect, useState } from "react";

export default function TextEditor({ transcript }) {

  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  const onUpdate = ({ editor }) => {
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT, editor.getHTML())

    var fileList = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST)
    var fileName = getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_NAME)

    var updatedFileList = fileList.map(tab => {
      if (tab.name == fileName) {
        var newContent = {
          ...tab,
          content: editor.getHTML()
        }
        console.log(newContent)
        return newContent
      } else return tab
    })
    console.log(updatedFileList)
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, updatedFileList)
    console.log(localStorage)
  }


  return (
    <div className="editor-cont">
      <EditorProvider
        slotBefore={<Header />}
        extensions={ extensions }
        content={getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT)}
        onUpdate={editor => onUpdate(editor)}
      ></EditorProvider>
    </div>
  );
}
