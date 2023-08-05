import React, { ReactElement } from 'react';

import Layout from '@/components/Layout';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

import { MdAddToQueue } from 'react-icons/md';

import { useRouter } from 'next/router';
import useMediaQuery from '@/hooks/useMediaQuery.hook';

import Toolbar from '@/components/Common/Toolbar';
import type { NextPageWithLayout } from '@/pages/_app';

const columns = [
  { field: 'date', header: 'Nombre del Plan' },
  { field: 'description', header: 'Hash de transacción' },
  { field: 'amount', header: 'Fecha de Inicio', sortable: true },
  { field: 'network', header: 'Fecha de expiración', sortable: true },
];

const Streaming: NextPageWithLayout = () => {
  const { push } = useRouter();
  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');

  return (
    <>
      <Toolbar title="Kit plans adquiridos">
        <Button
          raised
          className="w-full lg:w-auto"
          label="Agregar un nuevo plan"
          onClick={() => push('/admin/kit-plans/new')}
          icon={<MdAddToQueue className="mr-2 text-2xl" />}
        />
      </Toolbar>
      <div className="card flex-grow overflow-hidden border border-gray-800 bg-secondary">
        <DataTable
          scrollable
          // loading={isLoading}
          scrollHeight="flex"
          value={[]}
          tableStyle={{ minWidth: '50rem' }}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}>
          {!isTabletOrMobile &&
            columns.map((col, i) => <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable || false} />)}
        </DataTable>
      </div>
    </>
  );
};

Streaming.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Streaming;
