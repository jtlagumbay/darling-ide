import BoldIcon from '@mui/icons-material/FormatBold';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughIcon from '@mui/icons-material/FormatStrikethrough';
import CodeIcon from '@mui/icons-material/Code';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import { useCurrentEditor } from "@tiptap/react";

/**  
 * This function is used for toolbar configuration with tiptap editor. 
 * It includes buttons for various text formatting options.
 * Each button has an associated icons from material UI with its corresponding labels.
*/
export default function Toolbar() {
  /**  
   * This hook is used to get the current editor instance. 
   * If no editor is available, the funtion returns null. 
  */
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    /**
     * Each button has an `onClick` event handler that triggers the corresponding Tiptap 
     * editor's chaining API to focus the editor and toggle the respective formatting option.
     * It also has an ID for easier implementation of the voice commands.
     * Some buttons also have a `disabled` prop which is set based on whether the respective 
     * formatting option can be toggled on the current editor state.
     * The rendered toolbar is wrapped in a div with class name 'container toolbar-container' 
     * and with a specific margin bottom.
     */
    <div className="container toolbar-container" style={{marginBottom: '10px'}}>
      <button
        id='TB-BOLD'
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
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
        className="menubar-button" 
        title="Strikethrough"
      >
        <StrikethroughIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Strike</span>
      </button>
      <button
        id='TB-BULLETS'
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="menubar-button" 
        title="List Bullets"
      >
        <FormatListBulletedIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Bullets</span>
      </button>
      <button
        id='TB-NUMBERS'
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="menubar-button" 
        title="List Numbers"
      >
        <FormatListNumberedIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Numbers</span>
      </button>
      <button
        id='TB-CODE'
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className="menubar-button" 
        title="Code"
      >
        <CodeIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Code</span>
      </button>
      <button
        id='TB-BLOCK'
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="menubar-button" 
        title="Code Block"
      >
        <DeveloperModeIcon className="menubar-button-icon" />
        <span className="menubar-button-label">Block</span>
      </button>
    </div>
  );
}
