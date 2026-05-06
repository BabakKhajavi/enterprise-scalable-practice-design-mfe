import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

export type LineTextSeparatorProps = {
  text: string;
  sx?: object;
};

export const LineTextSeparator: React.FC<LineTextSeparatorProps> = ({
  text,
  sx,
}) => (
  <Box sx={{ width: '100%', ...sx }}>
    <Divider textAlign="center" sx={{ fontSize: 14 }}>
      {text}
    </Divider>
  </Box>
);

export default LineTextSeparator;
