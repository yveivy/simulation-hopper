
import React, { useEffect, useState } from 'react';
import EndGameGif from '../images/EndGameGif.gif';

import { retrieveInventoryData} from "../utils/inventory";
const zIndex = {
  zIndex: 10
}

const EndGame = () => {
  const [renderComponent, setRenderComponent] = useState(false);
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if (
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 's' ||
        e.key === 'd' ||
        e.key === 'e'
      ) {
        return;
      }

      const elixir = localStorage.getItem('elixir')
      const repairTool = localStorage.getItem('repairTool')
      if (
        e.key === ' ' &&
        window.interactionObject === 'spaceship' &&
        elixir &&
        repairTool
      ) {
        console.log('endgame')
        setRenderComponent(true);
        setTimeout(() => {
          setRenderComponent(false);
        }, 32000); // 32 seconds
      }
    };


    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return renderComponent ? (
    <div style={zIndex}>
      <img src = {EndGameGif} style={zIndex} alt="EndgameGif"/>
    </div>
  ) : null;
};

export default EndGame;

