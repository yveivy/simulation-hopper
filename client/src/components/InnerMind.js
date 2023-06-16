import React, { useState, useEffect } from "react";
import ShamanForGame from "../images/ShamanForGame.gif";
import InnerMindGif from "../images/InnerMindGif.gif";

// trying to implement logic for interaction object here
import { resetInteractionGlobalVars } from "../utils/interactionMenu";
const InnerMind = () => {
  const [firstGifClass, setFirstGifClass] = useState("invisible");
  const [secondGifClass, setSecondGifClass] = useState("invisible");

  useEffect(() => {
    if (window.interactionObject === "abe-harmony") {
      console.log('he is interacting with the target')
      setFirstGifClass("visible");

      const firstGifTimeout = setTimeout(() => {
        setFirstGifClass("invisible");
        setSecondGifClass("visible");
      }, 25000); // Hide the first GIF after 15 seconds and show the second GIF

      const secondGifTimeout = setTimeout(() => {
        setSecondGifClass("invisible");
      }, 30000);

      return () => {
        clearTimeout(firstGifTimeout);
        clearTimeout(secondGifTimeout);
      };
    }
  }, []);

  if (window.interactionObject === "abe-harmony") {
    return (
      <div>
        <img src={ShamanForGame} alt="ShamanGif" className={firstGifClass} />
        <img src={InnerMindGif} alt="InnerMindGif" className={secondGifClass} />
      </div>
    );
  } else {
    return null; // Render nothing if the condition is not met
  }
};

export default InnerMind;
