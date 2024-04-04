import { render, screen, fireEvent } from '@testing-library/react';
import { ConfigScreen } from './view/ConfigScreen/ConfigScreen';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {App} from './App';
import { GameScreen } from './view/GameScreen/GameScreen'; 
import { PlayerStatus } from './view/GameScreen/PlayerStatusScreen/PlayerStatusScreen'; 
import { WelcomeScreen } from './view/WelcomeScreen/WelcomeScreen';
import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
}));

test('renders welcome screen with start button', () => {
  render(<App />);
  const startButton = screen.getByText(/start/i);
  expect(startButton).toBeInTheDocument();
});

test('clicking on instructions image navigates to instructions screen', () => {
  const navigateMock = jest.fn(); 
  useNavigate.mockReturnValue(navigateMock); 

  render(
    <MemoryRouter>
      <WelcomeScreen onStart={() => {}} />
    </MemoryRouter>
  );

  const instructionsImage = screen.getByAltText('Instructions');
  fireEvent.click(instructionsImage);

  expect(navigateMock).toHaveBeenCalledWith('/instructions');
});

test('clicking Next renders KeyConfigInput for each player', () => {
  render(
    <MemoryRouter>
      <ConfigScreen />
    </MemoryRouter>
  );

  const nextButton = screen.getByRole('button', { name: /next/i });
  fireEvent.click(nextButton);

  const player1Controls = screen.getAllByTestId('key-config-input-player-1');
  const player2Controls = screen.getAllByTestId('key-config-input-player-2');

  expect(player1Controls).toHaveLength(6); 
  expect(player2Controls).toHaveLength(6); 
});


test('clicking Play renders GameScreen and PlayerStatus components', () => {
  const navigateMock = jest.fn(); 
  useNavigate.mockReturnValue(navigateMock); 
  render(
    <MemoryRouter initialEntries={['/config']}>
      <Routes> {/* Wrap Route components in Routes */}
        <Route path="/config" element={<ConfigScreen />} />
        <Route path="/game" element={<GameScreen />} />
      </Routes>
    </MemoryRouter>
  );

  const nextButton = screen.getByRole('button', { name: /next/i });
  fireEvent.click(nextButton);

  const playButton = screen.getByRole('button', { name: /play/i });
  fireEvent.click(playButton);

  expect(navigateMock).toHaveBeenCalledWith('/game');

  // Updated regular expression to match the exact text "Number of Players"
  const numOfPlayers = screen.getByText('Player').textContent.split(': ')[1];
  const playerStatusComponents = screen.getAllByTestId('player-status');
  expect(playerStatusComponents).toHaveLength(parseInt(numOfPlayers));
});
// TODO Add more tests as needed (AFTER IMPLEMENTING THE GAME LOGIC)

// test('prevents bomberman from moving beyond game board boundaries', () => {
//   // Write test case to simulate Bomberman attempting to move beyond boundaries
//   // Assert that Bomberman is prevented from moving beyond boundaries
// });

// test('prevents bomberman from moving into indestructible obstacles', () => {
//   // Write test case to simulate Bomberman attempting to move into indestructible obstacles
//   // Assert that Bomberman cannot move into indestructible obstacles
// });

// test('allows bomberman to move into destructible obstacles after destroying them', () => {
//   // Write test case to simulate Bomberman destroying a destructible obstacle
//   // Assert that Bomberman can move into the square previously occupied by the destructible obstacle
// });

// test('prevents bomberman from moving into cells containing bombs', () => {
//   // Write test case to simulate Bomberman attempting to move into cells containing bombs
//   // Assert that Bomberman is prevented from moving into cells containing bombs
// });

// test('allows bomberman to place a bomb on the game board', () => {
//   // Write test case to simulate Bomberman attempting to place a bomb
//   // Assert that Bomberman can place a bomb on the game board
// });

// test('prevents bomberman from placing a bomb on top of another bomb', () => {
//   // Write test case to simulate Bomberman attempting to place a bomb on top of another bomb
//   // Assert that Bomberman is prevented from placing a bomb on top of another bomb
// });

// test('prevents bomberman from placing a bomb on squares occupied by obstacles or other entities', () => {
//   // Write test case to simulate Bomberman attempting to place a bomb on squares occupied by obstacles or other entities
//   // Assert that Bomberman is prevented from placing a bomb on such squares
// });

// test('enforces maximum limit of bombs that Bomberman can place', () => {
//   // Write test case to simulate Bomberman attempting to place more bombs than the maximum limit
//   // Assert that Bomberman is prevented from placing more bombs than the maximum limit
// });

// test('triggers bomb explosion after countdown timer reaches zero', () => {
//   // Write test case to simulate bomb countdown timer reaching zero
//   // Assert that bomb explosion is triggered after the countdown timer reaches zero
// });
