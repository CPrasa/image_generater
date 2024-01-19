import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [userInput, setUserInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleGenerateImage = async () => {
    setLoading(true);

    const options = {
      method: 'POST',
      url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '4b22548360msh6e7148078d97ae8p180705jsn11d44b0880f0',
        'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
      },
      data: { text: userInput }
    };

    try {
      const response = await axios.request(options);
      setImageURL(response.data.generated_image);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };
  const handleDownloadImage = () => {
    axios({
      url: imageURL,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const blob = new Blob([response.data], { type: 'image/png' });
  
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'generated_image.png';
  
      document.body.appendChild(link);
  
      link.click();
      document.body.removeChild(link);
    });
  };
  
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Welcome to the Image Generator</h1>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <label>
          <div>
            <h3>Enter Text</h3>
          </div>
          <textarea type="text" value={userInput} onChange={handleInputChange} className="custom-input" />
        </label>
        <div className="generate-button" class="d-grid gap-2 d-md-block">
          <button className="btn btn-primary" onClick={handleGenerateImage}>
            Generate Image
          </button>
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center' }} className="download-button" class="d-grid gap-2 d-md-block">
          <button className="btn btn-success" onClick={handleDownloadImage} disabled={!imageURL}>
            Download Image
          </button>
        </div>
      </div>

      {loading && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <div className="loading-indicator"></div>
        </div>
      )}

      {imageURL && !loading && (
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <br />
          <img src={imageURL} alt="Generated Image" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
