import React from "react"
import "../../../css/overlay1.css"
import { enableWASD } from "../../../utils/interactionMenu";
import Violet from "./Violet"

const SpecialFeatures = ({ setShowAnything, setShowChat, setShowSpecialFeatures }) => {

    const handleTab = () => {
        setShowSpecialFeatures(false);
        setShowChat(true);
    };
    const handleClose = () => {
        setShowChat(false);
        setShowSpecialFeatures(false);
        setShowAnything(false)
        enableWASD()
      };

  return (
    <div className="interaction-container" id="special-features-container">
        <nav className="interaction-nav">
          <button onClick={handleClose}>Close</button>
          <button onClick={handleTab}>Chat</button>
        </nav> 

        {window.interactionObject === "violet" &&
          <Violet />
        } 
    </div>
  )
}

export default SpecialFeatures;
