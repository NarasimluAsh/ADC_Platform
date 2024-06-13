// src/pages/QuizPage.jsx
import React, { useState, useEffect } from 'react';
import questionsData from '../assets/questions.json';
import './QuizPage.css';
import axios from 'axios';

const QuizPage = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState([]);
  const [userDetails, setUserDetails] = useState({
    age: '',
    grade: '',
    disability_ADHD: false,
    disability_Autism: false,
    disability_Dyslexia: false,
    disability_HearingImpairment: false,
    disability_VisualImpairment: false,
  });
  const [predictedWeaknesses, setPredictedWeaknesses] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const startQuiz = () => {
    const shuffledQuestions = questionsData.questions.sort(() => 0.5 - Math.random());
    const selected = shuffledQuestions.slice(0, 10);
    setSelectedQuestions(selected);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setQuizStarted(true);
    setStartTime(Date.now());
    setQuestionStartTime(Date.now());
    setTimeTaken([]);
    setPredictedWeaknesses([]);
    setError(null);
  };

  const handleAnswer = (isTrue) => {
    const currentTime = Date.now();
    const questionTime = currentTime - questionStartTime;
  
    setTimeTaken((prevTimeTaken) => [...prevTimeTaken, questionTime]);
  
    if (isTrue) {
      setScore((prevScore) => prevScore + 1);
    }
  
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestionStartTime(Date.now());
    } else {
      setShowResults(true);
      setQuizStarted(false);
      setTimeout(() => submitResults(), 0); // Ensure the last time taken is recorded before submitting
    }
  };
  
  const submitResults = async () => {
    const defaultTimeTaken = 0;
    const quizData = {
      age: userDetails.age,
      grade: userDetails.grade,
      'disability_ADHD': userDetails.disability_ADHD,
      'disability_Autism': userDetails.disability_Autism,
      'disability_Dyslexia': userDetails.disability_Dyslexia,
      'disability_Hearing Impairment': userDetails.disability_HearingImpairment, // Adjusted field name
      'disability_Visual Impairment': userDetails.disability_VisualImpairment, // Adjusted field name
      ques1_ref: selectedQuestions[0]?.ques_id,
      ques1_time_taken: timeTaken[0] ?? defaultTimeTaken,
      ques1_correctness: selectedQuestions[0]?.correct || false,
      ques2_ref: selectedQuestions[1]?.ques_id,
      ques2_time_taken: timeTaken[1] ?? defaultTimeTaken,
      ques2_correctness: selectedQuestions[1]?.correct || false,
      ques3_ref: selectedQuestions[2]?.ques_id,
      ques3_time_taken: timeTaken[2] ?? defaultTimeTaken,
      ques3_correctness: selectedQuestions[2]?.correct || false,
      ques4_ref: selectedQuestions[3]?.ques_id,
      ques4_time_taken: timeTaken[3] ?? defaultTimeTaken,
      ques4_correctness: selectedQuestions[3]?.correct || false,
      ques5_ref: selectedQuestions[4]?.ques_id,
      ques5_time_taken: timeTaken[4] ?? defaultTimeTaken,
      ques5_correctness: selectedQuestions[4]?.correct || false,
      ques6_ref: selectedQuestions[5]?.ques_id,
      ques6_time_taken: timeTaken[5] ?? defaultTimeTaken,
      ques6_correctness: selectedQuestions[5]?.correct || false,
      ques7_ref: selectedQuestions[6]?.ques_id,
      ques7_time_taken: timeTaken[6] ?? defaultTimeTaken,
      ques7_correctness: selectedQuestions[6]?.correct || false,
      ques8_ref: selectedQuestions[7]?.ques_id,
      ques8_time_taken: timeTaken[7] ?? defaultTimeTaken,
      ques8_correctness: selectedQuestions[7]?.correct || false,
      ques9_ref: selectedQuestions[8]?.ques_id,
      ques9_time_taken: timeTaken[8] ?? defaultTimeTaken,
      ques9_correctness: selectedQuestions[8]?.correct || false,
      ques10_ref: selectedQuestions[9]?.ques_id,
      ques10_time_taken: timeTaken[9] ?? defaultTimeTaken,
      ques10_correctness: selectedQuestions[9]?.correct || false,
    };
  
    // Log the data to verify it before sending
    console.log('Submitting quiz data:', quizData);
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_weaknesses', quizData);
      setPredictedWeaknesses(response.data.predicted_weaknesses);
    } catch (err) {
      console.error('Error in submitResults:', err.response ? err.response.data : err.message);
      setError('Failed to predict weaknesses. Please try again later.');
    }
  };
  
  

  const restartQuiz = () => {
    setUserDetails({
      age: '',
      grade: '',
      disability_ADHD: false,
      disability_Autism: false,
      disability_Dyslexia: false,
      disability_HearingImpairment: false,
      disability_VisualImpairment: false,
    });
    setQuizStarted(false);
    setShowResults(false);
    setError(null);
  };

  const continueQuiz = () => {
    setShowResults(false);
    startQuiz();
  };

  const formatTime = (timeInMillis) => {
    const minutes = Math.floor(timeInMillis / 60000);
    const seconds = ((timeInMillis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    if (quizStarted) {
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, quizStarted]);

  return (
    <div className="quiz-container">
      {!quizStarted && !showResults && (
        <div>
          <h2>Enter Student Details</h2>
          {error && <p className="error">{error}</p>}
          <form>
            <label>
              Age:
              <input type="number" name="age" value={userDetails.age} onChange={handleChange} />
            </label>
            <label>
              Grade:
              <input type="number" name="grade" value={userDetails.grade} onChange={handleChange} />
            </label>
            <label>
              Disability ADHD:
              <input type="checkbox" name="disability_ADHD" checked={userDetails.disability_ADHD} onChange={handleChange} />
            </label>
            <label>
              Disability Autism:
              <input type="checkbox" name="disability_Autism" checked={userDetails.disability_Autism} onChange={handleChange} />
            </label>
            <label>
              Disability Dyslexia:
              <input type="checkbox" name="disability_Dyslexia" checked={userDetails.disability_Dyslexia} onChange={handleChange} />
            </label>
            <label>
              Disability Hearing Impairment:
              <input type="checkbox" name="disability_HearingImpairment" checked={userDetails.disability_HearingImpairment} onChange={handleChange} />
            </label>
            <label>
              Disability Visual Impairment:
              <input type="checkbox" name="disability_VisualImpairment" checked={userDetails.disability_VisualImpairment} onChange={handleChange} />
            </label>
            <button type="button" onClick={startQuiz}>Start!</button>
          </form>
        </div>
      )}

      {quizStarted && (
        <div>
          <div className="question">
            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{selectedQuestions[currentQuestionIndex].word}</p>
          </div>
          <button onClick={() => handleAnswer(true)}>True</button>
          <button onClick={() => handleAnswer(false)}>False</button>
        </div>
      )}

      {showResults && (
        <div className="results">
          <h2>Quiz Completed</h2>
          <p>You scored {score} out of {selectedQuestions.length}</p>
          <p>Overall Time Taken: {formatTime(Date.now() - startTime)}</p>
          {predictedWeaknesses.length > 0 && (
            <div className='prediction-section'>
              <h3>Predicted Weaknesses:</h3>
              <ul>
                {predictedWeaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <button onClick={restartQuiz}>Restart</button>
          <button onClick={continueQuiz}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;