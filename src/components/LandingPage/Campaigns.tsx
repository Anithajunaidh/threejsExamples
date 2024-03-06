import images from '@/constants/images'
import React from 'react'
import Image from 'next/image'

const Campaigns = () => {
  return (
    <div className='px-2'>
      <div className='font-poppins'>
      <div className=' font-extrabold text-xl text-lightgreen text-center px-4'>
       OUR CAMPAIGNS
       </div>
       <div className='font-bold text-center p-4'> Quick Access for Emergency Help</div>
       <div className=' text-sm text-justify px-2 lg:w-1/3 lg:mx-auto'>
       24/7 doctor and nursing care is available at Mathews Home. All our nurses are qualified, CCU experienced, and has worked with reputable hospitals (India and Abroad). We assure hospital type care without giving hospital type atmosphere.      </div>
       </div>

      <div className="block md:hidden">
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
        <div className="col-start-1 row-start-3 relative ">
        <Image
         src={images.DrGivingPills}
         alt="drGivingPills"
         layout='fill'
         objectFit='cover'
         className='p-2'
        /> 
        </div>
        <div className="col-start-2 row-start-3">
        <Image
         src={images.oldmanReadingBook}
         alt="oldmanReadingBook"
         width={200}
         height={150}
         layout='responsive'
        /> 
        </div>
        <div className="col-span-2 row-span-2 col-start-1 row-start-1 relative">
        <Image
         src={images.nurseFeedingSrMan}
         alt="nurseFeedingSrMan"
         layout='fill'
         objectFit='cover'
       /> 
       </div>
    </div>
  </div>
  <div className='hidden md:block'>
    <div className="grid grid-cols-3 grid-rows-2 gap-4">
    <div className="col-span-2 row-span-2 relative">
    <Image
         src={images.nurseFeedingSrMan}
         alt="nurseFeedingSrMan"
        //  width={200}
        //  height={150}
         layout='fill'
         objectFit='cover'
       /> 
       </div>
    <div className="col-start-3 relative">
    <Image
         src={images.DrGivingPills}
         alt="drGivingPills"
        // width={200}
         //height={150}
         layout='fill'
         objectFit='cover'
       /> 
       </div>
    <div className="col-start-3 row-start-2">
    <Image
         src={images.oldmanReadingBook}
         alt="oldmanReadingBook"
         width={200}
         height={150}
         layout='responsive'
       /> 
       </div>
      </div>
      </div>   
</div>
  )
}

export default Campaigns
