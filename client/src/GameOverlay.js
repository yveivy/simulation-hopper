import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
// import InteractionOverlay from './components/InteractionOverlay';
import InventoryOverlay from "./components/InventoryOverlay"
import client from './utils/db/apolloClient'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './css/overlay.css'

function GameOverlay() {
  return (
    <ApolloProvider client={client}>
      <div>
        {/* <InteractionOverlay /> */}
        
        <InventoryOverlay />
      </div>
    </ApolloProvider>
  )
}
export default GameOverlay;