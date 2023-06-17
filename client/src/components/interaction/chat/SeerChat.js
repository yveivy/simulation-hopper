import React, { useState, useEffect, createContext } from 'react';
import InnerMindGif from '../../../images/InnerMindGif.gif';
// import Chat from './Chat';
// import Dialogue, { DialogueContext, addDialogue } from './Dialogue.js';


const SeerTextInput = () => {
  const [inputText, setInputText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Placeholder logic for handling submission
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

  const handleKeyDown = (event) => {
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
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!showTextInput) {
    return null; // Render nothing if showTextInput is false
  }

  return (
    <div className="input-section">
     {/* <Chat/>
     <DialogueContext.Provider value={{ dialogueList, addDialogue }}>
          <Dialogue />
          <TextInput />
        </DialogueContext.Provider> */}
      <img src={InnerMindGif} alt="InnerMindGif" className="inside" />
    </div>
  );
};

export default SeerTextInput;
