import { FC, useState } from 'react';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface PinFieldProps {
  pin: string;
  width?: string | number;
  label?: string;
}
export const PinField: FC<PinFieldProps> = ({
  pin,
  width = '80px',
  label = 'Pin',
}) => {
  const theme = useTheme();
  const [pinIsVisible, setPinIsVisible] = useState<boolean>(false);
  return (
    <Stack direction="row" alignItems="center" spacing={1} width={width}>
      <TextField
        variant="outlined"
        type="text"
        value={pinIsVisible ? pin : label}
        onClick={() => {
          setPinIsVisible(!pinIsVisible);
        }}
        sx={{
          width: '100%',
          '& .MuiInputBase-input': {
            p: '4px 8px',
            fontSize: '14px',
            color: (theme) => theme.palette.primary.main,
            fontWeight: pinIsVisible ? 400 : 600,
            cursor: 'pointer',
          },
          '& .MuiOutlinedInput-root': {
            p: 0,
            minHeight: '32px',
            // Default border color
            '& fieldset': {
              borderColor: (theme) => theme.palette.grey[400],
            },
            // Border color on hover
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.grey[400],
            },
            // Border color on focus
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.grey[400],
            },
          },
        }}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                m: 0,
                minHeight: 'unset',
              }}
            >
              <IconButton
                sx={{
                  pl: '6px',
                  pr: '0px',
                }}
                onClick={() => {
                  setPinIsVisible(!pinIsVisible);
                }}
              >
                {pinIsVisible ? (
                  <VisibilityOff
                    sx={{
                      fontSize: '18px',
                      color: (theme) => theme.palette.primary.main,
                    }}
                  />
                ) : (
                  <Visibility
                    sx={{
                      fontSize: '18px',
                      color: (theme) => theme.palette.primary.main,
                    }}
                  />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <ContentCopyIcon
        sx={{
          fontSize: '16px',
          cursor: 'pointer',
          color: theme.palette.secondary.main,
        }}
        onClick={() => {
          if (pin) {
            navigator.clipboard.writeText(pin);
          }
        }}
      />
    </Stack>
  );
};
