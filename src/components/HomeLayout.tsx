'use client'
import React from 'react'
import { useSelector} from 'react-redux';
import { selectUserType } from '@/store/userSlice';
import '@/styles/global.css';
import Image from 'next/image';
import LogoutButton from '@/app/components/LogoutButton';
import { PlatformUserType, UserType,} from '@/constants/UserType';

type HomeLayoutProps = {
  children: React.ReactNode; //👈 children prop typr
};
const HomeLayout = (props:HomeLayoutProps) => {
  const userType = useSelector(selectUserType);
  return (
    <div className='reset h-screen bg-darkgreen'>
      <div className='flex justify-between p-3  w-full h-1/5 bg-darkgreen'>
        <div>
          <Image
           src='/assets/images/landing-page/logo.svg'
           alt="image"
           width={150}
           height={100}
           className='pt-3 pl-3'
           />
        </div>  
        <div className='w-14 h-14 pt-4 pl-4 text-white rounded-full relative top-10 right-10 bg-lightgreen'>
           AD
        </div>
      </div>
      <div className='flex  h-4/5'>
        <div className='w-1/4 p-4 flex flex-col justify-between'>
  {/* sidebar content */}
        {userType === PlatformUserType.SUPER_ADMIN && (
        <>
          {/* Super Admin Sidebar Content */}
          <div>
            <h3>Super Admin Menu</h3>
            <ul>
              <li>
                <a href="/admin-management">Admin Management</a>
              </li>
              <li>
                <a href="/user-management">User Management</a>
              </li>
              <li>
                <a href="/validate-expenses">Validate Expenses</a>
              </li>
            </ul>
          </div>
        </>
      )}

      {userType === 'admin' && (
        <>
          {/* Admin Sidebar Content */}
          <div>
            <h3>Admin Menu</h3>
            <ul>
              <li>
                <a href="/user-management">User Management</a>
              </li>
              <li>
                <a href="/validate-expenses">Validate Expenses</a>
              </li>
            </ul>
          </div>
        </>
      )}

      {userType === UserType.CENTER_USER && (
        <>
          {/* User Sidebar Content */}
          <div>
            <h3>User Menu</h3>
            <ul>
              <li>
                <a href="/bills">Bills</a>
              </li>
              <li>
                <a href="/remittances">Remittances</a>
              </li>
            </ul>
          </div>
        </>
      )}
          <div className=' bg-primarygreen text-white'>
         {/* Display the user type in the sidebar */}
          <div>User Type: {userType}</div>
          </div>
          <div className='relative bottom-0 left-10'>
            <LogoutButton/>
          </div>
        </div>
        <div className='w-3/4  bg-white rounded-tl-2xl'>
        {props.children}
        </div>
      </div>
    </div>
  )
}
export default HomeLayout
