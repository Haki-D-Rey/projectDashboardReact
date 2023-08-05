import { ICardUI } from '@/api/types/UI';
import { createImgBodyTable } from '@/utils/tools/utils';
import { Paginator } from 'primereact/paginator';
import React, { FC, useEffect, useState } from 'react';

const CardUI: FC<ICardUI> = ({ data, style, styleCustom, urlImage, pagination, onCustomChange, children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rows, setRows] = useState(10);
  const [first, setFirst] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const card: HTMLElement | null = document.getElementById('card-ui');

  const onPageChange = (event: any) => {
    setCurrentPage(event.page);
    setRows(event.rows);
    setFirst(event.first);

    if (onCustomChange) {
      onCustomChange(event);
      console.log((event.page + 1).toString());
    }
  };

  useEffect(() => {
    createImgBodyTable(card, urlImage, 'fondo-card');
  }, [card]);

  useEffect(() => {
    if (pagination) {
      setFirst(0);
      setTotalPages(data.body.count);
    }
  }, [pagination]);

  return (
    <>
      <div id="card-ui" className="flex w-full flex-col gap-[0.5rem]">
        {children}
      </div>
      <Paginator
        pageLinkSize={1}
        totalRecords={totalPages}
        rows={rows}
        first={first}
        onPageChange={onPageChange}
        className="h-[60px] border-0 bg-[#1F222B]"
      />
    </>
  );
};

export default CardUI;
