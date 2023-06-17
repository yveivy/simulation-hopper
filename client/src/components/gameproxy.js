import React from 'react';

const GameProxy = () => {
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