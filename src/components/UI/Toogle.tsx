import React from 'react';
import Image from 'next/image';

import DarkIcon from '/public/assets/menu-icons/DarkIcon.svg';
import LightIcon from '/public/assets/menu-icons/LightIcon.svg';

interface ToogleProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  width?: string;
}

const Toogle = ({ isChecked, setIsChecked, width }: ToogleProps) => {
  return (
    <div
      style={{
        width: `${!!width?.length ? width : '100%'}`,
      }}>
      <button
        className={`relative inline-flex h-8 w-full items-center rounded-full transition-colors ${!isChecked ? 'bg-primary' : 'bg-gray-300'}`}
        onClick={() => setIsChecked(!isChecked)}>
        <Image
          src={isChecked ? DarkIcon : LightIcon}
          alt="toogle_icon"
          className={`absolute inline-block h-6 w-6 rounded-full bg-tertiary p-1 shadow transition-all duration-300 ${
            isChecked ? 'left-[70%]' : 'left-0'
          }`}
        />
      </button>
    </div>
  );
};

export default Toogle;
