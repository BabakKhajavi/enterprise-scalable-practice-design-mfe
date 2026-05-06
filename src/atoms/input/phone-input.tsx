import React from 'react';
import { Typography } from '@mui/material';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

interface PhoneInputProps {
  value: string;
  onChange: (phone: string) => void;
  onBlur?: () => void;
  containerStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  country?: string;
  enableSearch?: boolean;
  error?: boolean;
  errorText?: string;
  touched?: boolean;
}

export const PhoneInputField: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onBlur,
  containerStyle = { marginBottom: 3 },
  inputStyle,
  buttonStyle = { borderRadius: 10 },
  country = 'us',
  enableSearch = true,
  error,
  errorText,
  touched,
}) => {
  return (
    <>
      <PhoneInput
        country={country}
        value={value}
        onChange={onChange}
        enableSearch={enableSearch}
        containerStyle={{ marginBottom: 3, ...containerStyle }}
        onBlur={onBlur}
        inputStyle={{
          width: '100%',
          height: 42,
          fontSize: 16,
          borderRadius: 10,
          ...inputStyle,
        }}
        buttonStyle={{ borderRadius: 10, ...buttonStyle }}
      />
      {touched && error && (
        <Typography variant="caption" color="error" sx={{ mb: 2, pl: 2 }}>
          {errorText}
        </Typography>
      )}
    </>
  );
};

export default PhoneInputField;
