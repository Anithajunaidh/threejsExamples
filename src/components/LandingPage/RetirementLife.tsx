import images from '@/constants/images'
import React from 'react'
import Image from 'next/image'

const RetirementLife = () => {
  return (
  <div className='p-2'>
    <div className='font-poppins font-bold text-lg text-center text-lightgreen'>Enjoy Your Retirement Life At Affordable Luxury With </div>
    <div className='mb-3 font-poppins font-bold text-center text-lg'>Our Home!</div>
    <div className=' font-poppins font-bold text-xs text-justify pb-2'>Enjoy assisted living combined with luxury at Mathews Home. We offer great environment and all essential healthcare facilities to the seniors so that they can live every day of their life with grace and elegance in the ambience of a resort.</div>

    <div className='flex flex-col mb-4 lg:flex-row relative '>
      <div className='bg-DrCheckingSrWoman bg-no-repeat bg-cover'>
      <div className="absolute top-0 left-0 w-full h-full bg-green-500 bg-opacity-30"></div>
      <div className="relative z-10">
      <div className='font-poppins font-extrabold text-xl text-white p-4 text-center lg:p-20'>
      Home for Retired people
      </div>
      <div className='font-poppins font-bold text-sm text-white p-2 lg:text-center lg:px-32 lg:pb-24'>
      Celebrate your post retirement life in luxury and comfort in the ambience of a resort, enjoying most modern amenities with a blend of the treasured ancient Indian wisdom and culture at affordable rates at Mathews Home. We take care of your physical, psychological and spiritual well-being with the help of professionals and various entertainment activities like in-door and outdoor games, Ayurvedic spa.
      </div>
      </div>
      </div>
    </div>

    <div className=' grid grid-cols-2 grid-row-2 gap-4'>
      <div className='relative mb-2'>
      <Image
         src={images.seniorsEatingDinner}
         alt="seniorsEatingDinner"
         layout='fill'
         objectFit='cover'
       />  
      </div>
      <div >
      <Image
         src={images.seniorsWatchingTV}
         alt="seniorsWatchingTV"
         width={200}
         height={150}
         layout='responsive'
       />  
      </div>
      <div className='col-span-2'>
      <Image
         src={images.seniorsPlayingChess}
         alt="seniorsPlayingChess"
         width={200}
         height={150}
         layout='responsive'
       />  
      </div>

    </div>
    <div className='p-4 flex flex-col lg:flex-row'>
    <div>
    <Image
        src={images.maleHealthVisitor}
         alt="maleHealthVisitor"
         width={300}
         height={200}
         layout='responsive'
         className='pt-2'
       /> 
       </div> 
       <div className=' p-2'> 
       <Image
        src={images.femaleHealthVisitor}
       alt="femaleHealthVisitor"
       width={300}
       height={200}
       layout='responsive'
     /> 
     </div>
     <div className='p-2'>
       <Image
         src={images.gatheringSrPeople}
         alt="gatheringSrPeople"
         width={300}
         height={200}
         layout='responsive'  
       /> 
       </div>
    </div>

    </div>
  )
}

export default RetirementLife
