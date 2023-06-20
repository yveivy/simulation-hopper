
import React, { useEffect, useState } from 'react';
import EndGameGif from '../images/EndGameGif.gif';

import { retrieveInventoryData} from "../utils/inventory";

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
      if (
        e.key === ' ' &&
        window.interactionObject === 'Spaceship' &&
        localStorage.getItem('repairTool') === 'true'
      ) {
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
    <div>
      <EndGameGif />
    </div>
  ) : null;
};

export default EndGame;

