'useclient'
import React from 'react'
import Button from '@mui/material/Button';
import images from '@/constants/images';
import { Icon } from '@mui/material';
import CustomButtonNew from '@/components/button';
const LogoutButton = () => {
  const svgIcon = (
    <Icon>
      <img alt="edit" src={images.logoutIcon} className='w-full pb-1'/>
    </Icon>
  );
  return (
    //   <Button variant="contained" startIcon={svgIcon} className='text-white bg-darkgreen w-32 normal-case p-1'>
    //     Log out
    //  </Button>     
    <CustomButtonNew
  buttonType="SECONDARY"
  startIcon={svgIcon}
> Log out
</CustomButtonNew>)
}
export default LogoutButton
