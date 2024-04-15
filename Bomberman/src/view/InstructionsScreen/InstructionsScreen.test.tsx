import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate, NavigateFunction } from 'react-router-dom';
import { InstructionsScreen } from './InstructionsScreen';

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: jest.fn(),
  };
});

describe('InstructionsScreen', () => {
  let mockNavigate: jest.Mock<NavigateFunction>;

  const setup = () => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <BrowserRouter>
        <InstructionsScreen />
      </BrowserRouter>
    );
  };

  it('should display the dialog title "Welcome to Bomberman!"', () => {
    setup();
    const title = screen.getByText('Welcome to Bomberman!');
    expect(title).toBeInTheDocument();
  });

  it('should display the objective section correctly', () => {
    setup();
    const objective = screen.getByText(/be the last Bomberman standing/i);
    expect(objective).toBeInTheDocument();
  });

  it('should navigate back to the home page when the back button is clicked', () => {
    setup();
    const backButton = screen.getByRole('button');
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
