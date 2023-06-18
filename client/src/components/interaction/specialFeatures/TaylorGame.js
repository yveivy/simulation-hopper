import React, {useState} from "react"
import "../../../css/overlay1.css"

import Dialogue from "../chat/Dialogue"
import TextInput from "../chat/TextInput";
import { fetchOpenAiApi, createPremisePromptFor20Questions, createResponsePromptFor20Questions } from "../../../utils/ai";

const TaylorGame = ({inventoryItems, handleClose}) => {


  return (
    <div id="taylor-game">
        {/* <DialogueContext.Provider value={{ dialogueList, addDialogue }}> */}
            <Dialogue />
            <TextInput />
        {/* </DialogueContext.Provider> */}
    </div>
  )
}

export default TaylorGame;
