import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Divider
} from '@mui/material';
import {
  StyledDialog,
  MapPlaceholder,
  StepContent,
  Row,
  CenteredButtonContainer,
  KeyConfigInput,
  PlayerControlsRow,
  ControlsLabel,
  KeyGroup,
  KeyRow,
  ExtraKeys
} from './ConfigScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';
import { useNavigate } from 'react-router-dom';

interface KeyBindings {
  [key: number]: string[];
}

const DEFAULT_KEY_BINDINGS: KeyBindings = {
  1: ['W', 'A', 'S', 'D', '2', '3'],
  2: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', '.', '/'],
  3: ['U', 'H', 'J', 'K', '7', '8']
};

const arrowKeySymbols: { [key: string]: string } = {
  ArrowUp: '↑',
  ArrowDown: '↓',
  ArrowLeft: '←',
  ArrowRight: '→'
};

export const ConfigScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [rounds, setRounds] = useState('1');
  const [numOfPlayers, setNumOfPlayers] = useState('2');
  const [playerKeyBindings, setPlayerKeyBindings] = useState<KeyBindings>(DEFAULT_KEY_BINDINGS);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleCancel = () => {
    setRounds('1');
    setNumOfPlayers('2');
    navigate('/');
  };
  

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setPlayerKeyBindings({ ...DEFAULT_KEY_BINDINGS });
  };

  const handlePlay = () => {
    if (validateInputs()) { 
      navigate('/game');
    }
  };  

  const isKeyUnique = (key: string, currentPlayer: number, keyIndex: number) => {
      for (let player in playerKeyBindings) {
        if (parseInt(player) === currentPlayer) {
          if (playerKeyBindings[player].some((k, idx) => k === key && idx !== keyIndex)) {
              return false;
          }
        } else {
          if (playerKeyBindings[player].includes(key)) {
              return false;
          }
        }
      }
    return true;
  };


  const handleKeyDown = (player: number, keyIndex: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    event.preventDefault();
    const key = event.key.length === 1 ? event.key.toUpperCase() : event.key;
    if (key === 'Backspace' || key === 'Delete' || (key.length > 1 && !key.includes('Arrow'))) return;
    if (!isKeyUnique(key, player, keyIndex)) return;
    setPlayerKeyBindings(prevBindings => ({
      ...prevBindings,
      [player]: prevBindings[player].map((k, idx) => idx === keyIndex ? key : k),
    }));
  };


  const validateInputs = (): boolean => {
    const allKeys = Object.values(playerKeyBindings).flat();
    if (new Set(allKeys).size !== allKeys.length) {
      alert('Each control key must be unique.');
      return false;
    }
    console.log('All inputs are valid!');
    navigate('../game-window')
    return true
  };

  const renderKeyConfig = (player: number) => (
    <>
    <PlayerControlsRow numOfPlayers={numOfPlayers}>
      <ControlsLabel>Player {player} Controls:</ControlsLabel>
      <KeyGroup>
        <KeyConfigInput
          value={arrowKeySymbols[playerKeyBindings[player][0]] || playerKeyBindings[player][0]}
          onKeyDown={(e) => handleKeyDown(player, 0, e)}
          readOnly
        />
        <KeyRow>
          <KeyConfigInput
            value={arrowKeySymbols[playerKeyBindings[player][1]] || playerKeyBindings[player][1]}
            onKeyDown={(e) => handleKeyDown(player, 1, e)}
            readOnly
          />
          <KeyConfigInput
            value={arrowKeySymbols[playerKeyBindings[player][2]] || playerKeyBindings[player][2]}
            onKeyDown={(e) => handleKeyDown(player, 2, e)}
            readOnly
          />
          <KeyConfigInput
            value={arrowKeySymbols[playerKeyBindings[player][3]] || playerKeyBindings[player][3]}
            onKeyDown={(e) => handleKeyDown(player, 3, e)}
            readOnly
          />
        </KeyRow>
      </KeyGroup>
      <ExtraKeys>
        <KeyConfigInput
          value={arrowKeySymbols[playerKeyBindings[player][4]] || playerKeyBindings[player][4]}
          onKeyDown={(e) => handleKeyDown(player, 4, e)}
          readOnly
        />
        <KeyConfigInput
          value={arrowKeySymbols[playerKeyBindings[player][5]] || playerKeyBindings[player][5]}
          onKeyDown={(e) => handleKeyDown(player, 5, e)}
          readOnly
        />
      </ExtraKeys>
    </PlayerControlsRow>
      {player < parseInt(numOfPlayers) && <Divider style={{ margin: `${numOfPlayers === '2' ? '60px' : '20px'} 0` }} />}
    </>
  );

  const steps = ['', ''];

  return (
    <StyledBackground>
      <StyledDialog open={true} aria-labelledby="config-dialog-title">
      <DialogTitle id="config-dialog-title">
          {activeStep === 0 ? 'Game Configuration' : 'Keyboard Configuration'}
        </DialogTitle>
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
              <Typography variant="h6" sx={{ml: 3}}>Choose a map:</Typography>
              <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
                <MapPlaceholder>Map1</MapPlaceholder>
                <MapPlaceholder>Map2</MapPlaceholder>
                <MapPlaceholder>Map3</MapPlaceholder>
              </div>
              <Divider style={{ margin: '20px 0' }} />
              <Row>
                <Typography variant="h6">Rounds:</Typography>
                <ToggleButtonGroup
                  size="large"
                  value={rounds}
                  exclusive
                  onChange={(e, newRounds) => newRounds && setRounds(newRounds)}
                  aria-label="number of rounds"
                >
                  <ToggleButton value="1">1</ToggleButton>
                  <ToggleButton value="2">2</ToggleButton>
                  <ToggleButton value="3">3</ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <Divider style={{ margin: '20px 0' }} />
              <Row>
                <Typography variant="h6">Number of Players:</Typography>
                <ToggleButtonGroup
                  size="large"
                  value={numOfPlayers}
                  exclusive
                  onChange={(e, newNumOfPlayers) => newNumOfPlayers && setNumOfPlayers(newNumOfPlayers)}
                  aria-label="number of players"
                >
                  <ToggleButton value="2">2</ToggleButton>
                  <ToggleButton value="3">3</ToggleButton>
                </ToggleButtonGroup>
              </Row>
              <CenteredButtonContainer>
                <Button variant="contained" size="large" onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" size="large" style={{ marginLeft: '10px' }} onClick={handleNext}>Next</Button>
              </CenteredButtonContainer>
            </StepContent>
          )}
          {activeStep === 1 && (
            <StepContent>
              <div>
                {Array.from({ length: parseInt(numOfPlayers) }, (_, i) => renderKeyConfig(i + 1))}
              </div>
              <CenteredButtonContainer>
                <Button variant="contained" size="large" onClick={handleBack}>Back</Button>
                <Button variant="contained" size="large" onClick={handlePlay} style={{ marginLeft: '10px' }}>Play</Button>
              </CenteredButtonContainer>
            </StepContent>
          )}
        </DialogContent>
      </StyledDialog>
    </StyledBackground>
  );
};