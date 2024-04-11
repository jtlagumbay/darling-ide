import { useCurrentEditor } from "@tiptap/react";

const command = (name, id) => {
    return {
        command: name,
        callback: () => {
            document.getElementById(id).click();
        }
    }
}

export const commands = [
    // file handling
    command('new file', 'MENU-NEW'),  
    command('open file', 'MENU-OPEN'),  
    command('save file', 'MENU-SAVE'),  
    command('save as file', 'MENU-SAVE-AS'),
    
    // file manipulation
    command('undo', 'MENU-UNDO'),  
    command('redo', 'MENU-REDO'),  
    command('cut', 'MENU-CUT'),
    command('copy', 'MENU-COPY'),
    command('paste', 'MENU-PASTE'),
    
    // view
    command('zoom in', 'MENU-ZOOM-IN'),  
    command('zoom out', 'MENU-ZOOM-OUT'), 
    
    // extra commands
    command('select all', 'MENU-SELECT-ALL'),
    command('deselect', 'MENU-DESELECT'),
    command('enter', 'MENU-ENTER'),
    command('delete', 'MENU-DELETE'),
    command('delete all', 'MENU-DELETE-ALL'),

    // toolbar
    command('bold', 'TB-BOLD'),
    command('italic', 'TB-ITALIC'),
    command('strikethrough', 'TB-STRIKETHROUGH'),
    command('code', 'TB-CODE'),
    command('bullets', 'TB-BULLETS'),
    command('numbers', 'TB-NUMBERS'),
    command('block', 'TB-BLOCK'),
]