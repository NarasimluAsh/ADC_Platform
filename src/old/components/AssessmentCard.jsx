// src/components/AssessmentCard.jsx
import React from 'react';

const AssessmentCard = ({ image, altText, audio }) => {
  const playAudio = () => {
    const audioElement = new Audio(audio);
    audioElement.play();
  };

  return (
    <div className="flashcard" onClick={playAudio}>
      <img src={image} alt={altText} />
    </div>
  );
};

export default AssessmentCard;
