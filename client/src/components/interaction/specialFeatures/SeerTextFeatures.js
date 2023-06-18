import React, { useState } from 'react';
import TextInput from '../chat/TextInput.js'

const SeerTextFeatures = () => {
  const seerFeatures = true;
  const [inputText, setInputText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
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
  );
};

export default SeerTextFeatures;
