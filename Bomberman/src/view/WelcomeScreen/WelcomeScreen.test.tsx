import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WelcomeScreen } from './WelcomeScreen';
import { useNavigate, NavigateFunction } from 'react-router-dom';

// Mock useNavigate with proper typing
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe('WelcomeScreen', () => {
  let mockNavigate: jest.Mock<NavigateFunction>;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const setup = () => {
    render(
      <BrowserRouter>
        <WelcomeScreen />
      </BrowserRouter>
    );
  };

  it('should display the Bomberman logo', () => {
    setup();
    const logo = screen.getByAltText('Bomberman');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveStyle('width: 50%');
  });

  it('should display the instructions image', () => {
    setup();
    const instructionsImg = screen.getByAltText('Instructions');
    expect(instructionsImg).toBeInTheDocument();
  });

  it('should navigate to /config when the start button is clicked', () => {
    setup();
    const startButton = screen.getByRole('button');
    fireEvent.click(startButton);
    expect(mockNavigate).toHaveBeenCalledWith('/config');
  });

  it('should navigate to /instructions when the instructions image is clicked', () => {
    setup();
    const instructionsImg = screen.getByAltText('Instructions');
    fireEvent.click(instructionsImg);
    expect(mockNavigate).toHaveBeenCalledWith('/instructions');
  });
});
