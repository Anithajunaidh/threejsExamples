import React from "react";
import Image from 'next/image'
import { FaFacebook, FaGooglePlus, FaTwitter } from "react-icons/fa";

interface CardProps {
  image: string;
  name: string;
  role: string;
}

const ImageCard: React.FC<CardProps> = ({ image, name, role }) => {
  return (
    <div className="bg-transparent p-4 rounded-lg">
      <div className="relative">
        <Image
          src={image}
          alt={name}
         width={250}
         height={500}
         layout="responsive"
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-poppins font-semibold">{name}</h3>
        <p className="text-gray-600">{role}</p>
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <FaFacebook size={30} color="green" />
        <FaTwitter size={30} color="green" />
        <FaGooglePlus size={30} color="green" />
      </div>
    </div>
  );
};

export default ImageCard;
