import React, { useState, useEffect } from 'react';
import AnimationStartGif from '../images/AnimationStartGif.gif';

const VideoComponent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      localStorage.setItem('hasVisitedBefore', true);
      setVisible(true);
    }

    const timeout = setTimeout(() => {
      setVisible(false);
    }, 81000); // 82 seconds = 82000 milliseconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {visible && (
        <img src={AnimationStartGif} alt="AnimationStartGif" className="StartGif" />
      )}
    </div>
  );
};

export default VideoComponent;
