import React from 'react'
import useAuthUser from '../hooks/useUserAuth';
import { Link, useLocation } from 'react-router-dom';
import { BellIcon, HomeIcon, LogOutIcon, ShipWheelIcon, UsersIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
const {authUser} = useAuthUser();
const location = useLocation();

const isChatPage = location.pathname.startsWith("/chat");

const {mutate,isPending,error} = useLogout();

  return (
   <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex  items-center'>
      <div className='container mx-auto px-4 sm:px-6 md:px-8'>
          <div className='flex items-center justify-end gap-4 w-full'>
            {
              isChatPage && (
                <div className='pl-5'>
                  <Link to="/" className="flex items-center gap-2.5">
                  <ShipWheelIcon className="size-9 text-primary" />
                   <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
                  </Link>
                </div>
              )
            }
            <div className='flex items-center gap-3 sm:gap-4'>
              <Link to="/notifications">
                <button className='btn btn-ghost btn-circle'>
                  <BellIcon className='size-6 text-base-content opacity-70'></BellIcon>
                </button>
              </Link>
            </div>
            <ThemeSelector/>
            <div className='avatar'>
              <div className='w-9 rounded-full'>
                <img src={authUser?.profilePic} alt="User Image" rel="noreferrer" />
              </div>
            </div>
            <button className='btn btn-ghost btn-circle' onClick={mutate}>
              <LogOutIcon className='size-6 text-base-content opacity-70'/>
            </button>
          </div>
      </div>
   </nav>
  )
}

export default Navbar