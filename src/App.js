import { Helmet } from 'react-helmet';
import './App.css';
import CanvasScripts from './components/CanvasScripts';
import CanvasElement from './components/CanvasElement';
import React from "react"



function App() {
  return (
    <div className="App">
      <CanvasElement />
      <CanvasScripts />
    </div>
  );
}

export default App;
