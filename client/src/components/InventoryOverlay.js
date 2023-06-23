
import React, { useEffect, useState } from "react";
// import { enableWASD, disableWASD } from "../utils/interactionMenu";
// import { fetchInventory, fetchOneItemDetails } from "../utils/db/fetches";
// import { parseInventoryObjToGetJustItems } from "../utils/inventory";
import "../css/overlay.css"

const InventoryOverlay = (showInventory) => {
  const [elixir, setElixir] = useState(localStorage.getItem('elixir'));
  const [striders, setStriders] = useState(localStorage.getItem('striders'));
  const [repairTool, setRepairTool] = useState(localStorage.getItem('repairTool'));
  
  useEffect(() => {
    if (showInventory) {
      setElixir(localStorage.getItem('elixir'));
      setStriders(localStorage.getItem('striders'));
      setRepairTool(localStorage.getItem('repairTool'));
    }
  }, [showInventory]);
  
  return (
    <div id="inventory-container">
      <h3 id="inventory-header">Your Inventory</h3><br/>
      <ul id="inventory-ul">
        {/* {inventory.map((item, index) => (
          <li key={index}>
            <p>Item name: {item.getOneItem.item_name}</p>
            <p>Description: {item.getOneItem.description}</p>
          </li>
        ))} */}
        {elixir && <li>Botanical Elixir: Also known as Whispering Bloom, Botanical Elixir was created centuries ago by a reclusive herbalist who possessed a deep connection with nature. Seeking to nurture and restore the balance of the natural world, and support a variety of life. Legend has spread across the galaxy, that when in the hands of a true lover of flora, it has helped reseed entire planets.<br/><br/></li>}
        {striders && <li>Stealth Striders: A pair of pants cut from a specialized kangaroo cloth. It allows the wearer to have maximum agility and silent movement. They are durable and sleek in appearance and make your butt look great!<br/><br/></li>}
        {repairTool && <li>Repair Tool: A unique tool that appears to be an ordinary wrench at first glance but possesses hidden mechanisms and modifications specifically designed for repairing intricate machinery found on futuristic spacecraft.<br/></li>}

      </ul>
    </div>
    
  )
}

export default InventoryOverlay;