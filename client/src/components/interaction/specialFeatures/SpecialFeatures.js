import React from "react"
import "../../../css/overlay1.css"
import Violet from "./Violet"

const SpecialFeatures = ({ setShowChat, setShowSpecialFeatures }) => {

    const handleTab = () => {
        setShowSpecialFeatures(false);
        setShowChat(true);
    };
    const handleClose = () => {
        setShowChat(false);
        setShowSpecialFeatures(false);
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
