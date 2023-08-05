import React, { useState } from 'react';
import Toogle from '../Toogle';

interface ITopBar {}

const TopBar = () => {
  const [checked, setChecked] = useState(true);

  return (
    <div
      className={`min-w-screen flex w-full flex-col justify-center min-[320px]:h-[75px] xl:h-[100px] ${
        checked ? 'bg-primaryDark' : 'bg-primaryLigth'
      } align-middle`}>
      <div className="m-auto">
        <Toogle isChecked={checked} setIsChecked={setChecked} width="80px" />
      </div>
    </div>
  );
};

export default TopBar;
