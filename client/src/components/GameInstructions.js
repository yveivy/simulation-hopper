import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import miniMap from '../images/MiniMapWithNames.png';
import { Link } from 'react-router-dom';


const GameInstructions = () => {

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
  
  const instructionsStyle = {
    color: "white", 
    fontSize: "30px",
    display: "block",
    margin: "3px"
  }
  
  return (
      <div style={{zIndex: "10000", display:"flex", flexDirection:"column", margin: '50px'}}>
        <p style={instructionsStyle}>Press "spacebar" when near an NPC or near your spaceship to interact.</p>
        <br />
        <p style={instructionsStyle}>Press the "r" key at any time ask your robot sidekick for help.</p>
        <p style={instructionsStyle}>Robot knows everything Barf needs to know to leave the planet.</p>
        <br />
        <p style={instructionsStyle}>Press "e" to view your inventory.</p>
        <br />
        <p style={instructionsStyle}>Use "w" "a" "s" "d" keys to move Barf.</p>
        <img style={{alignSelf: 'center', border: "3px solid white", borderRadius: '10px', margin: '25px'}} src={miniMap} alt="minimap" />
      </div>
  );
};

export default GameInstructions;