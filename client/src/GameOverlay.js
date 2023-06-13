import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import InteractionOverlay from './components/InteractionOverlay';
import InventoryOverlay from "./components/InventoryOverlay"
import client from './apolloClient'

function GameOverlay() {
  return (
    <ApolloProvider client={client}>
      <div>
        <InteractionOverlay />
        
        <InventoryOverlay />
      </div>
    </ApolloProvider>
  )
}
export default GameOverlay;