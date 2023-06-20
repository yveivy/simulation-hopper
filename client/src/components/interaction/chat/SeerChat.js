import React, { useState, useEffect, useContext } from 'react';
import InnerMindGif from '../../../images/InnerMindGif.gif';
import Dialogue from './Dialogue.js';
import SeerTextFeatures from '../../interaction/specialFeatures/SeerTextFeatures.js';
import { formatDialogueForPrompt, fetchOpenAiApi, createNextPromptForTextEnvironmentGame, createPremisePromptForTextEnvironmentGame, createPremisePromptFor20Questions} from '../../../utils/ai';
import { DialogueContext } from '../Interaction';

const SeerTextInput = () => {
  const [inputText, setInputText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [dialogueList, setDialogueList] = useState([]);
  const [environmentAndContainer, setEnvironmentAndContainer] = useState("")

  const addDialogue = (speaker, text) => {
    setDialogueList((prevDialogueList) => [...prevDialogueList, { speaker, text }]);
  };

  const parseJsonString = (jsonData, property) =>{
    let parsedData = JSON.parse(jsonData);
    return parsedData[property];
}

// setDialogueList([])

// useEffect(() => {
//   const setupSpecialFeature = async () => {
//       //   setTimeout(function() {
//       //     console.log("This message is displayed after a 10 second delay.");
//       // }, 10000);
//       if (dialogueList.length < 1 && environmentAndContainer === "" && window.interactionObject === 'shaman') {
//           // addDialogue("****", `******`) //placeholder
//           var environmentAndContainerString = await fetchOpenAiApi(createPremisePromptForTextEnvironmentGame())
//           // var environmentAndContainerString= `{"environmentOverview": "example concept", "container": "example container"}`
//           setEnvironmentAndContainer(environmentAndContainerString)
//           let environmentOverview = parseJsonString(environmentAndContainerString, 'environmentOverview');
//           // setDialogueList([{speaker:"Barf",text:"****"}])
//           addDialogue("Barf", `*Blinks as if waking up from a deep sleep and looks around...*`)
//           addDialogue("Description", environmentOverview)
//           addDialogue("Seer", "You can find the secret to your success within a container in this environment. Type to navigate.")
//         }
//   }
//   setupSpecialFeature()
// }, [])





  const handleSubmit = async (event) => {
    event.preventDefault();
    const localCopyOfDialogueList = [...dialogueList, {speaker: 'Barf', text: inputText}]; //local copy
    // // Placeholder logic for handling submission
    var chatHistory = formatDialogueForPrompt(localCopyOfDialogueList.slice(3))
    console.log('chatHistory___', chatHistory)
    addDialogue('Barf', inputText)
    var prompt = createNextPromptForTextEnvironmentGame(environmentAndContainer, chatHistory)
    var npcResponse = await fetchOpenAiApi(prompt)
    if (npcResponse.includes(`found`)) {
      var container = parseJsonString(environmentAndContainer, 'container');
      addDialogue("Seer", `You have found the secret to your success inside ${container}!`)
      addDialogue("Seer", `The secret to yourself is these talented engineers:`)
      addDialogue("engineer", `https://www.linkedin.com/in/j-seybold-0a737627a/`)
      addDialogue("engineer", `https://www.linkedin.com/in/edward-wells87/`)
      addDialogue("engineer", `https://www.linkedin.com/in/yevette-hunt/`)
      addDialogue("engineer", `https://www.linkedin.com/in/willrcline/`)
    }
     else {
       console.log('else')
      addDialogue("Description", npcResponse)
    }
    console.log('Submitted:', inputText);
    setInputText('');
  };

  const handleInputChange = (event) => {
    event.preventDefault()
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
      setDialogueList([])
      setEnvironmentAndContainer("")
    }
  };

  const response = "hey whatsup doggg ";

  useEffect(() => {
    const spacebarListener = async (event) => {
      if (event.code === 'Space' && window.interactionObject === 'shaman' && dialogueList.length < 1) {
        const timer = setTimeout(() => {
          setShowTextInput(true);
        }, 30000);

        var environmentAndContainerString = await fetchOpenAiApi(createPremisePromptForTextEnvironmentGame())
        // var environmentAndContainerString= `{"environmentOverview": "example concept", "container": "example container"}`
        setEnvironmentAndContainer(environmentAndContainerString)
        let environmentOverview = parseJsonString(environmentAndContainerString, 'environmentOverview');
        // setDialogueList([{speaker:"Barf",text:"****"}])
        addDialogue("Barf", `*Blinks as if waking up from a deep sleep and looks around...*`)
        addDialogue("Description", environmentOverview)
        addDialogue("Seer", "You can find the secret to your success within a container in this environment. (Type to navigate.)")

        return () => {
          clearTimeout(timer);
        };
      }
    };

    document.addEventListener('keydown', spacebarListener);
    return () => {
      document.removeEventListener('keydown', spacebarListener);
    };
  }, [dialogueList.length]);

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
          <ul id="seer-text" style={{color: "white", width: '90%', textAlign:"left"}}>
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
            placeholder='Ask of the Seer...'
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
