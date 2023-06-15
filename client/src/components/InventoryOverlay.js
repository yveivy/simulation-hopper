
import React, { useEffect, useState } from "react";
import { enableWASD, disableWASD } from "../utils/interactionMenu";
import { fetchInventory, fetchOneItemDetails } from "../utils/db/fetches";
import { parseInventoryObjToGetJustItems } from "../utils/inventory";
import "../css/overlay.css"

const InventoryOverlay = ({ inventory, setInventory }) => {

  
  return (
    <div id="inventory-container">
      <h3 id="inventory-header">Your Inventory</h3>
      <ul id="inventory-ul">
        {inventory.map((item, index) => (
          <li key={index}>
            <p>Item name: {item.getOneItem.item_name}</p>
            <p>Description: {item.getOneItem.description}</p>
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default InventoryOverlay;