import React from 'react'
import Image from 'next/image'
import images from '@/constants/images';
type LoginLayoutProps = {
  children: React.ReactNode; //👈 children prop typr
};
const LoginLayout = (props:LoginLayoutProps) => {
  return (
    <div className='shadow-md  flex flex-col items-center w-full bg-primary'>
      <div className='bg-lightgreen rounded-tl-lg rounded-tr-lg  flex items-center justify-between w-full'>
      <div className='text-white text-xl font-bold pl-4'>Bienvenido de nuevo</div>
      <Image src={images.manLogin} alt='man login' height={150} width={200} priority={true} className='pr-4'/>
      </div>
      <div className='bg-white w-full h-72 '>
      {props.children}
      </div>
    </div>
  )
}

export default LoginLayout
