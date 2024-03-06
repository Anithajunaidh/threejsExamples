import React from "react";
import ImageCard from "./ImageCard";
import images from "@/constants/images";
import CustomButtonNew from "../button";

const HomeNurse = () => {
  return (
    <div>
    <div className="relative">
      <div className="bg-homenurse bg-cover bg-center  md:bg-top ">
        <div className="font-poppins font-bold text-2xl text-lightgreen text-center " style={{ textShadow: '2px 2px 0px white' }}>
          Home Nurse
        </div>
        <div className="font-poppins font-bold text-lightgreen text-2xl text-center pb-96" style={{ textShadow: '2px 2px 0px white' }}>
          Home nurse service can also be arranged in case demanded by inmate or
          their relatives.
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-around lg:z-5 lg:absolute lg:top-25">
        <ImageCard
          image={images.alexander}
          name="ALEXANDER GARY"
          role="CO-FOUNDER"
        />
        <ImageCard image={images.melissa} name="MELISSA MUNOZ" role="FOUNDER" />
        <ImageCard image={images.abraham} name="ABRAHAM" role="CO-FOUNDER" />
      </div>
      </div>
      <CustomButtonNew type="submit" buttonType="PRIMARY" className=' font-poppins font-bold text-xs '>
            Become A Volunteer
    </CustomButtonNew>
    </div>
  );
};

export default HomeNurse;
