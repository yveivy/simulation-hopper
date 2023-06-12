import React from 'react';
import InteractionOverlay from './components/InteractionOverlay';
import InventoryOverlay from "./components/InventoryOverlay"

function GameOverlay() {
  return (
    <div>
      <InteractionOverlay />
      
      <InventoryOverlay />
    </div>
  )
}
export default GameOverlay;