import React from 'react'

import KitPlanItem from './KitPlanItem';
import { IResponseKitPlan } from '@/api/types/transaction';

interface indexProps {
  dataKp: IResponseKitPlan[] | undefined;
}

const Main = ({ dataKp } : indexProps) => {
  
  return (
    <div>
      {dataKp?.map((kpItem, index) => (
        <div className='flex flex-col' key={index}>
          <KitPlanItem name={kpItem.title} price={kpItem.price} benefits={kpItem.details} />
          {index !== dataKp.length - 1 && <div className="h-1 w-full mx-auto bg-primary"></div>}
        </div>
      ))}
    </div>
  );
};

export default Main;