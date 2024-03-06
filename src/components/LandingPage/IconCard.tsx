// Card.js
import Image from 'next/image';
import React from 'react';
interface IconCardProps{
  icon:string;
  title:string;
  description:string;
}

const IconCard:React.FC<IconCardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center p-10 ">
      <Image src={icon} alt="Icon" width={80} height={80} className="mb-4" />
      <div className="text-lg font-poppins font-semibold">{title}</div>
      <div className="font-poppins font-semibold text-xs">{description}</div>
    </div>
  );
}

export default IconCard;
