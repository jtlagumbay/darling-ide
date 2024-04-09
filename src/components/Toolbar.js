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
    <div className="container toolbar" style={{marginBottom: '10px'}}>
      <button
        id='BOLD'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
        title="Bold"
      >
        <BoldIcon />
      </button>
      <button
        id='ITALIC'
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
        title="Italic"
      >
        <ItalicIcon />
      </button>
      <button
        id='STRIKETHROUGH'
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
        title="Strikethrough"
      >
        <StrikethroughIcon />
      </button>
      <button
        id='CODE'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
        title="Code"
      >
        <CodeIcon />
      </button>
      <button
        id='BULLETS'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
        title="List Bullets"
      >
        <FormatListBulletedIcon />
      </button>
      <button
        id='NUMBERS'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
        title="List Numbers"
      >
        <FormatListNumberedIcon />
      </button>
      <button
        id='BLOCK'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
        title="Code Block"
      >
        <DeveloperModeIcon />
      </button>
    </div>
  );
}
