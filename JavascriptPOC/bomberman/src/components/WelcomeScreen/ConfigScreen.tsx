import React, { useState } from 'react';
import { DialogTitle, DialogContent, Typography, Stepper, Step, StepLabel, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { StyledDialog, MapPlaceholder, StepContent, Row, CenteredButtonContainer } from './ConfigScreen.styles';
import { StyledBackground } from './WelcomeScreen.styles';

export const ConfigScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [rounds, setRounds] = useState('1');
  const [numOfPlayers, setNumOfPlayers] = useState('2'); // Default to 2 for the second toggle group as per request

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = ['Game Configuration', 'Confirm'];

  return (
    <StyledBackground>
      <StyledDialog open={true} aria-labelledby="config-dialog-title">
        <DialogTitle id="config-dialog-title">Game Configuration</DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === 0 && (
            <StepContent>
              <Typography>Choose a map:</Typography>
              <div>
                <MapPlaceholder>Map1</MapPlaceholder>
                <MapPlaceholder>Map2</MapPlaceholder>
                <MapPlaceholder>Map3</MapPlaceholder>
              </div>
              <Row>
                <Typography>Rounds:</Typography>
                <ToggleButtonGroup
                  value={rounds}
                  exclusive
                  onChange={(e, newRounds) => newRounds && setRounds(newRounds)}
                  aria-label="number of rounds"
                >
                  <ToggleButton value="1" aria-label="one round">1</ToggleButton>
                  <ToggleButton value="2" aria-label="two rounds">2</ToggleButton>
                  <ToggleButton value="3" aria-label="three rounds">3</ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <Row>
                <Typography>Number of Players:</Typography>
                <ToggleButtonGroup
                  value={numOfPlayers}
                  exclusive
                  onChange={(e, newNumOfPlayers) => newNumOfPlayers && setNumOfPlayers(newNumOfPlayers)}
                  aria-label="number of players"
                >
                  <ToggleButton value="2" aria-label="one player">2</ToggleButton>
                  <ToggleButton value="3" aria-label="two players">3</ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <CenteredButtonContainer>
                <Button variant="contained" onClick={handleNext}>Next</Button>
              </CenteredButtonContainer>
            </StepContent>
          )}
          {activeStep === 1 && (
            <StepContent>
              <Typography>Confirmation step...</Typography>
              <CenteredButtonContainer>
                <Button variant="contained" onClick={handleBack}>Back</Button>
              </CenteredButtonContainer>
            </StepContent>
          )}
        </DialogContent>
      </StyledDialog>
    </StyledBackground>
  );
};