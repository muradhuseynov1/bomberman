import React from 'react';
import { Grid, Paper } from '@mui/material';
import { MapContainer, MyGrid, StyledGameDialog } from './GameScreen.styles';
import { PlayerStatus } from './PlayerStatusScreen/PlayerStatusScreen';

type GameLayoutProps = {
  playerName: string;
  numBombs: number;
  powers: any[];
  numObstacles: number;
  numOfPlayers: string;
  renderCellsAndPlayer: () => React.ReactNode;
};

export const GameLayout = ({
  playerName,
  numBombs,
  powers,
  numObstacles,
  numOfPlayers,
  renderCellsAndPlayer
}: GameLayoutProps) => (
  <StyledGameDialog open>
    <Grid container spacing={2}>
      <Grid item xs={2} sx={{ mt: 5 }}>
        <PlayerStatus
          playerName={playerName}
          numBombs={numBombs}
          powers={powers}
          numObstacles={numObstacles}
          index={1}
        />
        {numOfPlayers === '3' && (
          <>
            <br />
            <PlayerStatus playerName="Player 2" numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />
          </>
        )}
      </Grid>
      <Grid item xs={8}>
        <Paper>
          <MapContainer>
            <MyGrid>
              {renderCellsAndPlayer()}
            </MyGrid>
          </MapContainer>
        </Paper>
      </Grid>
      <Grid item xs={2} sx={{ mt: numOfPlayers === '3' ? 15 : 5 }}>
        {numOfPlayers === '2' && <PlayerStatus playerName="Player 2" numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={2} />}
        {numOfPlayers === '3' && <PlayerStatus playerName="Player 3" numBombs={numBombs} powers={powers} numObstacles={numObstacles} index={3} />}
      </Grid>
    </Grid>
  </StyledGameDialog>
);
