import React, { useEffect, useState, createContext, useContext} from "react"
import Dialogue from "./Dialogue"
import TextInput from "./TextInput"
import { DialogueContext } from "../Interaction"
import "../../../css/overlay1.css"
import { enableWASD } from "../../../utils/interactionMenu";
import SeerTextInput from "./SeerChat";

// export const DialogueContext = createContext();

const Chat = ({ setShowAnything, setShowChat, setShowSpecialFeatures }) => {
  const { setDialogueList } = useContext(DialogueContext);

  useEffect(() => {
    setDialogueList([])
  }, [setDialogueList]);

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
          <button className="close btn" onClick={handleClose}>Close</button>
          <button className="trade btn" onClick={handleTab}>Special</button>
        </nav>
        <Dialogue />
        <TextInput />
    </div>
  )
}

export default Chat;