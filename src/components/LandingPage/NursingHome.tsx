import React from 'react'
import Image from 'next/image'
import images from '@/constants/images'
import CustomButtonNew from '../button'

const NursingHome = () => {
  return (
    <div>
    <div className='px-4 py-6 flex flex-col font-poppins lg:flex-row-reverse'>
      <div className=' p-6 lg:w-1/2'>
        <div className=' font-bold text-xl text-center text-lightgreen'>
        How to pay for the nursing home?
        </div>
    <div className='font-medium text-justify'>We know what it costs to pay for a private residence . Therefore, the price of the nursing home, depending on the Nuestra Señora del Camino Foundation, a non-profit entity, is calculated based on the real cost of the services, with competitive prices and the same quality of care.</div>
    <CustomButtonNew type="submit" buttonType="SECONDARY" className=' font-poppins font-bold text-xs'>
            Read About Us
    </CustomButtonNew>
    </div>
    <div className=' p-4 text-center lg:w-1/2'> 
    <Image src={images.ladyDoctorRaindrop} alt="lady-doctor-with-patient" width={350} height={500} layout='responsive'/>
  </div> 
  </div>
  <div className='bg-lightgreen rounded-tr-large flex flex-col justify-center items-center text-white lg:flex-row font-poppins p-10 lg:mr-20'>
    <div className='lg:w-2/3'>
<div className='font-bold text-xl mb-5'>
Nuestra Señora del Camino Residence for the Elderly
</div>
<div className='font-medium'>
The Nuestra Señora del Camino Residence for the Elderly has a capacity for 72 people. It is located in Mirasierra, north of Madrid. In the same premises but being independent structures, there is the Nuestra Señora del Camino Residence and the Nuestra Señora del Camino I Occupational Center , which serve the group of people with intellectual disabilities.
</div>
</div>
 <div className='text-center lg:ml-auto lg:w-1/3 lg:pl-10'>
<CustomButtonNew type="submit" buttonType="PRIMARY" className=' font-poppins font-bold text-xs text-lightgreen w-32 bg-white'>
            Read About Us
</CustomButtonNew>
  </div>
  </div>
  </div>
  )
}

export default NursingHome
