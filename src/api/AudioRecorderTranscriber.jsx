// src/pages/AudioRecorderTranscriber.jsx
import React, { useState, useRef } from 'react';
import 'primeicons/primeicons.css';
import './AudioRecorderTranscriber.css';

function AudioRecorderTranscriber() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState('');
  const [transcription, setTranscription] = useState('');
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = e => {
        chunks.current.push(e.data);
      };
      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: 'audio/wav' });
        const file = new File([blob], 'recording.wav', { type: 'audio/wav' });
        setAudioURL(URL.createObjectURL(blob));
        await uploadAndTranscribe(file);
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const uploadAndTranscribe = async (file) => {
    const formData = new FormData();
    formData.append('file', file, file.name);

    try {
      const response = await fetch('http://127.0.0.1:5000/transcribe', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setTranscription(data.text);
      } else {
        console.error('Failed to upload file:', data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending file.');
    }
  };

  return (
    <div className='audio-recorder-transcriber'>
      <h1>Record and Transcribe Audio</h1>
      <div className='record-section'>
        <button className={`mic-toggle ${isRecording ? 'is-recording' : ''}`} onClick={isRecording ? stopRecording : startRecording}>
          <span className='pi pi-microphone'></span>
        </button>
        {audioURL && <audio className='playback' src={audioURL} controls></audio>}
      </div>
      {transcription && (
        <div className='transcription-section'>
          <h3>Transcription</h3>
          <p>{transcription}</p>
        </div>
      )}
    </div>
  );
}

export default AudioRecorderTranscriber;
