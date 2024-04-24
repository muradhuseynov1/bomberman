/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
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
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Info from '@mui/icons-material/Info';
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
  ExtraKeys,
} from './ConfigScreen.styles';
import { StyledBackground } from '../WelcomeScreen/WelcomeScreen.styles';

import Map1 from '../../assets/Map1.png';
import Map2 from '../../assets/Map2.png';
import Map3 from '../../assets/Map3.png';

import { KeyBindings, arrowKeySymbols, DEFAULT_KEY_BINDINGS } from '../../constants/props';

type KeyErrors = {
  [key: string]: boolean;
};

export const ConfigScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [rounds, setRounds] = useState('1');
  const [numOfPlayers, setNumOfPlayers] = useState('2');
  const [playerKeyBindings, setPlayerKeyBindings] = useState<KeyBindings>(DEFAULT_KEY_BINDINGS);
  const navigate = useNavigate();
  const [selectedMap, setSelectedMap] = useState('map1');
  const [keyErrors, setKeyErrors] = useState<KeyErrors>({});

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
    setRounds('1');
    setNumOfPlayers('2');
    setKeyErrors({});
  };

  const handlePlay = () => {
    localStorage.setItem('playerKeyBindings', JSON.stringify(playerKeyBindings));
    navigate(`/game/${numOfPlayers}`);
  };

  const handleKeyDown = (
    player: number,
    keyIndex: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === 'Backspace' || key === 'Delete' || (key.length > 1 && !key.includes('Arrow'))) return;

    setPlayerKeyBindings((prevBindings) => ({
      ...prevBindings,
      [player]: prevBindings[player].map((k, idx) => (idx === keyIndex ? key : k)),
    }));
  };

  const validateInputs = () => {
    const newErrors: KeyErrors = {};
    const keyMap = new Map<string, string>();

    Object.values(playerKeyBindings)
      .slice(0, parseInt(numOfPlayers, 10)).forEach((keys, playerIndex) => {
        keys.forEach((key, keyIndex) => {
          const keyId = `player${playerIndex + 1}-${keyIndex}`;
          if (keyMap.has(key)) {
            newErrors[keyId] = true;
            newErrors[keyMap.get(key)!] = true;
          } else {
            keyMap.set(key, keyId);
          }
        });
      });
    setKeyErrors(newErrors);
  };

  useEffect(() => {
    validateInputs();
  }, [numOfPlayers, playerKeyBindings]);

  const fetchMap = async (mapName: any) => {
    const response = await fetch(`/maps/${mapName}.txt`);
    const mapText = await response.text();
    return mapText.split(/\r?\n/).map((row) => row.trim().split('').slice(0, 15));
  };

  const handleMapSelect = async (map: any) => {
    setSelectedMap(map);
    const mapData = await fetchMap(map);
    localStorage.setItem('selectedMap', JSON.stringify(mapData));
  };

  const renderKeyConfig = (player: number) => (
    <>
      <PlayerControlsRow numOfPlayers={numOfPlayers}>
        <ControlsLabel>
          Player
          {player}
          {' '}
          Controls:
        </ControlsLabel>
        <KeyGroup>
          <KeyConfigInput
            key={`player-${player}-key-0`}
            value={arrowKeySymbols[playerKeyBindings[player][0]]
            || playerKeyBindings[player][0].toUpperCase()}
            onKeyDown={(e) => handleKeyDown(player, 0, e)}
            readOnly
            style={{ borderColor: keyErrors[`player${player}-0`] ? 'red' : 'black' }}
          />
          <KeyRow>
            {playerKeyBindings[player].slice(1, 4).map((key, index) => (
              <KeyConfigInput
                key={`player-${player}-key-${index + 1}`}
                value={arrowKeySymbols[key] || key.toUpperCase()}
                onKeyDown={(e) => handleKeyDown(player, index + 1, e)}
                readOnly
                style={{ borderColor: keyErrors[`player${player}-${index + 1}`] ? 'red' : 'black' }}
              />
            ))}
          </KeyRow>
        </KeyGroup>
        <ExtraKeys>
          {playerKeyBindings[player].slice(4, 6).map((key, index) => (
            <KeyConfigInput
              key={`player-${player}-key-${index + 4}`}
              value={arrowKeySymbols[key] || key.toUpperCase()}
              onKeyDown={(e) => handleKeyDown(player, index + 4, e)}
              readOnly
              style={{ borderColor: keyErrors[`player${player}-${index + 4}`] ? 'red' : 'black' }}
            />
          ))}
        </ExtraKeys>
      </PlayerControlsRow>
      {player < parseInt(numOfPlayers, 10) && <Divider style={{ margin: `${numOfPlayers === '2' ? '60px' : '20px'} 0` }} />}
    </>
  );

  const steps = ['', ''];

  return (
    <StyledBackground>
      <StyledDialog open aria-labelledby="config-dialog-title">
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
              <Typography variant="h6" sx={{ ml: 3 }}>Choose a map:</Typography>
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
                  onChange={(_e, newRounds) => newRounds && setRounds(newRounds)}
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
                  onChange={(e, newNumOfPlayers) => newNumOfPlayers
                    && setNumOfPlayers(newNumOfPlayers)}
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
                {Array.from({
                  length: parseInt(numOfPlayers, 10),
                }, (_, i) => renderKeyConfig(i + 1))}
              </div>
              {Object.keys(keyErrors).length > 0 && (
                <Typography variant="body2" color="error" sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <Info sx={{ mr: 1, fontSize: 'inherit' }} />
                  Please correct the highlighted key conflicts before proceeding.
                </Typography>
              )}
              <CenteredButtonContainer>
                <Button variant="contained" size="large" onClick={handleBack}>Back</Button>
                <Button variant="contained" size="large" onClick={handlePlay} disabled={Object.keys(keyErrors).length > 0} style={{ marginLeft: '10px' }}>
                  Play
                </Button>
              </CenteredButtonContainer>
            </StepContent>
          )}
        </DialogContent>
      </StyledDialog>
    </StyledBackground>
  );
};
