import React, { useState } from 'react';
import './Slider.css'; // Import CSS file for styling

import goBack from './icons/goBack.svg';
import home from './icons/home.svg';
import leave from './icons/leave.svg';


const Slider = ({ images, headerTexts }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };
  const handleButtonClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
     <div className="slider-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index}`}
          className={`slider-image ${index === currentImageIndex ? 'visible' : 'hidden'}`}
        />
      ))}
      <div className="header" style={{ textAlign: 'center' }}>{headerTexts[currentImageIndex]}</div>
      <button className="prev-button" onClick={prevImage}><h1>{'<'}</h1></button>
      <button className="next-button" onClick={nextImage}><h1>{'>'}</h1></button>

      <div className="mini-nav">
        <button onClick={() => handleButtonClick(0)}><img src={goBack} alt="goBack" /></button>
        <button onClick={() => handleButtonClick(1)}><img src={leave} alt="leave" /></button>
        <button onClick={() => handleButtonClick(2)}><img src={home} alt="home" /></button>
      </div>
    </div>
  );
};

export default Slider;