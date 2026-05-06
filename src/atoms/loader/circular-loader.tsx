import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface CircularLoaderProps {
  size?: number;
  /**
   * Content to display message the loader. Can be a string or a React element.
   */
  message?: React.ReactNode | string;
}

export const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 40,
  message,
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress size={size} />
    {message &&
      (typeof message === 'string' ? (
        <Typography variant="h4" mt={3} textAlign="center">
          {message}
        </Typography>
      ) : (
        <Box mt={3}>{message}</Box>
      ))}
  </Box>
);
