import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="contained" color="success" {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;

