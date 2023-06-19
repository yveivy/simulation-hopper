import React, {useState, createContext, useContext, useEffect} from "react"
import { enableWASD } from "../../utils/interactionMenu"

import Chat from "./chat/Chat"
import SpecialFeatures from "./specialFeatures/SpecialFeatures"
// import "../../css/overlay1.css"

export const DialogueContext = createContext({
    dialogueList: [],
    addDialogue: () => {},
});


const Interaction = ({inventoryItems, setShowAnything, showChat, setShowChat, showSpecialFeatures, setShowSpecialFeatures}) => {
    const [dialogueList, setDialogueList] = useState([{"speaker": "testSpeaker", "text": "testText"}]);

    const addDialogue = (speaker, text) => {
      setDialogueList((prevDialogueList) => [...prevDialogueList, { speaker, text }]);
    };

    const handleClose = () => {
        setShowChat(false);
        setShowSpecialFeatures(false);
        setShowAnything(false)
        enableWASD()
      };


    return (
        <DialogueContext.Provider value={{ dialogueList, addDialogue, setDialogueList, handleClose}}>
            <div>
                {showChat && 
                    <Chat setShowAnything={setShowAnything} setShowChat={setShowChat} setShowSpecialFeatures={setShowSpecialFeatures} />
                }
                {showSpecialFeatures && 
                    <SpecialFeatures inventoryItems={inventoryItems} setShowAnything={setShowAnything} setShowChat={setShowChat} setShowSpecialFeatures={setShowSpecialFeatures}/>
                }
            </div>
        </DialogueContext.Provider>
    );
}

export default Interaction;
