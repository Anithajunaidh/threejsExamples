import React from 'react'
import images from '@/constants/images'
import Image from 'next/image'

const Doctors = () => {
  return (
    <div className='flex flex-col font-poppins lg:flex-row  bg-darkgreen  text-white'>
      <div className='px-4 py-20'>
      <div className=' font-bold text-xl text-center'>
      Meet Our Doctors
      </div>
      <div className='font-medium text-justify'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500. LIVES IN YOUR.</div>
      </div>
      <div className='text-center p-4'>
        <Image src={images.ladyDoctor1} alt="lady-doctor1" width={200} height={250} />
        <div>Emily Richard </div>
      </div>
      <div className='text-center p-4'>
        <Image src={images.maleDoctor1} alt="male-doctor1" width={200} height={250} />
        <div>John Doe</div>
        </div>
      <div className='text-center p-4'>
        <Image src={images.ladyDoctor2} alt="lady-doctor2" width={200} height={250} />
        <div>Carlos Sainz</div>
        </div>
    </div>
  )
}

export default Doctors
