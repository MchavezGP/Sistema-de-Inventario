import { Grid, Typography } from '@mui/material';

export const FormLayout = ({ children, titulo = '' }) => {
  return (
    <div className='container mt-5 pt-5'>
      <div className='row'>
        <div className='col-12 col-sm-7 col-md-6 m-auto'>
          <h2 className='m-3 text-center'>{titulo} </h2>
          <div className='card border-0 shadow'>
            <div className='card-body'>
            {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
