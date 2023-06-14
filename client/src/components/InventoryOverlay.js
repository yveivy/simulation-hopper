
import React, { useEffect, useState } from "react";
import { enableWASD, disableWASD } from "../utils/interactionMenu";
import { fetchInventory } from "../utils/db/fetches";
import { parseInventoryObjArrayToGetJustItems } from "../utils/inventory";
import "../css/overlay.css"

const InventoryOverlay = () => {
  const [inventory, setInventory] = useState([{"item": {"id": "1", "item_name": "testName", "description": "testDescription"}}]);
  const [isVisible, setIsVisible] = useState(false);

  const fetchAndSetInventory = async () => {
    const inventoryObjArray = await fetchInventory('barf');
    const inventoryItems = parseInventoryObjArrayToGetJustItems(inventoryObjArray);
    setInventory(inventoryItems);
  }

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === " ") {
        return;
      }
      if (e.key === 'e') {
        if (isVisible) {
          setIsVisible(false);
          enableWASD();
        } else {
          try {
            await fetchAndSetInventory();
          } catch {
            console.log("inventoryOvelay.js fetchAndSetInventory failed")
          }
          setIsVisible(true);
          disableWASD();
        }
      } else if (e.code === 'Escape' && isVisible) {
        setIsVisible(false);
        enableWASD();
      } else if (e.key === 't') {
        // For testing purposes
        console.log("t key pressed");
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div id="inventory-container">
      <h3 id="inventory-header">Your Inventory</h3>
      <ul id="inventory-ul">
        {inventory.map((item) => (
          <li key={item.item.id}>
            <p>Item name: {item.item.item_name}</p>
            <p>Description: {item.item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InventoryOverlay;


// import React, { useEffect } from "react"
// import { enableWASD, disableWASD } from "../utils/interactionMenu"
// import { fetchInventory } from "../utils/db/fetches";
// import { parseInventoryObjArrayToGetJustItems } from "../utils/inventory";

// const InventoryOverlay = () => {
//   var inventoryContainer = document.querySelector("#inventory-container")
//   var inventoryUl = document.querySelector("#inventory-ul")

//   const appendLiToUl = (ul, text) => {
//     var li = document.createElement("li")
//     li.innerHTML = text
//     ul.appendChild(li)
//   }
  
//   const renderInventoryItemDetailsInUl = (ul, inventory) => {
//     for (var item of inventory) {
//         var name = item.item.item_name
//         var description = item.item.description

//         appendLiToUl(ul, `Item name: ${name}`)
//         appendLiToUl(ul, `Description: ${description}`)
//         appendLiToUl(ul, "&nbsp;")
//     }
//   }

//   const clearUl = (ul) => {
//     ul.innerHTML = ''
//   }

//   const showInventoryContainer = () => {
//       inventoryContainer.style.display = 'flex';
//   }

//   const hideInventoryContainer = () => {
//       inventoryContainer.style.display = 'none';
//   }

//   const renderUserInventory = async () => {
//     showInventoryContainer()
//     window.globalVars.userInventoryObjArray = await fetchInventory('barf')
//     window.globalVars.userInventoryItems = parseInventoryObjArrayToGetJustItems(window.globalVars.userInventoryObjArray)
//     clearUl(inventoryUl)
//     renderInventoryItemDetailsInUl(inventoryUl, window.globalVars.userInventoryObjArray)
//   }


//   useEffect(() => {
//     const handleKeyDown = async (e) => {
//         if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === " ") {
//             return
//         }
//         if (e.key === 'e') {
//           console.log("e key pressed____________")
//           if (window.globalVars.inventoryToggledOn) {
//             hideInventoryContainer()
//             enableWASD()
//             window.globalVars.inventoryToggledOn = false
//           } else {
//             renderUserInventory()
//             disableWASD()
//             window.globalVars.inventoryToggledOn = true
//           }
//         }
//         else if (e.code === 'Escape' && window.globalVars.inventoryToggledOn) {
//           hideInventoryContainer()
//           enableWASD()
//           window.globalVars.inventoryToggledOn = false
//         }
//         else if (e.key === 't') {
//           //?for testing purposes
//           console.log("t key pressed____________")
//         }
//       };

//     window.addEventListener('keydown', handleKeyDown);

//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <div id="inventory-container">
//       <h3 id="inventory-header">Your Inventory</h3>
//       <ul id="inventory-ul"></ul>
//     </div>
//   )
// }

// export default InventoryOverlay