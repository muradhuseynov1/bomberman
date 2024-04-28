import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';

type RoundResultDialogProps = {
  open: boolean;
  onClose: () => void;
  resultMessage: string;
}

export const RoundResultDialog = ({ open, onClose, resultMessage }: RoundResultDialogProps) => {
  const handleClose = (event: {}, reason: string) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      return;
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        Round Over
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        <p>{resultMessage}</p>
        <Button onClick={onClose}>Restart</Button>
      </DialogContent>
    </Dialog>
  );
};
