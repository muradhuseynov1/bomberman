// ModifyControlsDialog.tsx
import React from 'react';
import {
  DialogTitle,
  DialogContent,
  Button,
  DialogActions
} from '@mui/material';
import {
  KeyConfigInput,
  KeyGroup,
  PlayerControlsRow,
  ControlsLabel,
  ExtraKeys,
  StyledDialog
} from '../../ConfigScreen/ConfigScreen.styles';

type ModifyControlsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  keyBindings: { [playerNumber: string]: string[] };
  numOfPlayers: string;
}

const ModifyControlsDialog = ({
  isOpen,
  onClose,
  onSave,
  keyBindings,
  numOfPlayers
}: ModifyControlsDialogProps) => (
  <StyledDialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="modify-controls-title"
    style={{ zIndex: 2100 }}
  >
    <DialogTitle id="modify-controls-title">Modify Controls</DialogTitle>
    <DialogContent dividers>
      {Object.keys(keyBindings).map((player) => (
        <PlayerControlsRow key={`player-${player}-controls`} numOfPlayers={numOfPlayers}>
          <ControlsLabel>{`Player ${player} Controls:`}</ControlsLabel>
          <KeyGroup>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <KeyConfigInput value={keyBindings[player][0]} readOnly />
              <div style={{ display: 'flex' }}>
                <KeyConfigInput value={keyBindings[player][1]} readOnly />
                <KeyConfigInput value={keyBindings[player][2]} readOnly />
                <KeyConfigInput value={keyBindings[player][3]} readOnly />
              </div>
            </div>
            <ExtraKeys>
              <KeyConfigInput value={keyBindings[player][4]} readOnly />
              <KeyConfigInput value={keyBindings[player][5]} readOnly />
            </ExtraKeys>
          </KeyGroup>
        </PlayerControlsRow>
      ))}
    </DialogContent>
    <DialogActions>
      <Button onClick={onSave} color="primary">Save</Button>
    </DialogActions>
  </StyledDialog>
);

export default ModifyControlsDialog;
