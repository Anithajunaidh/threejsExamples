import React from 'react'
import IconCard from './IconCard'
import CustomButtonNew from '../button'

const OccupationalCenter = () => {
  const items=[
    {
      icon:'./assets/images/landing-page/respect_icon.svg',
      title:'Respect',
      description:'Upholding the dignity of each individual'
    },
    {
      icon:'./assets/images/landing-page/integrity_icon.svg',
      title:'Integrity',
      description:'Adhering to an ethical code of conduct in all actions'
    },
    {
      icon:'./assets/images/landing-page/commitment_icon.svg',
      title:'Commitment',
      description:'Fulfilling our duties and social responsibilities'
    },
    {
      icon:'./assets/images/landing-page/excellence_icon.svg',
      title:'Excellence',
      description:'Setting high performance standards and being accountable to them'
    }, 
  ]
  return (
    <div className='px-4 relative'>
      <div className='mb-3 font-poppins font-bold text-lg text-center'>What is an occupational center?</div>
<div className='mb-4 font-poppins font-bold text-xs text-justify'>An occupational center is a place where people with intellectual disabilities develop a series of occupational therapy activities whose purpose is to promote the integration of this group in society, the labor insertion of those individuals who have the skills for it, and to maintain and improve the development learned during its earlier stages.Occupational centers prepare people with intellectual disabilities to face the challenges of everyday life. </div>
    <div className='flex flex-col lg:flex-row'>
       {items.map((item, index) => (
        <IconCard key={index} {...item} />
      ))}
    </div>
    <CustomButtonNew type="submit" buttonType="TERTIARY" className='absolute top-1/2 right-0 transform -translate-y-1/2 w-20 font-poppins font-bold text-xs'>
            See all &rarr;
          </CustomButtonNew>
    </div>
  )
}

export default OccupationalCenter
