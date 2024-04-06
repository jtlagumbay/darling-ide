export const commands = [
    {
      command: 'copy',
      callback: () => {
        document.getElementById('MENU-COPY').click();
      }
    },
    {
      command: 'paste',
      callback: () => {
        document.getElementById('MENU-PASTE').click();
      }
    }
  ]