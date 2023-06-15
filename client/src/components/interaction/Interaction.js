import React from "react"
import Chat from "./chat/Chat"
import SpecialFeatures from "./specialFeatures/SpecialFeatures"
import "../../css/overlay1.css"

const Interaction = ({showChat, setShowChat, showSpecialFeatures, setShowSpecialFeatures}) => {

    return (
        <div>
            {showChat && 
                <Chat setShowChat={setShowChat} setShowSpecialFeatures={setShowSpecialFeatures} />
            }
            {showSpecialFeatures && 
                <SpecialFeatures setShowChat={setShowChat} setShowSpecialFeatures={setShowSpecialFeatures}/>
            }
        </div>
    );
}

export default Interaction;
