import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  EditorProvider,
} from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";

import StarterKit from "@tiptap/starter-kit";
import Header from "./Header";
import { LOCAL_STORAGE_KEYS, getLocalStorageItem, setLocalStorageItem } from "../utils";
import { useEffect } from "react";

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
  }

  useEffect(()=>{console.log(transcript)}, [transcript])
  
  return (
    <div>
      <EditorProvider
        slotBefore={<Header />}
        extensions={ extensions }
        content={getLocalStorageItem(LOCAL_STORAGE_KEYS.FILE_CONTENT)}
        onUpdate={editor => onUpdate(editor)}
      ></EditorProvider>
    </div>
  );
}
