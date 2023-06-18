import React, { useEffect, useState, createContext, useContext} from "react"
import Dialogue from "./Dialogue"
import TextInput from "./TextInput"
import { DialogueContext } from "../Interaction"
import "../../../css/overlay1.css"

// export const DialogueContext = createContext();

const Chat = ({ setShowAnything, setShowChat, setShowSpecialFeatures }) => {
  const { setDialogueList, handleClose } = useContext(DialogueContext);

  useEffect(() => {
    setDialogueList([])
  }, [setDialogueList]);

  const handleTab = () => {
    setShowChat(false);
    setShowSpecialFeatures(true);
  };
  

  return (
    <div className="interaction-container" id="chat-container">
        <nav className="interaction-nav">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleTab}>Special</button>
        </nav>
        <Dialogue />
        <TextInput />
    </div>
  )
}

export default Chat;