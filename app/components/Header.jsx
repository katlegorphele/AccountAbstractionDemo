import React from 'react'
import MyConnectButton from './ConnectButton'

const Header = () => {
    return (
      <header className='w-full text-black flex items-center justify-between bg-red-700'>
        <h1 className='font-bold text-lg px-4'>
          <span className='hidden sm:inline'>ACCOUNT ABSTRACTION DEMO</span>
          <span className='sm:hidden'>AA DEMO</span>
        </h1>
        <MyConnectButton />
      </header>
    )
  }
  
  export default Header