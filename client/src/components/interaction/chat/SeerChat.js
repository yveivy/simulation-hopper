import React, { useState, useEffect, useContext } from 'react';
import InnerMindGif from '../../../images/InnerMindGif.gif';
import Dialogue from './Dialogue.js';
import SeerTextFeatures from '../../interaction/specialFeatures/SeerTextFeatures.js';
import { fetchOpenAiApi } from '../../../utils/ai';
import { DialogueContext } from '../Interaction';

const SeerTextInput = () => {
  const [inputText, setInputText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [dialogueList, setDialogueList] = useState([{"speaker": "testSpeaker", "text": "testText"}]);

  const addDialogue = (speaker, text) => {
    setDialogueList((prevDialogueList) => [...prevDialogueList, { speaker, text }]);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Placeholder logic for handling submission
    addDialogue('Barf', inputText)
    // prompt = createResponsePromptFor20Questions(secretWord, inputText)
    var npcResponse = await fetchOpenAiApi(inputText)
    addDialogue("Seer", npcResponse)

    console.log('Submitted:', inputText);
    setInputText('');
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleTextAreaKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleEscapeKeyDown = (event) => {
    if (event.key === 'Escape') {
      setShowTextInput(false);
    }
  };

  const response = "hey whatsup doggg ";

  useEffect(() => {
    const spacebarListener = (event) => {
      if (event.code === 'Space' && window.interactionObject === 'shaman') {
        const timer = setTimeout(() => {
          setShowTextInput(true);
        }, 30000);
        return () => {
          clearTimeout(timer);
        };
      }
    };

    document.addEventListener('keydown', spacebarListener);
    return () => {
      document.removeEventListener('keydown', spacebarListener);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKeyDown);
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, []);

  if (!showTextInput) {
    return null; // Render nothing if showTextInput is false
  }

  return (
    <div className="input-section">
      <div id="seer-dialogue">
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
      {/* <Dialogue /> */}
      {/* <SeerTextFeatures /> */}
  
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
            id="submit-chat-button">
            Submit
          </button>
        </form>
        {/* <TextInput seerFeatures={seerFeatures} /> */}
        <div id="text-input-container">
            <form id="chat-input-form" onSubmit={handleSubmit}>
                <textarea  style={{
                    width: '100%',
                    height: '25px',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '16px',
                    margin: '20 0px',
                    backgroundColor: ' rgb(66, 133, 55)',
                    color: 'white',
                    
                }}
                    id = "chat-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleTextAreaKeyDown}
                />
                      
                <button style={{
                    height: '45px',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '16px',
                    margin: '20 0px',
                    backgroundColor: ' rgb(66, 133, 55)',
                    color: 'white',
                    border: 'none',
                    boxShadow: '10px 10px 20px rgba(0,0,0,0.3)',
                    transition: '0.3s ease' 
                    
                }} 
                onMouseDown={(e) => {
                    e.target.style.boxShadow = '2px 2px 5px rgba(99,157,82,0.2';
                }}

                onMouseUp={(e) => {
                    e.target.style.boxShadow = '5px 5px 10px rgba(66,133,55, 0.3';
                }}
                
                id="submit-chat-button">Submit</button>
            </form>
        </div>

      </div>

      <img src={InnerMindGif} alt="InnerMindGif" className="inside" />
    </div>

  );
};

export default SeerTextInput;
