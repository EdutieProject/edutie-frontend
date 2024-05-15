import React, { useState } from 'react';
import './Slider.css'; // Import CSS file for styling
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from "@mui/icons-material"


export default function ScienceCarousel({ sciences, setActiveScience }) {
  const [currentScienceIndex, setCurrentScienceIndex] = useState(0);
  const theme = useTheme();

  //TODO: refactor to be more elegant
  const nextImage = () => {
    setActiveScience(sciences[currentScienceIndex === sciences.length - 1 ? 0 : currentScienceIndex + 1]);
    setCurrentScienceIndex((prevIndex) => (prevIndex === sciences.length - 1 ? 0 : prevIndex + 1));
  };

  const prevImage = () => {
    setActiveScience(sciences[currentScienceIndex === 0 ? sciences.length - 1 : currentScienceIndex - 1]);
    setCurrentScienceIndex((prevIndex) => (prevIndex === 0 ? sciences.length - 1 : prevIndex - 1));
  };

  return (
    
     <Box sx={{position: "relative", paddingY: theme.spacing(16), borderRadius: 4, overflow: "hidden"}}>
      {/* TODO: move styling to style class */}
      {sciences.map((science, index) => (
        <img
          key={index}
          src={science.picture}
          alt={`Image ${index}`}
          className={`slider-image ${index === currentScienceIndex ? 'visible' : 'hidden'}`}
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
          {sciences[currentScienceIndex].name}
      </Typography>

      {/** Repair buttons and their colors */}

      <IconButton size='large' onClick={prevImage} sx={{position: "absolute", top: "50%", transform: "translateY(-50%)", left: "1rem"}}>
        <ChevronLeft color='white'/>
      </IconButton>
      <IconButton size='large' onClick={nextImage} sx={{position: "absolute", top: "50%", transform: "translateY(-50%)", right: "1rem"}}>
        <ChevronRight color='white'/>
      </IconButton>
    </Box>
  );
}