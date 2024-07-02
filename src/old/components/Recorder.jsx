import React, { useState, useRef } from 'react';
import 'primeicons/primeicons.css';

function Recorder() {
  // State for tracking whether recording is in progress
  const [isRecording, setIsRecording] = useState(false);

  // State for storing the URL of the recorded audio
  const [audioURL, setAudioURL] = useState('');

  // Reference for the MediaRecorder instance
  const mediaRecorder = useRef(null);

  // Reference for storing audio data chunks
  const chunks = useRef([]);

  // Function to start audio recording
  const startRecording = async () => {
    try {
      // Request access to the user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create a new MediaRecorder instance with the microphone stream
      mediaRecorder.current = new MediaRecorder(stream);

      // Clear the chunks array before starting a new recording
      chunks.current = [];

      // Event handler for when data becomes available
      mediaRecorder.current.ondataavailable = e => {
        // Push audio data chunks to the array
        chunks.current.push(e.data);
      };

      // Event handler for when recording stops
      mediaRecorder.current.onstop = () => {
        // Combine audio data chunks into a single Blob
        const blob = new Blob(chunks.current, { type: 'audio/wav' });
        
        // Set the URL of the recorded audio for playback
        setAudioURL(URL.createObjectURL(blob));
      };

      // Start recording
      mediaRecorder.current.start();

      // Update state to indicate recording is in progress
      setIsRecording(true);
    } catch (error) {
      // Handle errors accessing the microphone
      console.error('Error accessing microphone:', error);
    }
  };

  // Function to stop audio recording
  const stopRecording = () => {
    // Check if MediaRecorder instance exists and is recording
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      // Stop recording
      mediaRecorder.current.stop();

      // Update state to indicate recording has stopped
      setIsRecording(false);
    }
  };

  return (
    <>
      <div className='record-section'>
        {/* Button for toggling recording */}
        <button className={`mic-toggle ${isRecording ? 'is-recording' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
          <span className='pi pi-microphone'></span>
        </button>
        
        {/* Audio element for playback */}
        <audio className='playback' src={audioURL} controls></audio>
      </div>
    </>
  );
}

export default Recorder;
