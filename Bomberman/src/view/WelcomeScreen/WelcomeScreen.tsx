import React, { useState } from 'react';
import { AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StyledBackground, StyledAccordion, CenteredButton } from './WelcomeScreen.styles';
import bombermanLogo from '../../assets/bomberman_logo.png';
import instructionsImage from '../../assets/instructions.png';
import { useNavigate } from 'react-router-dom';
 
type WelcomeScreenProps = {
  onStart: () => void;
};
 
export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
 
  const handleToggleAccordion = () => {
    setExpanded(!expanded);
  };
 
  const handleStart = () => {
    onStart();
    navigate('/config'); // Navigate to ConfigScreen
  };
 
  return (
    <StyledBackground>
      <img src={bombermanLogo} alt="Bomberman" style={{ width: '50%', marginTop: '40px' }} />
      <StyledAccordion expanded={expanded} onChange={handleToggleAccordion}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleToggleAccordion}
          expandIcon={<ExpandMoreIcon style={{ display: 'none' }} />}
        >
          <img src={instructionsImage} alt="Instructions" style={{ width: '100%', cursor: 'pointer' }} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'center' }}>
            Here are the instructions for the game...
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
      <CenteredButton onClick={handleStart} />
    </StyledBackground>
  );
};
 