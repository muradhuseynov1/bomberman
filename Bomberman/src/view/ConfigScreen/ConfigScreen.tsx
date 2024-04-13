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
  MapToggleButton,
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

import Map1 from '../../assets/Map1.png';
import Map2 from '../../assets/Map2.png';
import Map3 from '../../assets/Map3.png';

interface KeyBindings {
  [key: number]: string[];
}

const DEFAULT_KEY_BINDINGS: KeyBindings = {
  1: ['w', 'a', 's', 'd', '2', '3'],
  2: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'o', 'p'],
  3: ['u', 'h', 'j', 'k', 't', 'y']
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
  const [selectedMap, setSelectedMap] = useState('map1');

  const handleMapSelect = (map: string) => {
    setSelectedMap(map);
  };

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
      localStorage.setItem('playerKeyBindings', JSON.stringify(playerKeyBindings));
      navigate(`/game/${numOfPlayers}`);
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
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
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
    return true
  };

  const renderKeyConfig = (player: number) => (
    <>
    <PlayerControlsRow numOfPlayers={numOfPlayers}>
      <ControlsLabel>Player {player} Controls:</ControlsLabel>
      <KeyGroup>
        <KeyConfigInput
          value={arrowKeySymbols[playerKeyBindings[player][0]] || playerKeyBindings[player][0].toUpperCase()}
          onKeyDown={(e) => handleKeyDown(player, 0, e)}
          readOnly
        />
        <KeyRow>
          <KeyConfigInput
            value={arrowKeySymbols[playerKeyBindings[player][1]] || playerKeyBindings[player][1].toUpperCase()}
            onKeyDown={(e) => handleKeyDown(player, 1, e)}
            readOnly
          />
          <KeyConfigInput
            value={arrowKeySymbols[playerKeyBindings[player][2]] || playerKeyBindings[player][2].toUpperCase()}
            onKeyDown={(e) => handleKeyDown(player, 2, e)}
            readOnly
          />
          <KeyConfigInput
            value={arrowKeySymbols[playerKeyBindings[player][3]] || playerKeyBindings[player][3].toUpperCase()}
            onKeyDown={(e) => handleKeyDown(player, 3, e)}
            readOnly
          />
        </KeyRow>
      </KeyGroup>
      <ExtraKeys>
        <KeyConfigInput
          value={arrowKeySymbols[playerKeyBindings[player][4]] || playerKeyBindings[player][4].toUpperCase()}
          onKeyDown={(e) => handleKeyDown(player, 4, e)}
          readOnly
        />
        <KeyConfigInput
          value={arrowKeySymbols[playerKeyBindings[player][5]] || playerKeyBindings[player][5].toUpperCase()}
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
                <MapToggleButton
                  selected={selectedMap === 'map1'}
                  onClick={() => handleMapSelect('map1')}
                  value="map1"
                  aria-label="map1"
                >
                  <img src={Map1} alt="Map 1" />
                  <Typography>Map 1</Typography>
                </MapToggleButton>
                <MapToggleButton
                  selected={selectedMap === 'map2'}
                  onClick={() => handleMapSelect('map2')}
                  value="map2"
                  aria-label="map2"
                >
                  <img src={Map2} alt="Map 2" />
                  <Typography>Map 2</Typography>
                </MapToggleButton>
                <MapToggleButton
                  selected={selectedMap === 'map3'}
                  onClick={() => handleMapSelect('map3')}
                  value="map3"
                  aria-label="map3"
                >
                  <img src={Map3} alt="Map 3" />
                  <Typography>Map 3</Typography>
                </MapToggleButton>
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