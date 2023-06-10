import React from "react";

const CanvasElement = () => {
  return (
    <div className="CanvasElement">
      <canvas id="gameCanvas" width="800" height="600"></canvas>
      <div className="image-container">
        <img src="./images/BarfForEnding.png" alt="Image 2" />
      </div>

      <div id="interactionContainer">
        <div id="userInputAndDialogueContainer">
          <div id="userInputContainer"></div>
          <div id="dialogueContainer">
            <ul id="dialogueUl"></ul>
          </div>
        </div>

        <div id="npcDetailsContainer">
          <div id="npcNameContainer">
            <h2 id="npcName"></h2>
          </div>
          <div id="npcHeadshotContainer"></div>
          <div id="npcBioContainer"></div>
        </div>
      </div>
    </div>
  );
};

export default CanvasElement;
