import React from "react"
import Chat from "./chat/Chat"
import SpecialFeatures from "./specialFeatures/SpecialFeatures"
import "../../css/overlay1.css"

const Interaction = ({setShowAnything, showChat, setShowChat, showSpecialFeatures, setShowSpecialFeatures}) => {

    return (
        <div>
            {showChat && 
                <Chat setShowAnything={setShowAnything} setShowChat={setShowChat} setShowSpecialFeatures={setShowSpecialFeatures} />
            }
            {showSpecialFeatures && 
                <SpecialFeatures setShowAnything={setShowAnything} setShowChat={setShowChat} setShowSpecialFeatures={setShowSpecialFeatures}/>
            }
        </div>
    );
}

export default Interaction;
