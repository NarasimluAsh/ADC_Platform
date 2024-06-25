// src/pages/AssessmentPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import AssessmentCard from '../components/AssessmentCard';
import ResultModal from '../components/ResultModal';
import sitImage from '../assets/images/sit.png';
import napImage from '../assets/images/nap.png';
import antImage from '../assets/images/ant.png';
import tapImage from '../assets/images/tap.png';
import patImage from '../assets/images/pat.png';

import sitAudio from '../assets/audio/sit.mp3';
import napAudio from '../assets/audio/nap.mp3';
import antAudio from '../assets/audio/ant.mp3';
import tapAudio from '../assets/audio/tap.mp3';
import patAudio from '../assets/audio/pat.mp3';
import questionAudio from '../assets/audio/question.mp3';
import backgroundMusic from '../assets/audio/background.mp3'; // Assuming you have background.mp3 for background music

/**
 * AssessmentPage component to manage and display the assessment.
 * @returns {JSX.Element} The AssessmentPage component
 */
const AssessmentPage = () => {
  const words = [
    { image: sitImage, audio: sitAudio, altText: 'sit', correctOption: 'S', options: ['S', 'A', 'T', 'I', 'N', 'P'] },
    { image: napImage, audio: napAudio, altText: 'nap', correctOption: 'N', options: ['S', 'A', 'T', 'I', 'N', 'P'] },
    { image: antImage, audio: antAudio, altText: 'ant', correctOption: 'A', options: ['S', 'A', 'T', 'I', 'N', 'P'] },
    { image: tapImage, audio: tapAudio, altText: 'tap', correctOption: 'T', options: ['S', 'A', 'T', 'I', 'N', 'P'] },
    { image: patImage, audio: patAudio, altText: 'pat', correctOption: 'P', options: ['S', 'A', 'T', 'I', 'N', 'P'] },
  ];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const backgroundMusicRef = useRef(null);
  const questionStartTimeRef = useRef(null);

  /**
   * Effect to play the question and word audio when the current word index changes.
   */
  useEffect(() => {
    if (isStarted && !isCompleted) {
      const playAudioSequence = async () => {
        const questionAudioElement = new Audio(questionAudio);
        const wordAudioElement = new Audio(words[currentWordIndex].audio);

        await questionAudioElement.play();
        questionAudioElement.onended = () => {
          wordAudioElement.play();
        };
      };

      playAudioSequence();
      questionStartTimeRef.current = Date.now();
    }
  }, [currentWordIndex, isStarted, isCompleted]);

  /**
   * Effect to play or fade out the background music based on assessment status.
   */
  useEffect(() => {
    if (isStarted && backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.2; // Reduce volume to 20%
      backgroundMusicRef.current.play();
    }
    if (isCompleted && backgroundMusicRef.current) {
      fadeOutAudio(backgroundMusicRef.current);
    }
  }, [isStarted, isCompleted]);

  /**
   * Function to fade out audio smoothly.
   * @param {HTMLAudioElement} audio - The audio element to fade out
   */
  const fadeOutAudio = (audio) => {
    const fadeOutInterval = setInterval(() => {
      if (audio.volume > 0.01) {
        audio.volume = Math.max(audio.volume - 0.01, 0);
      } else {
        audio.pause();
        audio.currentTime = 0;
        clearInterval(fadeOutInterval);
      }
    }, 50);
  };

  /**
   * Function to handle option selection.
   * @param {string} option - The selected option
   */
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  /**
   * Function to handle the "Next" button click.
   */
  const handleNext = () => {
    const timeTaken = (Date.now() - questionStartTimeRef.current) / 1000; // Time in seconds
    const isCorrect = selectedOption === words[currentWordIndex].correctOption;

    const result = { word: words[currentWordIndex].altText, timeTaken, isCorrect };
    console.log(`Word: ${result.word}, Time Taken: ${result.timeTaken.toFixed(2)} seconds, Correct: ${result.isCorrect ? 'Yes' : 'No'}`);

    setResults([...results, result]);

    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedOption(null);

    if (currentWordIndex < words.length - 1) {
      setTimeout(() => {
        setCurrentWordIndex(currentWordIndex + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setIsCompleted(true);
      }, 500);
    }
  };

  /**
   * Function to restart the assessment.
   */
  const restartAssessment = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setIsCompleted(false);
    setIsStarted(false);
    setResults([]);
    setSelectedOption(null);
    setIsModalOpen(false);
  };

  /**
   * Function to start the assessment.
   */
  const startAssessment = () => {
    setIsStarted(true);
  };

  /**
   * Function to open the results modal.
   */
  const openModal = () => {
    setIsModalOpen(true);
  };

  /**
   * Function to close the results modal.
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="assessment-container">
      <audio ref={backgroundMusicRef} src={backgroundMusic} loop />
      {!isStarted ? (
        <div className="start-section">
          <button onClick={startAssessment}>Start Assessment</button>
        </div>
      ) : !isCompleted ? (
        <>
          <div className="question-title">
            <h1>Select the first letter of the word</h1>
          </div>
          <div className="display-section">
            <AssessmentCard 
              image={words[currentWordIndex].image}
              audio={words[currentWordIndex].audio}
              altText={words[currentWordIndex].altText}
            />
            <div className="select-option">
              {words[currentWordIndex].options.map((option, index) => (
                <div
                  className={`letter-key ${selectedOption === option ? 'selected' : ''}`}
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                >
                  <span>{option}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="next-button">
            <button onClick={handleNext} disabled={!selectedOption}>Next</button>
          </div>
        </>
      ) : (
        <div className="result-section">
          <h1>Assessment Completed!</h1>
          <button onClick={openModal}>View Details</button>
          <button onClick={restartAssessment}>Restart</button>
          <ResultModal isOpen={isModalOpen} onRequestClose={closeModal} results={results} />
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
