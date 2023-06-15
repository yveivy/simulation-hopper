import React from "react"
import Dialogue from "./Dialogue"
import TextInput from "./TextInput"
import "../../../css/overlay1.css"

const Chat = ({ setShowChat, setShowSpecialFeatures }) => {
  const handleTab = () => {
    setShowChat(false);
    setShowSpecialFeatures(true);
  };
  const handleClose = () => {
    setShowChat(false);
    setShowSpecialFeatures(false);
  };

  return (
    <div className="interaction-container" id="chat-container">
        <nav className="interaction-nav">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleTab}>Trade</button>
        </nav>      
        <Dialogue />
        <TextInput />
    </div>
  )
}

export default Chat;
