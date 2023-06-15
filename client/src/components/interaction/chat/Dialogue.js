import React, { useEffect, useState } from "react"
import { useDialogue } from "../../../utils/dialogue";

import "../../../css/overlay1.css"

const Dialogue = () => {
  const { dialogueList } = useDialogue()
  
  return (
    <div id="dialogue-container">
      <ul className="dialogue-ul">
        {dialogueList.map((dialogue, index) => (
          <li key={index}>
            <strong>{dialogue.speaker}</strong>: {dialogue.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dialogue;
