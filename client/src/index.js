import React from 'react';
import ReactDOM from 'react-dom';
import './css/home.css';
import App from './App';
import GameOverlay from "./GameOverlay"
import GameInstructions from './components/GameInstructions';

// Homepage
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<App />, rootElement);
}

const overlayElement = document.getElementById('game-overlay-react-root');
if (overlayElement) {
  ReactDOM.render(<GameOverlay />, overlayElement);
}

const gameInstructionsElement = document.getElementById('game-instructions-react-root');
if (gameInstructionsElement) {
  ReactDOM.render(<GameInstructions />, gameInstructionsElement);
}

// const app = document.getElementById('root');
// if (app) {
//   ReactDOM.render(<App />, overlayElement);
// }