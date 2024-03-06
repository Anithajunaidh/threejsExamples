import React from 'react'
import IconCard from './IconCard'

const DonationHistory = () => {
  const items=[
    {
      icon:'./assets/images/landing-page/chapel_icon.svg',
      title:'Respect',
      description:'Upholding the dignity of each individual'
    },
    {
      icon:'./assets/images/landing-page/geriatrics_icon.svg',
      title:'Integrity',
      description:'Adhering to an ethical code of conduct in all actions'
    },
    {
      icon:'./assets/images/landing-page/food_icon.svg',
      title:'Commitment',
      description:'Fulfilling our duties and social responsibilities'
    }, 
  ]
  return (
    <div>
      <div></div>
      <div className='flex flex-col lg:flex-row'>
        <div>
        <div className='flex flex-col lg:flex-row'>
       {items.map((item, index) => (
        <IconCard key={index} {...item} />
      ))}
    </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default DonationHistory
