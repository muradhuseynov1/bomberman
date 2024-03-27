import styled from '@emotion/styled';
import { Dialog } from '@mui/material';
 
export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
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
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const KeyConfigInput = styled.input`
  width: 40px;  // Adjust size as needed
  height: 40px;
  margin: 5px;
  text-align: center;
  font-size: 20px; // Adjust font size as needed
`;
