import Image from 'next/image';
import React from 'react';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';

function Header() {
  return (
    <header>
      {/* Top nav */}
      <div className='flex items-center bg-amazon_blue flex-grow p-1 py-2'>
        <div className='mt-2 items-center flex-grow sm:flex-grow-0 mr-3'>
          <Image 
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit='contain'
            className='cursor-pointer'
          />
        </div>
        {/* Search */}
        <div className='hidden sm:flex h-10 w-4 rounded-md flex-grow cursor-pointer'>
          <input className='p-2 h-full w-6 flex-grow rounded-l-md px-4 focus:outline-none' type="text" />
          <SearchIcon className="h-10 p-2 bg-yellow-400 hover:bg-yellow-500" />
        </div>
      
      {/* Right */}
      <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
        <div className='link'>
            <p>Hello shashi</p>
            <p className='font-extrabold md:text-sm'>Account & list</p>
        </div>
        <div className='link'>
            <p>Returns</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
        </div>
        <div className='relative link flex items-center'>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-extrabold'>0</span>
            <ShoppingCartIcon className='h-10'/>
            <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
        </div>
      </div>
      </div>
      {/* Bottom nav */}
      <div className='flex items-center space-x-3 p-2 pl-3 bg-amazon_blue-light text-white text-sm'>
        <p className='flex link items-center'>
            <MenuIcon className='h-6 mr-1'/>
            All
        </p> 
        <p className='link'>Prime Video</p>
        <p className='link'>Amazon Buisness</p>
        <p className='link'>Today's deal</p>
        <p className='hidden link lg:inline-flex'>Electronics</p>
        <p className='hidden link lg:inline-flex'>Food & Grocery</p>
        <p className='hidden link lg:inline-flex'>Prime</p>
        <p className='hidden link lg:inline-flex'>Buy again</p>
        <p className='hidden link lg:inline-flex'>Shopper toolkit</p>
        <p className='hidden link lg:inline-flex'>Health & Personal care</p>
      </div>
    </header>
  );
}

export default Header;
