import React, { FC } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

type OutlinedButtonProps = ButtonProps & {
  onClick?: () => void;
  loading?: boolean;
  isSecondary?: boolean;
};

export const OutlinedButton: FC<OutlinedButtonProps> = ({
  onClick,
  children,
  loading,
  isSecondary = false,
  ...props
}) => (
  <Button
    variant="outlined"
    onClick={onClick}
    disabled={loading}
    sx={{
      letterSpacing: '0.5px',
      borderColor: (theme) =>
        isSecondary ? theme.palette.secondary.main : theme.palette.primary.main,
      color: (theme) =>
        isSecondary ? theme.palette.secondary.main : theme.palette.primary.main,
      '&:hover': {
        borderColor: (theme) =>
          isSecondary
            ? theme.palette.secondary.text
            : theme.palette.primary.text,
        color: (theme) =>
          isSecondary
            ? theme.palette.secondary.text
            : theme.palette.primary.text,
      },

      ...props.sx,
    }}
    // {...props}
  >
    {loading ? <CircularProgress size={20} /> : children}
  </Button>
);
