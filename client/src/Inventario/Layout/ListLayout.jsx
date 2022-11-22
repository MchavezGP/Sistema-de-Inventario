import { Grid } from '@mui/material';

export const ListLayout = ({ children }) => {
  return (
    <div className='container mt-5'>
      <div>{children}</div>
    </div>
  );
};
