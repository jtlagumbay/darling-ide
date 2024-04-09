import { useState, useRef, useEffect } from 'react';

export default function RenameFile({ fileName, setFileName }) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = (event) => {
    if (event.type === 'blur' || (event.type === 'keydown' && event.key === 'Enter')) {
      setIsEditing(false)
      const newFileName = inputRef.current.value
      setFileName(newFileName + (fileExtension ? '.' + fileExtension : ''))
    }
  };

  const [baseFileName, fileExtension] = (fileName || "Untitled.txt").split('.');

  return (
    <input 
      className={`filename ${isEditing ? 'filename-editing' : ''}`}
      onDoubleClick={handleDoubleClick} 
      defaultValue={isEditing ? baseFileName : fileName} 
      onBlur={handleBlur} 
      onKeyDown={handleBlur} 
      readOnly={!isEditing} 
      ref={inputRef}
    />
  );
}