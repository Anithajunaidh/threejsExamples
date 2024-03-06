import Image from 'next/image'
import React from 'react'
import images from '@/constants/images'

const DayCenter = () => {
  return (
  <div className='p-2'>
     <div className="block md:hidden">
      <div className='font-poppins font-bold text-lg text-lightgreen'>Day Center</div>
      <div className='font-poppins font-bold text-xs text-justify'>It is a center designed for adults with moderate or severe intellectual disabilities in which care is provided from a comprehensive perspective in order to achieve the maximum development of each individual's capabilities. </div>
      <Image
         src={images.DrOldMan}
         alt="DrOldMan"
         width={300}
         height={200}
         objectFit='cover'
       /> 
     <div className='font-poppins font-bold text-lg text-lightgreen'>Leisure service</div>
     <div className='font-poppins font-bold text-xs text-justify'>Avance is a service in which volunteers and users meet to carry out leisure activities, thus facilitating integration into society while collaborating in the training of Spanish youth. </div>
     <Image
         src={images.DrOldWoman1}
         alt="DrOldMan"
         width={300}
         height={200}
        /> 
     </div>
    
      <div className='hidden md:block'>
      <div className="grid grid-cols-9 grid-rows-6 gap-4">
        <div className="col-span-2 row-span-2 col-start-2 relative rounded-lg overflow-hidden">
        <Image
         src={images.DrOldMan}
         alt="DrOldMan"
        //  width={300}
        //  height={200}
         layout='fill'
         objectFit='cover'
       /> 
        </div>
        <div className="col-span-2 row-span-2 col-start-1 row-start-3 relative rounded-lg overflow-hidden">
        <Image
         src={images.DrOldWoman1}
         alt="DrOldMan"
        //  width={300}
        //  height={200}
        layout='fill'
        objectFit='cover'
        /> 
        </div>
        <div className="col-start-3 row-start-3 relative rounded-lg overflow-hidden">
        <Image
         src={images.DrOldWoman2}
         alt="DrOldMan"
        //  width={300}
        //  height={200}
        layout='fill'
        objectFit='cover'
        /> 
        </div>
        <div className="row-span-2 col-start-3 row-start-4 relative rounded-lg overflow-hidden">
        <Image
         src={images.DrOldWoman3}
         alt="DrOldMan"
        //  width={300}
        //  height={200}
        //  layout='responsive'
        layout='fill'
        objectFit='cover'
         /> 
        </div>
        <div className="col-span-2 row-span-2 col-start-4 row-start-1 my-10">
        <div className='font-poppins font-bold text-lg text-lightgreen'>Day Center</div>
        <div className='font-poppins font-bold text-xs text-justify'>It is a center designed for adults with moderate or severe intellectual disabilities in which care is provided from a comprehensive perspective in order to achieve the maximum development of each individual's capabilities. </div>
        </div>
        <div className="col-span-2 row-span-2 col-start-4 row-start-4 my-10">
        <div className='font-poppins font-bold text-lg text-lightgreen'>Leisure service</div>
        <div className='font-poppins font-bold text-xs text-justify'>Avance is a service in which volunteers and users meet to carry out leisure activities, thus facilitating integration into society while collaborating in the training of Spanish youth. </div>
        </div>
        <div className="col-span-2 row-span-2 col-start-6 row-start-2 relative rounded-lg overflow-hidden">
        <Image
         src={images.DrOldWoman4}
         alt="DrOldMan"
        //  width={300}
        //  height={200}
         layout='fill'
         objectFit='cover'
        /> 
        </div>
        <div className="col-span-2 row-span-2 col-start-7 row-start-4 relative rounded-lg overflow-hidden ml-10">
        <Image
         src={images.DrOldWoman5}
         alt="DrOldMan"
        //  width={300}
        //  height={200}
        //  layout='responsive'
        layout='fill'
        objectFit='cover'
        /> 
        </div>
      </div>
    </div>
  </div>
  )
}

export default DayCenter
