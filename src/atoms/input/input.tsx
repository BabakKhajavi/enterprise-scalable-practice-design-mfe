import React from 'react';
import TextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material/TextField';

export type InputProps = MuiTextFieldProps & {
  error?: boolean;
  errorText?: string;
};

export const Input: React.FC<InputProps> = ({
  error,
  errorText,
  sx,
  slotProps,
  ...props
}) => (
  <TextField
    {...props}
    fullWidth
    variant="outlined"
    size="small"
    error={error}
    helperText={error ? (errorText ?? props.helperText) : props.helperText}
    sx={{
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme) => theme.palette.grey[700],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme) => theme.palette.grey[900],
      },
      '&:hover .MuiInputLabel-root': {
        color: (theme) => theme.palette.grey[700],
      },
      '& .MuiInputLabel-root.Mui-focused': {
        color: (theme) => theme.palette.grey[900],
      },
      '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: (theme) => theme.palette.error.main,
      },
      '& .MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline':
        {
          borderColor: (theme) => theme.palette.error.main,
        },
      '& .MuiInputLabel-root.Mui-error': {
        color: (theme) => theme.palette.error.main,
      },
      '& .MuiInputLabel-root.Mui-error.Mui-focused': {
        color: (theme) => theme.palette.error.main,
      },
      '& .MuiFormHelperText-root': {
        color: (theme) => theme.palette.text.secondary,
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: (theme) => theme.palette.error.main,
      },
      ...(sx || {}),
    }}
    slotProps={{
      ...(slotProps || {}),
      input: {
        sx: {
          height: 42,
          lineHeight: '42px',
          fontSize: '1rem',
          paddingTop: 0,
          paddingBottom: 0,
          boxSizing: 'border-box',
          ...(slotProps?.input &&
          typeof slotProps.input === 'object' &&
          'sx' in slotProps.input &&
          slotProps.input.sx
            ? slotProps.input.sx
            : {}),
        },
        ...(slotProps?.input || {}),
      },
    }}
  />
);

export default Input;
