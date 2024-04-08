import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";

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
    <div className="editor-cont">
      <EditorProvider
        slotBefore={<Toolbar />}
        extensions={ extensions }
        content={ transcript }
      ></EditorProvider>
    </div>
  );
}
