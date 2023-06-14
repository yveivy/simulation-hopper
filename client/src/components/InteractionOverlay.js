import React, { useRef, useEffect } from "react"
import { createChatPromptFetchReqObj, createTradeRequestPromptFetchReqObj, removeAnythingOutsideOfQuotes, resetInteractionGlobalVars, questionData, setInteractionModeFlag, disableWASD, enableWASD} from "../utils/interactionMenu";
import { retrieveInventoryData} from "../utils/inventory";
import { fetchCharacterData } from "../utils/db/fetches";
import { fetchOpenAiApi, createPromptForNpcResponseToChat, createPromptForNpcResponseToTradeRequest} from "../utils/ai.js"

const InteractionOverlay = () => {
    var interactionContainer = document.getElementById('interactionContainer');
    var userInputContainer = document.getElementById('userInputContainer');
    var dialogueContainer = document.getElementById('dialogueContainer');
    var dialogueUl = document.getElementById('dialogueUl');
    var npcBioContainer = document.getElementById('npcBioContainer')
    var npcNameEl = document.querySelector("#npcName")
    var npcHeadshotContainer = document.querySelector("#npcHeadshotContainer")


    // const interactionContainer = useRef(null);

    // const showInteractionContainer = () => {
    //     if (interactionContainer.current) {
    //     interactionContainer.current.style.display = 'flex';
    //     } else {
    //     console.error('interactionContainer is null');
    //     }
    // }

    // const hideInteractionContainer = () => {
    //     if (interactionContainer.current) {
    //     interactionContainer.current.style.display = 'none';
    //     } else {
    //     console.error('interactionContainer is null');
    //     }
    // }

    // useEffect(() => {
    //     hideInteractionContainer(); // hide the container when the component mounts
    // }, []);

    const showInteractionContainer = () => {
        console.log("")
        window.domEls.interactionContainer.style.display = 'flex';
    }
    
    const hideInteractionContainer = () => {
        window.domEls.interactionContainer.style.display = 'none';
    }




    const getRadioInputValue = () => {
        let radios = document.querySelectorAll('[name="choice"]');
        let selectedValue;
        
        radios.forEach((radio) => {
            if (radio.checked) {
                selectedValue = radio.value;
            }
        });
    
        return selectedValue; // this will be the value of the selected radio button
    };
    
    const getTextInputValue = () => {
        let textInputValue = document.querySelector("#chatInput").value;
        return textInputValue;
    };
    
    const askEitherQuestionType = (currentQuestion) => {
        if (currentQuestion.type === "input") {
            renderTextQuestion(currentQuestion);
        } else if (currentQuestion.type === "radio") {
            renderCheckBoxQuestion(currentQuestion);
        }
    };
    
    const renderTextQuestion = (currentQuestion) => {
        clearUserInputContainer();
        let questionText = createQuestionText(currentQuestion);
        userInputContainer.appendChild(questionText);
        
        let input = document.createElement("input");
        input.type = "text";
        input.id = "chatInput";
        userInputContainer.appendChild(input);
    };
    
    const renderCheckBoxQuestion = (currentQuestion) => {
        clearUserInputContainer();
        let questionText = createQuestionText(currentQuestion);
        userInputContainer.appendChild(questionText);
        
        currentQuestion.choices.forEach((choice) => {
            let label = document.createElement("label");
            
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.value = choice;
            radio.name = "choice";
            label.appendChild(radio);
            
            let choiceText = document.createTextNode(choice);
            label.appendChild(choiceText);
            
            userInputContainer.appendChild(label);
        });
    };
    
    const clearUserInputContainer = () => {
        userInputContainer.innerHTML = "";
    };
    
    const clearUl = (ul) => {
        ul.innerHTML = "";
    };
    
    const clearChatInput = () => {
        var chatInput = document.querySelector("#chatInput");
        chatInput.value = "";
    };
    
    const createQuestionText = (currentQuestion) => {
        let questionText = document.createElement("p");
        questionText.innerText = currentQuestion.text;
        return questionText;
    };

    const populateInteractionContainerWithNpcData = (npcDataObject) => {
        window.globalVars.npcDataObject.searchable_name = window.interactionObject
    
        npcNameEl.innerHTML = npcDataObject.full_name
        npcHeadshotContainer.style.backgroundImage = `url('../images/characterHeadshots/${npcDataObject.searchable_name}.png')`
        npcBioContainer.innerHTML = `Bio:  ${npcDataObject.bio}`
    }
    
    const clearAllInteractionContainers = () => {
        clearUl(dialogueUl)
        clearUserInputContainer()
        hideInteractionContainer()
    }

    const appendLiToUl = (ul, text) => {
        var li = document.createElement("li")
        li.innerHTML = text
        ul.appendChild(li)
    }

    const processChatMessage = async () => {
        clearUl(dialogueUl)
        clearChatInput()
        var reqObj = createChatPromptFetchReqObj()
        var prompt = createPromptForNpcResponseToChat(reqObj)
        var unformattedPromptResponse = await fetchOpenAiApi(prompt)
        var promptResponse = removeAnythingOutsideOfQuotes(unformattedPromptResponse)
        var npcText = `${window.globalVars.npcDataObject.full_name}: "${promptResponse}"`
        window.globalVars.dialogueList.push(npcText)
    
        for (let line of window.globalVars.dialogueList) {
            appendLiToUl(dialogueUl, line)
        }
    }

      
    const renderInventoryItemDetailsInUl = (ul, inventory) => {
        for (var item of inventory) {
            var name = item.item.item_name
            var description = item.item.description

            appendLiToUl(ul, `Item name: ${name}`)
            appendLiToUl(ul, `Description: ${description}`)
            appendLiToUl(ul, "&nbsp;")
        }
    }
    
    const processTradeOffer = async () => {
        //! uncomment once fetchTradeOfferResponse works: window.globalVars.tradeOfferDecision = await fetchTradeOfferResponse()
        console.log("processTradeOffer() offerDecision________", window.globalVars.tradeOfferDecision)
        var reqObj = await createTradeRequestPromptFetchReqObj()
        var prompt = createPromptForNpcResponseToTradeRequest(reqObj)
        var promptResponse = await fetchOpenAiApi(prompt)
        var tradeSummary = `*User offers ${window.globalVars.tradeRequestData.itemOfferedByUser} in exchange for ${window.globalVars.tradeRequestData.itemRequestedByUser}.*`
        var dialogueText = `NPC: ${promptResponse}`
        appendLiToUl(dialogueUl, tradeSummary)
        appendLiToUl(dialogueUl, dialogueText)
        clearUserInputContainer()
        // appendTradeOfferSummaryToUserInputContainer:
    }

    useEffect(() => {
        const handleKeyDown = async (e) => {
            if (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd' || e.key === 'e') {
                return
            }
            try {
                await retrieveInventoryData()
            } catch {
                console.log("interactionOverlay.js retrieveInventoryData() failed")
            }
            if (e.key === ' ' && window.globalVars.currentQuestionIndex == 0 && window.interactionObject!='') {
                disableWASD()  
                try {
                    window.globalVars.npcDataObject = await fetchCharacterData(window.interactionObject)
                    populateInteractionContainerWithNpcData(window.globalVars.npcDataObject)
                } catch {
                    console.log("interactionOverlay.js tried to fetch npc data but failed")
                }
                showInteractionContainer()
                askEitherQuestionType(questionData.interactionModeQuestion)
                window.globalVars.currentQuestionIndex ++
            } else if (e.code === 'Enter' && window.globalVars.currentQuestionIndex == 1) {
                var interactionModeInputValue = getRadioInputValue()
                if (!interactionModeInputValue) {
                    console.log("Tried to press enter before any input option selected")
                    return
                }
                setInteractionModeFlag(interactionModeInputValue)
                if (window.globalVars.trade) {
                    console.log('EventListener() trade chosen; userInventoryItems________',window.globalVars.userInventoryItems)
                    askEitherQuestionType(questionData.offerQuestion)
                    try {
                        renderInventoryItemDetailsInUl(dialogueUl, window.globalVars.userInventoryObjArray)
                    } catch {
                        console.log("interactionOverlay.js DB Error: nothing in inventory")
                        // resetInteractionGlobalVars()
                        // clearAllInteractionContainers()
                        return
                    }
                } else if (window.globalVars.chat) {
                    askEitherQuestionType(questionData.chatQuestion)
                }
                window.globalVars.currentQuestionIndex ++ 
            } else if (e.code === 'Enter' && window.globalVars.chat && window.globalVars.currentQuestionIndex >= 2) { 
                window.globalVars.chatInputValue = getTextInputValue()
                if (window.globalVars.chatInputValue=="") {
                    console.log("Tried to press enter before any input option selected")
                    return
                }
                window.globalVars.dialogueList.push(`User: "${window.globalVars.chatInputValue}"`)
                window.globalVars.currentQuestionIndex ++
                processChatMessage(window.globalVars.chatInputValue)
            } else if (e.code === 'Enter' && window.globalVars.trade && window.globalVars.currentQuestionIndex == 2) {
                window.globalVars.tradeRequestData.itemOfferedByUser = getRadioInputValue()
                if (!window.globalVars.tradeRequestData.itemOfferedByUser) {
                    console.log("Tried to press enter before any input option selected")
                    return
                }
                askEitherQuestionType(questionData.receiveQuestion)
                clearUl(dialogueUl)
                renderInventoryItemDetailsInUl(dialogueUl, window.globalVars.npcInventoryObjArray)
                window.globalVars.currentQuestionIndex ++
            } else if (e.code === 'Enter' && window.globalVars.trade && window.globalVars.currentQuestionIndex == 3) {
                window.globalVars.tradeRequestData.itemRequestedByUser = getRadioInputValue()
                if (!window.globalVars.tradeRequestData.itemRequestedByUser) {
                    console.log("Tried to press enter before any input option selected")
                    return
                }
                window.globalVars.currentQuestionIndex ++ 
                clearUl(dialogueUl)
                processTradeOffer()
            } else if (e.code === 'Escape' && window.globalVars.currentQuestionIndex > 0) {
                console.log("interactionMenu.js eventListener escape-key__________")
                resetInteractionGlobalVars()
                clearAllInteractionContainers()
                
                enableWASD()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <div id="interactionContainer">
            <div id="userInputAndDialogueContainer">
            <div id='userInputContainer'></div>
            <div id="dialogueContainer">
                <ul id="dialogueUl"></ul>
            </div>
        </div>

            <div id="npcDetailsContainer">
            <div id="npcNameContainer">
                {/* <h2 id="npcName"></h2> */}
            </div>
            <div id="npcHeadshotContainer">
            </div>
            <div id="npcBioContainer">
            </div>
            </div>            
        </div>
        )
}
export default InteractionOverlay