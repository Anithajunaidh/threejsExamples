import React, { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
type BUTTON_TYPES = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';

interface CustomButtonProps extends ButtonProps {
  buttonType: BUTTON_TYPES;
  startIcon?: ReactNode; // Define a prop for start icon
  endIcon?: ReactNode; // Define a prop for end icon
}

function CustomButtonNew({ buttonType,startIcon, endIcon, ...props }: CustomButtonProps) {
  const buttonStyles = {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    width:'50%', 
    textTransform: 'none',
  };

  const buttonProps: ButtonProps = {
    ...props,
    sx: {
      ...buttonStyles,
      ...(buttonType === 'PRIMARY' && {
        variant: 'contained',
        backgroundColor:'#00AA7F',
        color:'white',  
        '&:hover': { 
          backgroundColor: '#00AA7F',
        },
      }),
      ...(buttonType === 'SECONDARY' && { variant: 'outlined',color: '#00AA7F',borderColor:'#00AA7F'}),
      ...(buttonType === 'TERTIARY' && { variant: 'text', color: '#00AA7F' }),
      ...props.sx,
      textTransform: 'none',
    },
  };

  return <Button {...buttonProps}>
    {startIcon && startIcon}
    {props.children}
    {endIcon && endIcon}
    </Button>;
}

export default CustomButtonNew;
