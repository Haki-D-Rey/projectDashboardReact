import React, { ReactElement } from 'react';

import Layout from '@/components/Layout';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

import { MdAddToQueue } from 'react-icons/md';

import { useRouter } from 'next/router';
import { useIsMobile } from '@/hooks/useMediaQuery.hook';

import Toolbar from '@/components/Common/Toolbar';
import type { NextPageWithLayout } from '@/pages/_app';
import { useGetTradingRevenueHistoryByUserId } from '@/api/hooks/queries/transaction.hook';

const columns = [
  { field: 'date', header: 'Fecha de transacción' },
  { field: 'traded_amount', header: 'Monto invertido' },
  { field: 'percentage', header: 'Porcentaje de Ganancia', sortable: true },
  { field: 'traded_revenue', header: 'Monto de Ganancia', sortable: true },
  { field: 'traded_amount', header: 'Monto total', sortable: true },
];

const Profits: NextPageWithLayout = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const { data, isLoading } = useGetTradingRevenueHistoryByUserId();

  return (
    <>
      <Toolbar title="Ganancias de Trading">
        <></>
      </Toolbar>
      <div className="card flex-grow overflow-hidden border border-gray-800 bg-secondary">
        <DataTable
          scrollable
          scrollHeight="flex"
          value={data || []}
          loading={isLoading}
          tableStyle={{ minWidth: '50rem' }}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}>
          {
            !isMobile && columns.map((col, i) => (
              <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable || false} />
            ))
          }
        </DataTable>
      </div>
    </>
  );
};

Profits.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profits;
