import Tabs from "./Tab"
import AddIcon from '@mui/icons-material/Add';
import { useEffect } from "react";
export default function Tabbar({ tabs, onTabDelete, onTabAdd, onTabChangeName, onTabClick }) {

  return (
    <div className="tabcont-container">
      {tabs.map((tab) => {
        return <Tabs
          key = {tab.name}
          name={tab.name}
          isSelected={tab.isSelected}
          onTabDelete={() => onTabDelete(tab.name)}
          onTabChangeName={(newName) => onTabChangeName(newName, tab.name)}
          onTabClick = {()=>onTabClick(tab.name)}
        />
      })
      }
      <AddIcon onClick = {onTabAdd} />
    </div>
  )
}