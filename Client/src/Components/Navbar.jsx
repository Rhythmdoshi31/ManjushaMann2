import React from 'react';
import Logo from './Logo'
import {Menu} from 'lucide-react'
const Navbar = () => {
  return (
    <div className="w-full h-20 md:h-16 bg-[#0B2027] text-white flex items-center justify-between px-6 md:px-12">
      <Logo />
      <Menu className='scale-[1.6]'/>
    </div>
  );
};

export default Navbar;
