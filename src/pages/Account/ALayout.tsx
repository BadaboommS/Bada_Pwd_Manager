import React from 'react';
import { Outlet } from 'react-router';
import Menu from './Menu/Menu';
//import Nav

export default function ALayout () {

  return (
    <div className='fixed w-screen h-screen top-0 left-0 overflow-y-scroll no-scrollbar'>
        {/*Nav bar component here*/}
        <Menu />
        <div className="flex flex-col w-screen min-h-full bg-gray-700 text-white">
          <Outlet />
        </div>
    </div>
  )
}