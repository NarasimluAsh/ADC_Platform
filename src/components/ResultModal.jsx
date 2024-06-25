// src/components/ResultModal.jsx
import React from 'react';
import Modal from 'react-modal';

// Bind modal to the app element to assist with accessibility
Modal.setAppElement('#root');

/**
 * ResultModal component to display the assessment results in a modal.
 * @param {Object} props - Component properties
 * @param {boolean} props.isOpen - Indicates if the modal is open
 * @param {Function} props.onRequestClose - Function to close the modal
 * @param {Array} props.results - Array of result objects
 * @returns {JSX.Element} The ResultModal component
 */
const ResultModal = ({ isOpen, onRequestClose, results }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Result Details"
      className="result-modal"
      overlayClassName="result-modal-overlay"
    >
      <h2>Results</h2>
      <table className="record-sheet">
        <thead>
          <tr>
            <th>Word</th>
            <th>Correct</th>
            <th>Time Taken (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.word}</td>
              <td className="score">{result.isCorrect ? 'Yes' : 'No'}</td>
              <td className="score">{result.timeTaken.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ResultModal;
