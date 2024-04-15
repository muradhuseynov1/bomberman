import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useMemo
} from 'react';

interface KeyBindings {
  [key: number]: string[];
}

interface GameSettingsContextType {
  playerKeyBindings: KeyBindings;
  setPlayerKeyBindings: React.Dispatch<React.SetStateAction<KeyBindings>>;
}

const defaultState: GameSettingsContextType = {
  playerKeyBindings: {
    1: ['w', 'a', 's', 'd', '2', '3'],
    2: ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'o', 'p'],
    3: ['u', 'h', 'j', 'k', '7', '8']
  },
  setPlayerKeyBindings: () => {}
};

const GameSettingsContext = createContext<GameSettingsContextType>(defaultState);

export const useGameSettings = () => useContext(GameSettingsContext);

interface Props {
  children: ReactNode;
}

export const GameSettingsProvider: React.FC<Props> = ({ children }) => {
  const [playerKeyBindings, setPlayerKeyBindings] = useState<KeyBindings>(
    defaultState.playerKeyBindings
  );

  const value = useMemo(() => ({
    playerKeyBindings,
    setPlayerKeyBindings
  }), [playerKeyBindings, setPlayerKeyBindings]);

  return (
    <GameSettingsContext.Provider value={value}>
      {children}
    </GameSettingsContext.Provider>
  );
};
