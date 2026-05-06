import React, { FC, ReactElement } from 'react';
import { Button, ButtonProps, Box, SxProps } from '@mui/material';

type ContainedButtonProps = ButtonProps & {
  message: string;
  sxProps?: SxProps;
};

export const ErrorBoundaryMessage: FC<ContainedButtonProps> = ({
  message,
  sxProps,
}): ReactElement => {
  console.log('ErrorBoundaryMessage rendered with message:', message);
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        my: 1,
        p: 1,
        fontSize: '1rem',
        fontWeight: 'bold',
        color: (theme) => theme.palette.warning.main,
        border: (theme) => `1px solid ${theme.palette.warning.main}`,
        borderRadius: '10px',
        width: 'auto',
        ...sxProps,
      }}
    >
      {message}
    </Box>
  );
};
