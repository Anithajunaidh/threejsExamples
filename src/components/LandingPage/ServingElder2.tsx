import React from 'react'
import images from '@/constants/images'
import Image from 'next/image'

const ServingElder2 = () => {
  return (
    <div className='px-4 py-6 flex flex-col font-poppins lg:flex-row-reverse'>
      <div className='p-4 bg-cover lg:w-1/2'style={{
      backgroundImage: `url(${images.holdingHands})`,
    }}>

<div className=" p-4 grid grid-cols-3 grid-rows-3 gap-4">
    <div >
    <Image
         src={images.staffs1}
         alt="Logo"
         width={200}
         height={150}
        // style={{objectFit: "contain"}}
        layout='responsive'
       />  
 
    </div>
    <div className="col-start-3 row-start-3">
    <Image
         src={images.staffs2}
         alt="Logo"
         width={200}
         height={150}
         //style={{objectFit: "contain"}}
         layout='responsive'
       />  

    </div>
</div>
    
</div>
      <div className=' p-6 lg:w-1/2 text-white bg-lightgreen '>
      <div className=' font-bold text-xl text-center'>
      Serving the Elder Cause 
      </div>
      <div className=' font-bold text-xl text-center'>
      for four decades
      </div>
      <div className='font-medium text-justify'>HelpAge India is a secular, not-for-profit organization in India, registered under the Societies’ Registration Act of 1860. Set up in 1978, the organization works for ‘the cause and care of disadvantaged older persons to improve their quality of life’ HelpAge envisions a society where elderly have the right to an active, healthy and dignified life. It recently became the first and only Indian organization to be honoured with the ‘UN Population Award 2020’ for its exemplary work in the field of ageing, relief efforts work during the Covid 19 pandemic and recognition of the organization’s outstanding contribution to population issues and efforts in the realization of older persons rights in India.Currently there are a projected 138 million elderly in India. HelpAge India voices their concerns, so they can lead secure & dignified lives. It works through 26 State Offices across India, runs numerous programs on-ground, addressing elder needs and advocating for their rights, such as their right to Universal Pension, quality Healthcare, action against Elder Abuse and many more at a national, state and societal level with Central and State governments. It advocates for elder friendly policies and their implementation thereof.</div>
      </div>
      
    </div>
  )
}

export default ServingElder2
