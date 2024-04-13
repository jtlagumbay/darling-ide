import Tabs from "./Tab"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
export default function Tabbar({ tabs, onTabDelete, onTabAdd, onTabChangeName, onTabClick }) {
  return (
    <div className="tabcont-container">
      {tabs.map((tab) => {
        return <Tabs
          key = {tab.key}
          id = {tab.key}
          name={tab.name}
          hasUnsavedChanges={tab.content!=tab.initialContent}
          isSelected={tab.isSelected}
          onTabDelete={() => onTabDelete(tab.name)}
          onTabChangeName={(newName) => onTabChangeName(newName, tab.name)}
          onTabClick = {()=>onTabClick(tab.name)}
        />
      })
      }
      <AddIcon onClick = {onTabAdd} fontSize="small" className="add-icon" />
    </div>
  )
}