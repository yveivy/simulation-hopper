import React from 'react';
import ReactDOM from 'react-dom';
import './css/home.css';
import App from './App';
import GameOverlay from "./GameOverlay"

//Homepage
// const rootElement = document.getElementById('root');
// if (rootElement) {
//   ReactDOM.render(<App />, rootElement);
// }

const overlayElement = document.getElementById('game-overlay-react-root');
if (overlayElement) {
  ReactDOM.render(<GameOverlay />, overlayElement);
}