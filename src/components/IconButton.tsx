import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons() {
  const SvgLoginGreen = () => (
    <svg xmlns="http://www.w3.org/2000/svg"  height="50" viewBox="0 0 35 45">
      <circle cx="16" cy="16" r="16" fill="green" />
      <text x="16" y="16" fontSize="20" fill="white" textAnchor="middle" alignmentBaseline="middle">&#62;</text>
    </svg>
  );
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" endIcon={<span className='pt-6 pl-6'><SvgLoginGreen /></span>} className='rounded-full h-10 bg-white border-green-900 text-green-900 flexCenter'>
        Login
      </Button>
    </Stack>
  );
}