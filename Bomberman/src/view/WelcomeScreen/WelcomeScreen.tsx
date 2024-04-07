import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledBackground, CenteredButton, InstructionsImage } from './WelcomeScreen.styles';
import bombermanLogo from '../../assets/bomberman_logo.png';
import instructionsImage from '../../assets/instructions.png';
import { WelcomeScreenProps } from '../../constants/props';
 
export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const navigate = useNavigate();
 
  const handleStart = () => {
    onStart();
    navigate('/config'); 
  };

  const navigateToInstructions = () => {
    navigate('/instructions'); 
  };

  return (
    <StyledBackground>
      <img src={bombermanLogo} alt="Bomberman" style={{ width: '50%', marginTop: '40px' }} />
      <InstructionsImage src={instructionsImage} alt="Instructions" onClick={navigateToInstructions} />
      <CenteredButton onClick={handleStart} />
    </StyledBackground>
  );
};
 