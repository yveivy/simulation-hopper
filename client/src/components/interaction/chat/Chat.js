import React, { useEffect, useState, createContext } from "react"
import Dialogue from "./Dialogue"
import TextInput from "./TextInput"
import "../../../css/overlay1.css"
import { enableWASD } from "../../../utils/interactionMenu";
import SeerTextInput from "./SeerChat";

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
  }
  if(window.interactionObject === "shaman") {
    return (
      null
    )
  }

  return (
    <div className="interaction-container" id="chat-container">
        <nav className="interaction-nav">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleTab}>Trade</button>
        </nav>
        <DialogueContext.Provider value={{ dialogueList, addDialogue }}>
          <Dialogue />
          <TextInput />
        </DialogueContext.Provider>
    </div>
  )
}

export default Chat;
