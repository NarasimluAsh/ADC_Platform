import React, { useState } from 'react';
import './AudioFileUploader.css'

function FileUpload() {
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file, file.name);

        try {
            const response = await fetch('http://127.0.0.1:5000/transcribe', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Transcription: ', data.text);
                alert(`Transcription: ${data.text}`);
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
        <div className='audio-file-uploader-page-body'>
            <h1>Upload an Audio File</h1>
            <input type="file" onChange={onFileChange} accept=".mp3,.wav,.flac" />
            <button onClick={onFileUpload}>
                Upload!
            </button>
        </div>
    );
}

export default FileUpload;
