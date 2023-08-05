import React, { ReactElement, useState } from 'react';
import Layout from '@/components/Layout';

import { Button } from 'primereact/button';

import { MdOutlineMultipleStop, MdOutlineMoving } from 'react-icons/md';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import useMediaQuery from '@/hooks/useMediaQuery.hook';
import Toolbar from '@/components/Common/Toolbar';
import type { NextPageWithLayout } from '@/pages/_app';

const columns = [
  { field: 'date', header: 'Fecha de transacción' },
  { field: 'description', header: 'Descripción de transacción' },
  { field: 'amount', header: 'Monto', sortable: true },
  { field: 'network', header: 'Red Utilizada' },
  { field: 'status', header: 'Estado', sortable: true },
];

type TransactionType = 'Transaction' | 'Trading';

const Transactions: NextPageWithLayout = () => {
  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');
  const [type, setType] = useState<TransactionType>('Transaction');

  const handleType = (type: TransactionType) => {
    setType(type);
  };

  return (
    <>
      <Toolbar title="Transacciones">
        <Button
          raised
          label="Mis transacciones"
          className="w-1/2 lg:w-auto"
          onClick={() => handleType('Transaction')}
          icon={isTabletOrMobile ? undefined : <MdOutlineMultipleStop className="mr-2 text-2xl" />}
          severity={type === 'Transaction' ? undefined : 'secondary'}
        />
        <Button
          raised
          label={isTabletOrMobile ? 'Trading' : 'Ganancias de trading'}
          className="w-1/2 lg:w-auto"
          onClick={() => handleType('Trading')}
          severity={type === 'Trading' ? undefined : 'secondary'}
          //icon={<MdOutlineMoving className="mr-2 text-2xl" />}
          icon={isTabletOrMobile ? undefined : <MdOutlineMoving className="mr-2 text-2xl" />}
        />
      </Toolbar>
      <div className="card flex-grow overflow-hidden border border-gray-800 bg-secondary">
        <DataTable
          scrollable
          scrollHeight="flex"
          value={[]}
          tableStyle={{ minWidth: '50rem' }}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}>
          {columns.map((col, i) => (
            <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable || false} />
          ))}
        </DataTable>
      </div>
    </>
  );
};

Transactions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Transactions;
