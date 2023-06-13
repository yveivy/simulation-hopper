import React, { useEffect } from "react"
import { hideInventoryContainer, renderUserInventory } from "../utils/inventory";
import { enableWASD, disableWASD } from "../utils/interactionMenu"

const InventoryOverlay = () => {

  useEffect(() => {
    const handleKeyDown = async (e) => {
        if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === " ") {
            return
        }
        if (e.key === 'e') {
          console.log("e key pressed____________")
          if (window.globalVars.inventoryToggledOn) {
            hideInventoryContainer()
            enableWASD()
            window.globalVars.inventoryToggledOn = false
          } else {
            renderUserInventory()
            disableWASD()
            window.globalVars.inventoryToggledOn = true
          }
        }
        else if (e.code === 'Escape' && window.globalVars.inventoryToggledOn) {
          hideInventoryContainer()
          enableWASD()
          window.globalVars.inventoryToggledOn = false
        }
        else if (e.key === 't') {
          //?for testing purposes
          console.log("t key pressed____________")
        }
      };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div id="inventory-container">
      <h3 id="inventory-header">Your Inventory</h3>
      <ul id="inventory-ul"></ul>
    </div>
  )
}

export default InventoryOverlay