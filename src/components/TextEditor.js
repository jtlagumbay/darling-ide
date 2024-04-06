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
import Toolbar from "./Toolbar";
import Menubar from "./Menubar";
import { LOCAL_STORAGE_KEYS, getLocalStorageItem } from "../utils";

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

  return (
    <div>
      <EditorProvider
        slotBefore={<Toolbar />}
        extensions={ extensions }
        content={ transcript }
      ></EditorProvider>
    </div>
  );
}
