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

    const handleAcceptChallenge = async () => {
        const prompt = createPromptForPoemChallenge();
        const response = await fetchOpenAiApi(prompt);
        console.log('response from fetchOpenAiApi', response);
        const topic = response.trim();
        setPoemTopic(topic);
        setChallengeAccepted(true);
        console.log('handleAcceptChallenge completed successfully.')
    };

    const handleFinishChallenge = async (userPoem) => {
        console.log(userPoem);
        const poemText = userPoem;
        const prompt = createPromptForPoemRating(poemText, poemTopic);
        const response = await fetchOpenAiApi(prompt);
        const rating = parseInt(response.replace(/"/g, ''));


        setRating(rating);

        if (rating >= 4 ){
            setRepairToolAcquired(true);
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
    };



    return (
        <div id="zara-container">
            {!inventoryItems.includes("wrench") && !rating && !challengeAccepted  && (
                <div id="storyline">

                    <p>Zara: Hello interstellar traveler</p> 
                <p>I'm set for retirement and don't really need anything you're offering to trade, but I do sympathize with your plight and your ship would be easy to repair with the right tool. I really love poetry. If you can recite a short poem on a topic of my choosing, and it pleases me well enough, I'll just give you the spaceship wrench. Would you like to try?</p>

                    <div id="response-options">

                    <button onClick={handleAcceptChallenge}>Accept</button>
                    <button onClick={handleClose}>Decline</button>

                    </div>
                </div>
            )}

            {challengeAccepted && !repairToolAcquired && (
                <div>
                <p>Zara: I'm so happy to find a fellow poet. String some words together about "{poemTopic}". Just to warn you, I'll be brutally honest, as I can't stand poetry hack jobs. I'd rather listen to the clang of metal than a botched poem.</p>
                <textarea value={userPoem} 
                onChange={handlePoemInputChange} 
                placeholder="Enter your poem here" />
                <button onClick={() => handleFinishChallenge(userPoem)}>Submit</button>
                </div>
            )}

            {repairToolAcquired && (
                <div>
                    <p>Zara: Congratulations! You've earned the tool to repair your ship. Good luck!</p>
                    </div>
            )} 
            
            {/* Zara should pass the wrench item to Barf after this runs, if repairToolAcquired is true */}

            {challengeFailed && (
                <div>
                    <p>Zara: Sorry, but your poem wasn't good enough. I'd rather listen to the clang of metal. Try again if you think you can improve.</p>
                    {Retry && <button onClick={handleRetryChallenge}>Try Again</button>}
                    </div>
            )}

        </div>
    );
};



export default Zara; 