import React, { useState } from 'react';
import './Slider.css'; // Import CSS file for styling
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight, Image } from "@mui/icons-material"


const Slider = (props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === props.sciences.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? props.sciences.length - 1 : prevIndex - 1));
  };

  return (
    
     <Box sx={{position: "relative", paddingY: theme.spacing(16), borderRadius: 4, overflow: "hidden"}}>
      {/* TODO: move styling to style class */}
      {props.sciences.map((science, index) => (
        <img
          key={index}
          src={science.picture}
          alt={`Image ${index}`}
          className={`slider-image ${index === currentImageIndex ? 'visible' : 'hidden'}`}
        />

      ))}
      <Typography variant="h2" fontFamily="Baloo" sx={{
        textAlign: 'center', 
        position: "absolute", 
        left:"50%", 
        top:"10%", 
        color: theme.palette.common.white, 
        zIndex: 1, 
        transform: "translateX(-50%)", 
        textShadow: "black 2px 2px 2px"}}
      >
          {props.sciences[currentImageIndex].name}
      </Typography>
      <IconButton size='large' onClick={prevImage} sx={{position: "absolute", top: "50%", transform: "translateY(-50%)", left: "1rem"}}>
        <ChevronLeft color='white'/>
      </IconButton>
      <IconButton size='large' onClick={nextImage} sx={{position: "absolute", top: "50%", transform: "translateY(-50%)", right: "1rem"}}>
        <ChevronRight color='white'/>
      </IconButton>
    </Box>
  );
};

export default Slider;