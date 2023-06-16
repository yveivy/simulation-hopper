import React, { useState, useEffect } from "react";
import ShamanForGame from "../images/ShamanForGame.gif";
import InnerMindGif from "../images/InnerMindGif.gif";

const InnerMind = () => {
  const [firstGifClass, setFirstGifClass] = useState("invisible");
  const [secondGifClass, setSecondGifClass] = useState("invisible");
  const [isGifVisible, setIsGifVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        if (window.interactionObject === "abe-harmony") {
          setIsGifVisible(true);
          setFirstGifClass("visible");

          const firstGifTimeout = setTimeout(() => {
            setFirstGifClass("invisible");
            setSecondGifClass("visible");
          }, 25000);

          const secondGifTimeout = setTimeout(() => {
            setSecondGifClass("invisible");
            setIsGifVisible(false);
          }, 30000);

          return () => {
            clearTimeout(firstGifTimeout);
            clearTimeout(secondGifTimeout);
          };
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {isGifVisible && (
        <>
          <img src={ShamanForGame} alt="ShamanGif" className={firstGifClass} />
          <img src={InnerMindGif} alt="InnerMindGif" className={secondGifClass} />
        </>
      )}
    </div>
  );
};

export default InnerMind;
