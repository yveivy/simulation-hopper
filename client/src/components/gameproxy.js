import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import miniMap from '../images/MiniMapWithNames.png';
import { Link } from 'react-router-dom';


const GameProxy = () => {
  const navigate = useNavigate();

  useEffect(() => {
  function noTokenNoPlay() {
    const currentToken = localStorage.getItem('nekotsresueht');
    console.log('currentToken', currentToken);
    if (currentToken === null) {
      navigate('/login');
    }
  }
  noTokenNoPlay();
}, [navigate]);


// Rest of your component code



  const iframeStyle = {
    width: '1024px',
    height: '578px',
    display: 'block',
    margin: 'auto',
    borderColor: 'white',
    borderRadius: '10px'
  };

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
    <div style={columnStyle}>
      <h1><Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>Simulation Hopper</Link></h1>
      <iframe src="/game/gameproxy.html" title="SimulationHopper" style={iframeStyle} />
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
    </div>
  );
};

export default GameProxy;