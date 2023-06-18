import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
  return (
    <div style={columnStyle}>
      <h1>Simulation Hopper</h1>
      <iframe src="/game/gameproxy.html" title="SimulationHopper" style={iframeStyle} />
    </div>
  );
};

export default GameProxy;