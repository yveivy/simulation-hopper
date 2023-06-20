import React, { useState } from "react";
import "../../../css/overlay1.css"
import {fetchOpenAiApi, createPromptForPoemChallenge, createPromptForPoemRating} from "../../../utils/ai"




const Zara = ({inventoryItems, handleClose}) => {
    const [rating, setRating] = useState(false);
    const [challengeAccepted, setChallengeAccepted] = useState(false);
    const [repairToolAcquired, setRepairToolAcquired] = useState(false);
    const[challengeFailed, setChallengeFailed] = useState(false);
    const [Retry, setRetry] = useState(true);
    const[poemTopic, setPoemTopic] = useState(" ");
    const [userPoem, setUserPoem] = useState(" ");

    console.log('challengeAccepted:', challengeAccepted);
    console.log('repairToolAcquired:', repairToolAcquired);
    const [showDoChallenge, setShowDoChallenge] = useState(true)

    const handleAcceptChallenge = async () => {
        const prompt = createPromptForPoemChallenge();
        const response = await fetchOpenAiApi(prompt);
        console.log('response from fetchOpenAiApi', response);
        const topic = response.trim();
        setPoemTopic(topic);
        setChallengeAccepted(true);
        setShowDoChallenge(true)
        console.log('handleAcceptChallenge completed successfully.')
    };

    const hasRepairTool = localStorage.getItem('repairTool')
    const handleFinishChallenge = async (userPoem) => {
        console.log(userPoem);
        const poemText = userPoem;
        const prompt = createPromptForPoemRating(poemText, poemTopic);
        const response = await fetchOpenAiApi(prompt);
        const rating = parseInt(response.replace(/"/g, ''));
        setShowDoChallenge(false)

        setRating(rating);

        if (rating >= 3 ){
            setRepairToolAcquired(true);
            localStorage.setItem('aetheric', true)
        } else {
            setChallengeFailed(true);
            setRetry(true);
        }
    };

    const handlePoemInputChange = (e) => {
        setUserPoem(e.target.value);
    };

    const handleRetryChallenge = () => {
       setChallengeAccepted(false);
       setRepairToolAcquired(false);
       setChallengeFailed(false);
       setRetry(true);
       setShowDoChallenge(true)
    };



    return (
        <div id="zara-container">
            {!hasRepairTool && !rating && !challengeAccepted  && (
                <div id="storyline">
      
                <p>Zara: Hello interstellar traveler! I'm set for retirement and don't really need anything you're offering to trade, but I do sympathize with your plight and your ship would be easy to repair with the right tool. I really love poetry. If you can recite a short poem on a topic of my choosing, and it pleases me well enough, I'll just give you the spaceship wrench. Would you like to try?</p>

                    <div className="response-options">

                        <button className="btn" onClick={handleAcceptChallenge}>Accept</button>
                        <button className="btn" onClick={handleClose}>Decline</button>

                    </div>
                </div>
            )}
            {hasRepairTool && (
                <p>Use the tool to go fix your ship!!</p>
            )}
            {challengeAccepted && !repairToolAcquired && (
                <div>
                <p>Zara: I'm so happy to find a fellow poet. String some words together about "{poemTopic}". Just to warn you, I'll be brutally honest, as I can't stand poetry hack jobs. I'd rather listen to the clang of metal than a botched poem.</p>
                <textarea className="zara-input"  value={userPoem} 
                onChange={handlePoemInputChange} 
                placeholder="Enter your poem here" />
                <button className="zara-button" onClick={() => handleFinishChallenge(userPoem)}>Submit</button>
                </div>
            )}

            {repairToolAcquired && (
                <div style={{margin:"60px", display: "flex", flexDirection:"column"}}>
                    <p>Zara: I rate your poem as {rating}/5. Congratulations! You've earned the tool to repair your ship. Good luck!</p>
                    </div>
            )} 
            
            {/* Zara should pass the wrench item to Barf after this runs, if repairToolAcquired is true */}

            {challengeFailed && (
                <div style={{margin:"60px", display: "flex", flexDirection:"column"}}>
                    <p>Zara: Sorry, but i'd rate your poem as {rating}/5, and that's not good enough. I'd rather listen to the clang of metal. Try again if you think you can improve.</p>
                    {Retry && <button className="zara-button" onClick={handleRetryChallenge}>Try Again</button>}
                    </div>
            )}

        </div>
    );
};



export default Zara; 

