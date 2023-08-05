import React, { ReactElement, useState } from 'react';

import Layout from '@/components/Layout';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import useMediaQuery from '@/hooks/useMediaQuery.hook';

import Toolbar from '@/components/Common/Toolbar';
import type { NextPageWithLayout } from '@/pages/_app';
import { useGetTradingRevenueHistoryByUserId } from '@/api/hooks/queries/transaction.hook';
import HistoryModal from '@/components/History/HistoryModal';

const columns = [
  { field: 'date', header: 'Nombre del Plan' },
  { field: 'description', header: 'Hash de transacción' },
  { field: 'amount', header: 'Fecha de Inicio', sortable: true },
  { field: 'network', header: 'Fecha de expiración', sortable: true },
];

const History: NextPageWithLayout = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const { data, isLoading } = useGetTradingRevenueHistoryByUserId();
  const isTabletOrMobile = useMediaQuery('(max-width: 1224px)');

  return (
    <>
      <Toolbar title="Historial de Transacciones"></Toolbar>
      <div className="card flex-grow overflow-hidden border border-gray-800 bg-secondary">
        <DataTable
          scrollable
          loading={isLoading}
          scrollHeight="flex"
          value={data || []}
          tableStyle={{ minWidth: '50rem' }}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}>
          {!isTabletOrMobile &&
            columns.map((col, i) => <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable || false} />)}
        </DataTable>
      </div>

      <HistoryModal visible={visible} setVisible={setVisible} />
    </>
  );
};

History.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default History;
