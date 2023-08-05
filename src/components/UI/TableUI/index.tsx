import React, { CSSProperties, FC, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { twMerge } from 'tailwind-merge';

import { ITableCustomUI } from '@/api/types/UI';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import { createEmptyRowArrayCustom, createImgBodyTable } from '@/utils/tools/utils';

const TableCustomUI: FC<ITableCustomUI> = ({ data, dataTableProps, urlImage, styleCustom, onCustomChange, pagination, columnProps }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [first, setFirst] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const bodyTable: HTMLElement | null = document.querySelector('.p-datatable-tbody');

  const onPageChange = (event: any) => {
    setCurrentPage(event.page);
    setRows(event.rows);
    setFirst(event.first);

    if (onCustomChange) {
      onCustomChange(event);
      console.log((event.page + 1).toString());
    }
  };

  const emptyArray = createEmptyRowArrayCustom(10, data.body);

  const bodyTemplate = (rowData: any, column: any) => {
    const div = document.getElementById('empty');
    if (!div && bodyTable && !rowData[column.field]) {
      console.log('entro al div empty');
      const divEmpty = document.createElement('div');
      divEmpty.innerText = 'No Se Encontraron Resultados';
      divEmpty.id = 'empty';

      const styleDiv: CSSProperties = {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        top: '0.8rem',
        fontSize: '0.9rem',
        color: 'white',
      };

      Object.assign(divEmpty.style, styleDiv);
      bodyTable.appendChild(divEmpty);
      return;
    }

    data.body.results.length && div?.remove();
    return rowData[column.field];
  };

  const paginationFooter = () => {
    return (
      <Paginator
        pageLinkSize={1}
        totalRecords={totalPages}
        rows={rows}
        first={first}
        onPageChange={onPageChange}
        className="h-[60px] border-0 bg-[#1F222B]"
      />
    );
  };

  useEffect(() => {
    console.log('paginas totales' + pagination);
    if (pagination) setTotalPages(pagination.totalPages);
  }, [data]);

  useEffect(() => {
    createImgBodyTable(bodyTable, urlImage, '#fondo');
  }, [bodyTable]);

  useEffect(() => {
    if (pagination) {
      setFirst(0);
      setTotalPages(data.body.count);
    }
  }, [pagination]);

  return (
    <>
      <DataTable
        scrollable={true}
        scrollHeight="750px"
        className={twMerge(styleCustom.map((e) => styles[e]).join(' '))}
        value={data.body.results.length ? data.body.results : emptyArray.results}
        {...dataTableProps}
        footer={() => pagination && paginationFooter()}
        style={{
          width: '100%',
        }}>
        {data.header.map((col, index) => (
          <Column key={index} field={col.field} header={col.header} body={bodyTemplate} {...columnProps} />
        ))}
      </DataTable>
    </>
  );
};

export default TableCustomUI;