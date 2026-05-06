import React, { FC, useMemo } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { Stack } from '@mui/system';
import { OptimizedImage } from '../images';

type ContainedButtonProps = ButtonProps & {
  handleClick?: () => void;
  loading?: boolean;
  isSecondary?: boolean;
  icon?: React.ReactNode;
  loadingIcon?: React.ReactNode;
};

export const ContainedButton: FC<ContainedButtonProps> = ({
  handleClick,
  children,
  loading,
  isSecondary = false,
  icon,
  loadingIcon,
  ...props
}) => {
  const renderIcon: React.ReactNode = useMemo(() => {
    if (loading) {
      return loadingIcon ? loadingIcon : <CircularProgress size={20} />;
    }
    if (icon) {
      return <>{icon}</>;
    }
    return null;
  }, [loading, icon, loadingIcon]);
  return (
    <Button
      variant="contained"
      onClick={handleClick}
      disabled={loading}
      {...props}
      sx={{
        letterSpacing: '0.5px',
        backgroundColor: (theme) =>
          isSecondary
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
        height: 40,
        boxShadow: '0 2px 8px rgba(135, 177, 81, 0.28)',
        '&:hover': {
          backgroundColor: (theme) =>
            isSecondary
              ? theme.palette.secondary.hover
              : theme.palette.primary.hover,
        },
        '&.Mui-disabled': {
          backgroundColor: (theme) =>
            isSecondary
              ? theme.palette.secondary.disabled
              : theme.palette.primary.disabled,
        },
        ...props.sx,
      }}
    >
      <Stack direction="row" alignItems="center" columnGap={1}>
        {renderIcon}
        {children}
      </Stack>
    </Button>
  );
};
