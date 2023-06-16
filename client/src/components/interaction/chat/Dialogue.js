import React, { useContext } from "react"
import { DialogueContext } from "./Chat"

import "../../../css/overlay1.css"



const Dialogue = () => {
  const { dialogueList } = useContext(DialogueContext)
  
  return (
    <div id="dialogue-container">
      <ul className="dialogue-ul">
        {dialogueList.map((dialogue, index) => (
          <li key={index}>
            {dialogue.speaker}: {dialogue.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dialogue;
