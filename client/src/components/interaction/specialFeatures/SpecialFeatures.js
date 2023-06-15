import React from "react"
import "../../../css/overlay1.css"

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
    </div>
  )
}

export default SpecialFeatures;
