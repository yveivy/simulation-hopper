import React, {useEffect, useState} from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import InteractionOverlay from './components/InteractionOverlay';
import InventoryOverlay from "./components/InventoryOverlay"
import client from './utils/db/apolloClient'
// import 'bootstrap/dist/css/bootstrap.min.css'
import VideoComponent from './components/StartGame';
import './css/overlay.css'
import EndGame from './components/EndGame';
import InnerMind from './components/InnerMind';
import Interaction from "./components/interaction/Interaction"
import { enableWASD, disableWASD } from './utils/interactionMenu';
import { fetchInventory, fetchOneItemDetails } from './utils/db/fetches';
import { parseInventoryObjToGetJustItems} from "./utils/inventory"
import SeerTextInput from './components/interaction/chat/SeerChat';

function GameOverlay() {
  const [showChat, setShowChat] = useState(false);
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);
  const [inventory, setInventory] = useState([{"getOneItem": {"id": "1", "item_name": "testName", "description": "testDescription"}}]);
  const [inventoryItems, setInventoryItems] = useState(["testItem", "anotherTestItem"]);
  const [showInventory, setShowInventory] = useState(false);
  const [showAnything, setShowAnything] = useState(false)


  useEffect(() => {
    const handleKeyDown = async (event) => {
        switch(event.code) {
            case 'Space':
              if (window.interactionObject !== "" && window.interactionObject !== "spaceship" && !showAnything) {
                setShowChat(true);
                setShowAnything(true)
                disableWASD()
              }
              break;
              case 'KeyR':
                if ( !showAnything) {
                  setShowChat(true);
                  setShowAnything(true)
                  disableWASD()
                }
                break;
            case "KeyE":
              if (!showInventory && !showAnything) {
                try {
                  await fetchAndSetInventory();
                } catch {
                  console.log("inventoryOverlay.js fetchAndSetInventory failed")
                }
                setShowInventory(true);
                setShowAnything(true)
                disableWASD();
              // } else {
              //   setShowInventory(false);
              //   setShowAnything(false)
              //   enableWASD();
              }
              break;
            case 'Escape':
              setShowAnything(false)
              setShowChat(false);
              setShowSpecialFeatures(false);
              setShowInventory(false)
              enableWASD()
              break;
            default:
              break;
          }
          };
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [showAnything, showInventory, showChat, showSpecialFeatures]);

    const fetchAndSetInventory = async () => {
      const inventoryObj = await fetchInventory('barf');
      console.log("GameOverlay.js fetchAndSetInventory() inventoryObj_______", inventoryObj)
      const inventoryItems = parseInventoryObjToGetJustItems(inventoryObj);
      console.log("GameOverlay.js fetchAndSetInventory() inventoryItems_______", inventoryItems)
      const inventoryItemsWithDetails = []
      //ToDo: Get descriptions of items in someone's inventory:
      for (let itemSearchableName of inventoryItems) {
        console.log("fetchAndSetInventory() itemSearchableName_________", itemSearchableName)
        var itemDetails = await fetchOneItemDetails(itemSearchableName)
        inventoryItemsWithDetails.push(itemDetails)
      }
      console.log("inventoryOverlay.js fetchAndSetInventory() inventoryItemsWithDetails_____________", inventoryItemsWithDetails)
      setInventory(inventoryItemsWithDetails);
      setInventoryItems(inventoryItems)
    }

  return (
    <ApolloProvider client={client}>
      <div>
        <Interaction
          inventoryItems={inventoryItems}
          showChat={showChat}
          setShowChat={setShowChat}
          showSpecialFeatures={showSpecialFeatures}
          setShowSpecialFeatures={setShowSpecialFeatures}
          setShowAnything={setShowAnything}
        />
        <VideoComponent />
        <InnerMind />
        <SeerTextInput />
        {showInventory &&
          <InventoryOverlay setShowAnything={setShowAnything} inventory={inventory} setInventory={setInventory} />
        }
        <EndGame />
      </div>
    </ApolloProvider>
  )
}

export default GameOverlay;

