import React, { ReactElement } from 'react';

import Layout from '@/components/Layout';
import NoVerified from '@/components/Layout/NoVerified';

import { Card } from 'primereact/card';

import { NextPageWithLayout } from '../_app';

const Admin: NextPageWithLayout = () => {
  return (
    <div className="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 px-3 py-4">
      <Card title="Balance de Trading Plan" style={{ backgroundColor: '#071426' }}>
        <p className="text-3xl md:text-5xl font-bold text-yellow-500">$ 500.00</p>
        <p className="text-2xl font-bold text-green-500">+$ 50.00</p>
      </Card>
      <Card title="Balance de Kit Plans" style={{ backgroundColor: '#071426' }}>
        <p className="text-3xl md:text-5xl font-bold text-yellow-500">$ 20.00</p>
      </Card>
      <Card title="Balance de Co-fundador" style={{ backgroundColor: '#071426' }}>
        <p className="text-3xl md:text-5xl font-bold text-yellow-500">$ 500.00</p>
      </Card>
      
      <Card title="Balance de Trading Plan en revision" style={{ backgroundColor: '#071426' }}>
        <p className="text-3xl md:text-5xl font-bold text-yellow-500">$ 500.00</p>
      </Card>

      <Card title="Balance de Kit Plans en revisión" style={{ backgroundColor: '#071426' }}>
        <p className="text-3xl md:text-5xl font-bold text-yellow-500">$ 500.00</p>
      </Card>

      <Card title="Balance de Co-fundador en revisión" style={{ backgroundColor: '#071426' }}>
        <p className="text-3xl md:text-5xl font-bold text-yellow-500">$ 500.00</p>
      </Card>
      
      <Card 
        style={{ backgroundColor: '#071426', textAlign: 'center' }} 
        className="lg:col-span-3 flex justify-center items-center"
      >
        <h3 className='text-2xl lg:text-[56px] font-bold'>Ganacias totales</h3>
        <p className='text-2xl lg:text-[56px] font-bold text-[#27D323] pt-3 md:pt-8'>$ 00.00</p>
      </Card>
    </div>
  );
};

Admin.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Admin;
