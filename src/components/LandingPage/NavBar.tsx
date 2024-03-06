'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Stack, Button, } from '@mui/material'
import { useRouter } from 'next/navigation'

const NavBar = () => {
  const router = useRouter();
  const SvgLoginGreen = () => (
    <svg xmlns="http://www.w3.org/2000/svg"  height="50" viewBox="0 0 35 45">
      <circle cx="16" cy="16" r="16" fill="green" />
      <text x="16" y="16" fontSize="20" fill="white" textAnchor="middle" alignmentBaseline="middle">&#62;</text>
    </svg>
  );
  return (
      <div className='flex justify-between' >
        <div>
        <Image
         src="assets/images/landing-page/logo.svg"
         alt="Logo"
         width={100}
         height={100}
       />
       </div>
       <div className='pt-4 hidden md:block'>
       {/* <Link href="/loginpage"> */}
       <Stack direction="row" spacing={2}>
      <Button variant="outlined" endIcon={<span className='pt-6 pl-6'><SvgLoginGreen /></span>} className='rounded-full h-10 bg-white border-green-900 text-green-900 flexCenter' onClick={()=>router.push('/loginpage')}>
        Login
      </Button>
    </Stack>
       {/* </Link> */}
      </div> 
      <div className='pt-4 block md:hidden'>
       <Link href="/loginpage">
       <svg xmlns="http://www.w3.org/2000/svg"  height="50" viewBox="0 0 35 45">
      <circle cx="16" cy="16" r="16" fill="white" />
      <text x="16" y="16" fontSize="20" fill="green" textAnchor="middle" alignmentBaseline="middle">&#62;</text>
       </svg>
       </Link>
      </div>  
      </div> 
  )
}

export default NavBar
