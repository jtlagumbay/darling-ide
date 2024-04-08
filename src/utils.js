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
  FILE_INITIAL_CONTENT: 'file_initial_content'
};