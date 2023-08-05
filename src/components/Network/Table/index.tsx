import React, { FC } from 'react';

interface ITableProps {}

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const columns = [
  { field: 'level', header: 'Nivel', sortable: true },
  { field: 'name', header: 'Nombre completo', sortable: true },
  { field: 'type', header: 'Tipo', sortable: true },
];

const Table: FC<ITableProps> = ({}) => {
  return (
    <div className="card flex-grow overflow-hidden border border-gray-800 bg-secondary">
      <DataTable scrollable scrollHeight="flex" value={[]} tableStyle={{ minWidth: '50rem' }} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
        {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} sortable={col.sortable || false} />
        ))}
      </DataTable>
    </div>
  );
};

export default Table;
