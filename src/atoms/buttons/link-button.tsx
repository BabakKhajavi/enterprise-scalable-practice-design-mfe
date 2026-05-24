import React, { FC } from 'react';
import { ButtonProps, Stack, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Box } from '@mui/system';

type LinkButtonProps = ButtonProps & {
  onClick: () => void;
  loading?: boolean;
  isSecondary?: boolean;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  variant?:
    | 'inherit'
    | 'button'
    | 'overline'
    | 'caption'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6';
};

export const LinkButton: FC<LinkButtonProps> = ({
  onClick,
  children,
  loading,
  isSecondary = false,
  icon,
  sx,
  variant,
  ...props
}) => (
  <Typography
    component="button"
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClick?.();
    }}
    sx={{
      border: 'none',
      letterSpacing: '0.5px',
      textTransform: 'none',
      fontWeight: 500,
      padding: 0,
      minWidth: 0,
      background: 'none',
      boxShadow: 'none',
      textDecoration: 'underline',
      color: (theme) =>
        isSecondary ? theme.palette.secondary.text : theme.palette.primary.text,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'transparent',
        textDecoration: 'none',
      },
      ...sx,
    }}
    variant={variant || 'body1'}
    {...props}
  >
    <Stack direction="row" alignItems="center" columnGap={0.5}>
      {icon && <>{icon}</>}
      {children}
    </Stack>
  </Typography>
);
