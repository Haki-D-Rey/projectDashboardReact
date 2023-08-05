import React, { ReactElement, useState } from 'react';

import Layout from '@/components/Layout';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';

import { HiOutlineCash } from 'react-icons/hi';

import { useRouter } from 'next/router';

import { useIsMobile } from '@/hooks/useMediaQuery.hook';

import Toolbar from '@/components/Common/Toolbar';
import type { NextPageWithLayout } from '@/pages/_app';
import { PageDashboardLinks } from '@/utils/constants/internal-links';
import { useGetTradingPlanByUserId } from '@/api/hooks/queries/transaction.hook';

const columns = [
  { field: 'created_at', header: 'Fecha de Inversión' },
  { field: 'transaction_hash', header: 'Hash de transacción' },
  { field: 'trading_amount', header: 'Monto', sortable: true },
];

const Investments: NextPageWithLayout = () => {
  const { push } = useRouter();
  const isMobile = useIsMobile();
  const { data, isLoading } = useGetTradingPlanByUserId();

  return (
    <>
      <Toolbar title="Planes de Inversiones">
        <Button
          raised
          label="Agregar una Nueva Inversión"
          className="w-full lg:w-auto"
          style={{
            fontSize: isMobile ? '14px' : ''
          }}
          onClick={() => push(PageDashboardLinks.InvestmentsNew)}
          icon={<HiOutlineCash className="mr-2 text-2xl" />}
        />
      </Toolbar>
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

Investments.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Investments;
