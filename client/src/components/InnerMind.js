import React, { useState, useEffect } from "react";
import ShamanForGame from "../images/ShamanForGame.gif";
import InnerMindGif from "../images/InnerMindGif.gif";

const InnerMind = () => {
  const [firstGifClass, setFirstGifClass] = useState("invisible");
  const [secondGifClass, setSecondGifClass] = useState("invisible");

  useEffect(() => {
    setFirstGifClass("visible");
//add if statement for if interaction object is shaman THEN render the remaining code

    const firstGifTimeout = setTimeout(() => {
      setFirstGifClass("invisible");
      setSecondGifClass("visible");
    }, 25000); // Hide the first GIF after 15 seconds and show the second GIF

    const secondGifTimeout = setTimeout(() => {
      setSecondGifClass("invisible");
    }, 30000);
    
    // this is where to add the functionality to make a keydown listener to end the shaman interaction

    return () => {
      clearTimeout(firstGifTimeout);
      clearTimeout(secondGifTimeout);
    };
  }, []);

  return (
    <div>
      <img src={ShamanForGame} alt="ShamanGif" className={firstGifClass} />
      <img src={InnerMindGif} alt="InnerMindGif" className={secondGifClass} />
    </div>
  );
};

export default InnerMind;
