import React, {useEffect, useState} from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import InteractionOverlay from './components/InteractionOverlay';
import InventoryOverlay from "./components/InventoryOverlay"
import client from './utils/db/apolloClient'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/overlay.css'
import EndGame from './components/EndGame';
import Chat from "./components/interaction/chat/Chat"
import Interaction from "./components/interaction/Interaction"

function GameOverlay() {
  const [showChat, setShowChat] = useState(false);
  const [showSpecialFeatures, setShowSpecialFeatures] = useState(false);


  useEffect(() => {
    const handleKeyDown = (event) => {
        switch(event.code) {
            case 'Space':
                setShowChat(true);
                break;
            case 'Escape':
                setShowChat(false);
                setShowSpecialFeatures(false);
                break;
            default:
                break;
        }
    };
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, []);


  return (
    <ApolloProvider client={client}>
      <div>
        <Interaction 
          showChat={showChat}
          setShowChat={setShowChat}
          showSpecialFeatures={showSpecialFeatures}
          setShowSpecialFeatures={setShowSpecialFeatures}
        />
        <InventoryOverlay />

        <EndGame />
      </div>
    </ApolloProvider>
  )
}

export default GameOverlay;