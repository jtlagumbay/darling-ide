// Function to set an item in localStorage
export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Function to get an item from localStorage
export const getLocalStorageItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error fetching from localStorage:', error);
    return null;
  }
};

// Function to remove an item from localStorage
export const removeLocalStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const LOCAL_STORAGE_KEYS = {
  FILE_NAME: 'file_name',
  FILE_CONTENT: 'file_content',
  FILE_INITIAL_CONTENT: 'file_initial_content',
  FILE_LIST: 'file_list'
};

export const generateUniqueTabName = (tabs) => {
  let counter = 0;
  let uniqueName = "Untitled";
  
  while (tabs.some(tab => tab.name === uniqueName + (counter > 0 ? ` (${counter})` : ''))) {
    counter++;
  }

  return uniqueName + (counter > 0 ? ` (${counter})` : '');
}

export const cleanInputForId = (input) => {
  // Remove any characters that are not alphanumeric, hyphens, or underscores
  const cleanedInput = input.replace(/[^\w-]/g, '');

  // Make sure the ID starts with a letter (IDs cannot start with a number)
  const startsWithLetter = /^[a-zA-Z]/.test(cleanedInput);
  if (!startsWithLetter) {
    // Prepend 'id_' if it doesn't start with a letter
    return 'id_' + cleanedInput;
  }

  return cleanedInput;
}
