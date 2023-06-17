import React, { useEffect, useState, createContext } from "react"
import Dialogue from "./Dialogue"
import TextInput from "./TextInput"
import "../../../css/overlay1.css"
import { enableWASD } from "../../../utils/interactionMenu";

export const DialogueContext = createContext();

const Chat = ({ setShowAnything, setShowChat, setShowSpecialFeatures }) => {

  const [dialogueList, setDialogueList] = useState([]);

  const addDialogue = (speaker, text) => {
    setDialogueList((prevDialogueList) => [...prevDialogueList, { speaker, text }]);
  };


  const handleTab = () => {
    setShowChat(false);
    setShowSpecialFeatures(true);
  };
  const handleClose = () => {
    setShowChat(false);
    setShowSpecialFeatures(false);
    setShowAnything(false)
    enableWASD()
  };


  return (
    <div className="interaction-container" id="chat-container">
        <nav className="interaction-nav">
          <button className="close btn" onClick={handleClose}>Close</button>
          <button className="trade btn" onClick={handleTab}>Trade</button>
        </nav>
        <DialogueContext.Provider value={{ dialogueList, addDialogue }}>
          <Dialogue />
          <TextInput />
        </DialogueContext.Provider>
    </div>
  )
}

export default Chat;
