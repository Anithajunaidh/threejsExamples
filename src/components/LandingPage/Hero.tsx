import React from 'react'
import Image from 'next/image';
import IconLabelButtons from '../IconButton';
import NavBar from './NavBar';
import images from '@/constants/images';



const Hero = () => {
  return (
    // <div className='w-full' >
       <div className="bg-hero_img bg-cover bg-left bg-no-repeat pb-10 text-center p-4 lg:bg-hero_img_large lg:bg-contain">
      <NavBar/>
      <div>
      </div>
      <div className='flex flex-col lg:flex-row-reverse'>
      <div className='sm:pt-56 flex-grow lg:pt-2'>
      <Image
         src={images.heroImage}
         alt="Hero_image"
         width={500}
         height={400}
         layout='responsive'
       />  
      </div>
      <div className='text-lightgreen font-poppins font-bold lg:ml-10 lg:w-1/3 lg:text-white lg:pt-6'>
        <div className='sm:text-left text-lg'>CARE India is working </div>
        <div className='sm:text-left mb-3 text-lg'>for over 70 years to bring</div>
<div className='mb-4 text-xs text-justify'>We are a not-for-profit organisation that builds capacity of communities to ensure empowerment for marginalised women and girls. Our sustainable and holistic interventions in Health, Livelihood, Education and Disaster Relief & Resilience, provide innovative solutions to deep-rooted development problems.</div>
<IconLabelButtons/>
      </div>
    </div>
    </div>
  )
}

export default Hero
