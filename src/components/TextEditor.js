import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from '@tiptap/extension-placeholder';

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
    Placeholder.configure({
      placeholder: 'Write content here'
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
        return newContent
      } else return tab
    })
    setLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_LIST, updatedFileList)
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
