import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { useCurrentEditor } from "@tiptap/react";


export default function Toolbar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="container toolbar-container" style={{marginBottom: '10px'}}>
      <button
        id='TB-BOLD'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        // className={editor.isActive("bold") ? "is-active" : ""}
        className="menubar-button" 
        title="Bold"
      >
        <BoldIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Bold</span>
      </button>
      <button
        id='TB-ITALIC'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        // className={editor.isActive("italic") ? "is-active" : ""}
        className="menubar-button" 
        title="Italic"
      >
        <ItalicIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Italic</span>
      </button>
      <button
        id='TB-STRIKETHROUGH'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        // className={editor.isActive("strike") ? "is-active" : ""}
        className="menubar-button" 
        title="Strikethrough"
      >
        <StrikethroughIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Strike</span>
      </button>
      <button
        id='TB-CODE'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        // className={editor.isActive("code") ? "is-active" : ""}
        className="menubar-button" 
        title="Code"
      >
        <CodeIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Code</span>
      </button>
      <button
        id='TB-BULLETS'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        // className={editor.isActive("bulletList") ? "is-active" : ""}
        className="menubar-button" 
        title="List Bullets"
      >
        <FormatListBulletedIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Bullets</span>
      </button>
      <button
        id='TB-NUMBERS'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        // className={editor.isActive("orderedList") ? "is-active" : ""}
        className="menubar-button" 
        title="List Numbers"
      >
        <FormatListNumberedIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Numbers</span>
      </button>
      <button
        id='TB-BLOCK'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        // className={editor.isActive("codeBlock") ? "is-active" : ""}
        className="menubar-button" 
        title="Code Block"
      >
        <DeveloperModeIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Block</span>
      </button>
    </div>
  );
}
