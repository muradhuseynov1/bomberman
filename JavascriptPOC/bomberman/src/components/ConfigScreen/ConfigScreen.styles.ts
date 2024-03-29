import styled from '@emotion/styled';
import { Dialog, Typography } from '@mui/material';

type PlayerControlsRowProps = {
  numOfPlayers: string;
};
 
export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    width: '600px',
    height: '600px',
    padding: '20px',
    backgroundColor: '#fff',
  },
});

export const MapPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  border: 2px solid #ccc;
  margin: 10px;
  display: inline-block;
  text-align: center;
  line-height: 100px;
`;

export const StepContent = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const CenteredButtonContainer = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px;
`;

export const PlayerControlsRow = styled.div<PlayerControlsRowProps>`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-bottom: ${(props) => (props.numOfPlayers === '2' ? '80px' : '20px')};
  margin-top: ${(props) => (props.numOfPlayers === '2' ? '40px' : '20px')};
`;

export const ControlsLabel = styled(Typography)`
  margin-right: 20px;
  font-size: 20px;
`;

export const KeyGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
`;

export const KeyRow = styled.div`
  display: flex;
`;

export const KeyConfigInput = styled.input`
  width: 40px;
  height: 40px;
  margin: 2px;
  text-align: center;
  font-size: 20px;
`;

export const ExtraKeys = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 25px;
`;