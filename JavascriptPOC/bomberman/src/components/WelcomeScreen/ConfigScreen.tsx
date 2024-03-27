import React from 'react';
import { DialogTitle, DialogContent, Typography } from '@mui/material';
import { StyledDialog } from './ConfigScreen.style';
 
export const ConfigScreen = () => {
  return (
    <StyledDialog open={true} aria-labelledby="config-dialog-title">
      <DialogTitle id="config-dialog-title">Game Configuration</DialogTitle>
      <DialogContent>
        <Typography>
          This is where game configuration options will be placed.
        </Typography>
      </DialogContent>
    </StyledDialog>
  );
};