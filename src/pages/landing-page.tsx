import React from 'react'
import { motion, useScroll, useSpring } from "framer-motion";
import Doctors from '@/components/LandingPage/Doctors'
import EmpowerWomen from '@/components/LandingPage/EmpowerWomen'
import Hero from '@/components/LandingPage/Hero'
import LadyOftheRoad from '@/components/LandingPage/LadyOftheRoad'
import OccupationalCenter from '@/components/LandingPage/OccupationalCenter'
import ServingElder from '@/components/LandingPage/ServingElder'
import NursingHome from '@/components/LandingPage/NursingHome'
import ServingElder2 from '@/components/LandingPage/ServingElder2'
import RetirementLife from '@/components/LandingPage/RetirementLife'
import Campaigns from '@/components/LandingPage/Campaigns'
import DayCenter from '@/components/LandingPage/DayCenter'
import HomeNurse from '@/components/LandingPage/HomeNurse'
import '@/styles/progressbar.css';
import SnakeLine from '@/components/SnakeLine';
import PlaneAnimation from './animation';
//import LineAnimation from '@/components/SnakeLine'
// import RetirementLife from '@/components/LandingPage/RetirementLife'


const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <div className='mx-auto max-w-screen-xl box-border'>
<motion.div className="progress-bar" style={{ scaleX }} />
{/* <SnakeLine/> */}
<Hero/>
<LadyOftheRoad/>
<OccupationalCenter/>
<EmpowerWomen/>
<ServingElder/>
<DayCenter/>
<Doctors/>
<ServingElder2/>
<NursingHome/> 
<RetirementLife/>
<Campaigns/>
<HomeNurse/>
    </div>
  )
}

export default LandingPage  

