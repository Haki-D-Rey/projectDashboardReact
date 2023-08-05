import React, { FC } from 'react';

import { MdFilterList } from 'react-icons/md';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import useMediaQuery from '@/hooks/useMediaQuery.hook';

interface IToolbarProps {
  title: string;
  children?: React.ReactNode;
  viewOtherElements?: boolean;
}

const Toolbar: FC<IToolbarProps> = ({ children, title, viewOtherElements }) => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');

  return (
    <div className="md:ml-4 mb-4 flex flex-col items-center gap-4 lg:flex-row px-2 md:px-0">
      <h1 className="text-[18px] md:text-2xl font-bold text-primaryText">{title}</h1>
      <div className="flex w-full flex-1 flex-col items-center justify-between space-y-2 lg:flex-row">
        <div className="flex w-full gap-4 lg:w-[38%] lg:min-w-[200px]">{children}</div>
        {
          !viewOtherElements && <div className="flex items-center w-full gap-2 md:gap-4 lg:w-auto">
          <div className="w-1/2 lg:w-auto">
            <span className="p-input-icon-right">
              <InputText 
                placeholder="Search" 
                style={{ 
                  width: '100%',
                  height: isTabletOrMobile ? '40px' : '', 
                  fontSize: isTabletOrMobile ? '12px' : '', 
                  backgroundColor: '#071426',
                  borderRadius: '10px',
                }} />
              <i className="pi pi-search" />
            </span>
          </div>
          <Button
            raised
            className="w-1/2 lg:w-auto"
            label={isTabletOrMobile ? 'Filtrar datos' : undefined}
            icon={<MdFilterList className="md:mr-2 text-2xl lg:mr-0" />}
            severity="secondary"
            style={{
              fontSize: '12px', 
              display: 'flex', 
              flexDirection: 'row-reverse',
              height: isTabletOrMobile ? '40px' : '',
              backgroundColor: '#071426'
            }}
          />
        </div>
        }
      </div>
    </div>
  );
};

export default Toolbar;
