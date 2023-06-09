import React, {useEffect, useState, useContext} from "react"
// import "../../../css/overlay1.css"
import { enableWASD } from "../../../utils/interactionMenu";
import Violet from "./Violet"
import Taylor from "./Taylor"
import Zara from "./Zara"
import Seer from "./SeerTextFeatures"
import { DialogueContext } from "../Interaction";

const SpecialFeatures = ({ inventoryItems, setShowAnything, setShowChat, setShowSpecialFeatures }) => {

    const { setDialogueList, handleClose } = useContext(DialogueContext);

    useEffect(() => {
      setDialogueList([])
    }, [setDialogueList]);

    const handleTab = () => {
        setShowSpecialFeatures(false);
        setShowChat(true);
    };

  return (
    <div className="interaction-container" id="special-features-container">
        <nav className="interaction-nav">

          <button id="close-btn"className="nav-btn" onClick={handleClose}>Close</button>
          <button className="nav-btn" onClick={handleTab}>Chat</button>

          {/* <button onClick={handleClose}>Close</button> */}
          {/* <button onClick={handleTab}>Chat</button> */}

        </nav> 

        {/* <Zara inventoryItems={inventoryItems} handleClose={handleClose}/> */}

        {window.interactionObject === "violet" &&
          <Violet inventoryItems={inventoryItems} handleClose={handleClose}/>
        } 
        {window.interactionObject === "taylor" &&
          <Taylor inventoryItems={inventoryItems} handleClose={handleClose}/>
        }
        {window.interactionObject === "zara" &&
          <Zara inventoryItems={inventoryItems} handleClose={handleClose}/>
        }
        {window.interactionObject === "seer" &&
          <Seer inventoryItems={inventoryItems} handleClose={handleClose}/>
        }

    </div>
  )
}

export default SpecialFeatures;
