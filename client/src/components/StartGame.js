import React from 'react';

const VideoComponent = () => {
  const gameSaved = true; // Replace with your variable or state value

  const handleVideoClick = () => {
    if (!gameSaved) {
      // Perform additional actions or show a message when the game is not saved
      console.log("Game not saved. Cannot play video.");
      return;
    }
    // Perform any other actions needed when the game is saved

    // Play video
    const video = document.getElementById('videoElement');
    if (video) {
      video.play();
    }
  };

  return (
    <div>
      <video id="videoElement" onClick={handleVideoClick} controls>
        <source src="../src/images/AnimationGif.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoComponent;