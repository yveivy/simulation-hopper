import React, { useState, useContext } from 'react';
import TextInput from '../chat/TextInput.js'
import { DialogueContext } from '../Interaction.js';
import { fetchOpenAiApi } from '../../../utils/ai.js';

const SeerTextFeatures = () => {

  const { addDialogue, dialogueList, handleClose } = useContext(DialogueContext);

  const seerFeatures = true;
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    addDialogue('Barf', inputText)
    // prompt = createResponsePromptFor20Questions(secretWord, inputText)
    var npcResponse = await fetchOpenAiApi(inputText)
    addDialogue("Seer", npcResponse)
    // Placeholder logic for handling submission
    console.log('Submitted:', inputText);
    setInputText('');
  };

  const handleTextAreaKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div>
      <div>
          <div id="seer-dialogue-container" style={{zIndex: "120000000"}}>
          <ul id="seer-text" style={{color: "white"}}>
            {dialogueList.map((dialogue, index) => (
              <li key={index}>
                {dialogue.speaker}: {dialogue.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div id="text-input-container">
        <form id="chat-input-form" onSubmit={handleSubmit}>
          <textarea
            style={{
              position: 'fixed',
              width: '100%',
              height: '40px',
              fontSize: '25px',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflow: 'auto',
              color: 'white',
              textAlign: 'center',
              top: '80%',
              left: '50%',
              transform: 'translate(-50%, -60%)',
              zIndex: 1004,
            }}
            id="chat-input"
            placeholder='Respond to the seer here...'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleTextAreaKeyDown}
          />
          <button
            style={{
              height: '45px',
              borderRadius: '5px',
              padding: '10px',
              fontSize: '16px',
              margin: '20px 0px',
              backgroundColor: 'rgb(66, 133, 55)',
              color: 'white',
              border: 'none',
              boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
              transition: '0.3s ease',
            }}
            onMouseDown={(e) => {
              e.target.style.boxShadow = '2px 2px 5px rgba(99,157,82,0.2';
            }}
            onMouseUp={(e) => {
              e.target.style.boxShadow = '5px 5px 10px rgba(66,133,55, 0.3';
            }}
            id="submit-chat-button"
          >
            Submit
          </button>
        </form>
        <TextInput seerFeatures={seerFeatures} />
      </div>
    </div>
  );
};

export default SeerTextFeatures;
