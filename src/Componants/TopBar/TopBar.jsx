import React from 'react';
import almabetter_logo from '../../assets/almabetter_logo.png';

const TopBar = () => {
  return (
    <div className='h-7 bg-white'>
     <img src={almabetter_logo} alt="Almabetter-Logo" className="h-auto w-20 mt-2 ml-2" />
    </div>
  );
};

export default TopBar;
