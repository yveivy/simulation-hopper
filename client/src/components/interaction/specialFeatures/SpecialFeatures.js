import React, {useEffect, useState, useContext} from "react"
import "../../../css/overlay1.css"
import { enableWASD } from "../../../utils/interactionMenu";
import Violet from "./Violet"
import Taylor from "./Taylor"
import Zara from "./Zara"
import Seer from "./Seer"
import { DialogueContext } from "../Interaction";

const SpecialFeatures = ({ inventoryItems, setShowAnything, setShowChat, setShowSpecialFeatures }) => {

    const { setDialogueList } = useContext(DialogueContext);

    useEffect(() => {
      setDialogueList([])
    }, [setDialogueList]);

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

        <Taylor inventoryItems={inventoryItems} handleClose={handleClose}/>

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
