import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { GameScreen } from './GameScreen';

describe('GameScreen', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/gamescreen/1']}>
        <GameScreen />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});

describe('Map Loading', () => {
  beforeEach(() => {
    localStorage.setItem('selectedMap', JSON.stringify([[' ', 'W', 'B']]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('fetches and sets the map from local storage on component mount', async () => {
    const { findByAltText } = render(
      <MemoryRouter initialEntries={['/gamescreen/1']}>
        <GameScreen />
      </MemoryRouter>
    );

    const wallImage = await findByAltText('Wall');
    const boxImage = await findByAltText('Box');

    expect(wallImage).toBeInTheDocument();
    expect(boxImage).toBeInTheDocument();
  });
});
