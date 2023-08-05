import React, { CSSProperties, ReactElement, ReactNode, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import type { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

//Icons
import iconVerify from '/public/assets/UI/iconVerify.svg'
import iconNotVerify from '/public/assets/UI/iconNotVerify.svg'

//Prime React
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';

//Interface  UI
import { IButtonUI, ICardBodyCustom, ITableCustomUI, IUrlImage } from '@/api/types/UI';
import { IQueryBalanceTypeOperation, IResponseBalanceTypeOperation, ResultKeysMap } from '@/api/types/transaction';

//Utils
import { CreateIcon, buildArrayResultCard, child, createDivTextEmptyData, createEmptyRowArrayCustom, getDateCutomeString, getDateISO } from '@/utils/tools/utils';
import { twMerge } from 'tailwind-merge';
import useMediaQuery, { useIsMobile } from '@/hooks/useMediaQuery.hook';

//Custom props
import TableCustomUI from '@/components/UI/TableUI';

import ButtonUI from '@/components/UI/Button';
import SVGComponent from '@/components/UI/SvgFC';
import CardUI from '@/components/UI/CardUI';

//Services
import { useGetQueryBalanceTypeOperation } from '@/api/hooks/queries/transaction.hook';
import { getBalanceTypeOperationDonwload } from '@/api/endpoints/transactions';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';
import { getExtendedMenu, toogleExtendedMenu } from '@/redux/features/appSlice';
import TitleUI from '@/components/UI/TitleUI';

type calendarProps = React.ComponentProps<typeof Calendar>;

const Transactions: NextPageWithLayout = () => {
  const router = useRouter();
  const [useMobile, useTablet] = [useIsMobile(), useMediaQuery('(min-width: 768px)')];
  const dispatch = useAppDispatch();
  const isExtended = useAppSelector(getExtendedMenu);
  const [params, setParams] = useState<IQueryBalanceTypeOperation>({
    operation_area: 'transaction',
    page: '1',
  });
  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const { data, isLoading, isError } = useGetQueryBalanceTypeOperation(params);
  const donwloadService = useMutation(getBalanceTypeOperationDonwload);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateTable, setUpdateTable] = useState<boolean>(false);
  const [table, setTable] = useState<ITableCustomUI>({
    data: {
      header: [
        { field: 'transaction_date', header: 'Fecha' },
        { field: 'description', header: 'Descripcion' },
        { field: 'amount', header: 'Monto' },
        { field: 'wallet_network', header: 'Red Utilizada' },
        { field: 'status', header: 'Estado' },
      ],
      body: {
        count: 6,
        next: '',
        previous: '',
        results: [
          {
            transaction_date: '2021-05-27T16:17:19.257389Z',
            description: '$20.00 Kit Plan',
            amount: '180$',
            wallet_network: 'USD Tether (USDT, ERC20)',
            status: 'VERIFIED',
          },
          {
            transaction_date: '2021-05-27T16:17:19.257389Z',
            description: '$20.00 Kit Plan',
            amount: '280$',
            wallet_network: 'USD Tether (USDT, ERC20)',
            status: 'NOVERIFIED',
          },
          {
            transaction_date: '2021-05-27T16:17:19.257389Z',
            description: '$20.00 Kit Plan',
            amount: '180$',
            wallet_network: 'USD Tether (USDT, ERC20)',
            status: 'VERIFIED',
          },
          {
            transaction_date: '2021-05-27T16:17:19.257389Z',
            description: '$20.00 Kit Plan',
            amount: '180$',
            wallet_network: 'USD Tether (USDT, ERC20)',
            status: 'NOVERIFIED',
          },
        ],
      },
    },
    urlImage: {
      path: '',
      src: '/assets/UI/iconBackgroundRetiro.svg',
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.02,
        height: '90%',
        width: '50%',
      },
    },
    style: {},
    dataTableProps: {},
    columnProps: {
      body: (value): ReactNode => {
        return (
          <div className='flex flex-row items-center gap-x-[0.15rem]'>
            {CreateIcon({
              icon: value === 'VERIFIED' ? iconVerify : iconNotVerify, imageProps: {
                alt: 'iconVerify',
                src: '',
                width: 18,
                height: 18
              }
            })}
          </div>
        )
      },
      pt: {
        headerCell: {
          className: 'border-[1px] border-[#2E8E9E] border-l-0 border-r-0 first:border-l-[1px] last:border-r-[1px]',
        },
        headerContent: {
          className: 'flex justify-center text-white text-[1rem] font-[300] p-[0.3rem]',
        },
        bodyCell: {
          className:
            'relative end-0 border-[1px] border-[#2E8E9E] border-l-0 border-r-0 first:border-l-[1px] last:border-r-[1px] bg-transparent text-white text-center font-[300] p-[2rem_0.5rem_0_0.5rem]',
        },
      },
    },
    pagination: {
      paginationProps: {},
      first: 0,
      setFirst: () => 0,
      totalPages: 0,
      setTotalPages: () => 0,
    },
    onCustomChange: () => { },
    styleCustom: ['p-datatable'],
  });
  const [expanded, setExpanded] = useState(false);

  const [cardData, setCardData] = useState<ICardBodyCustom[][]>([[]]);

  const calendarInpt = () => {
    const props: calendarProps = {
      inputStyle: {
        background: '#287E8C',
        border: 'none',
        height: '35px',
        width: '100%',
        fontSize: '9px',
        borderRadius: '5px',
      },
      placeholder: 'Ej: 22 junio 2023',
      value: date,
      onChange: (e: CalendarChangeEvent) => {
        setDate(e.value || null);
      },
      showIcon: false,
      showButtonBar: true,
      inputClassName: 'w-full',
      className: 'w-full',
    };

    const styleSVG: CSSProperties = {
      position: 'absolute',
      top: '50%',
      // eslint-disable-next-line react-hooks/rules-of-hooks
      right: `${useMediaQuery('(max-width: 1024px)') ? '-1%' : '5px'}`,
      margin: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '20px',
      maxHeight: '20px',
    };
    return (
      <div
        className={twMerge(
          expanded ? 'w-[160px] transition-[width] ease-linear lg:w-[180px]' : 'w-[0] transition-[width] delay-[0.17s] ease-linear',
          'overflow-hidden'
        )}>
        {expanded && (
          <>
            <span className="p-input-icon-right" style={{ width: '95%' }}>
              <Calendar {...props} />
              <SVGComponent path={'UI'} src={'iconCalendar'} style={styleSVG}></SVGComponent>
            </span>
          </>
        )}
      </div>
    );
  };

  const imageTitle: IUrlImage = {
    path: 'UI',
    src: 'iconBack',
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      margin: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '75%',
      height: '75%',
    },
  };
  const calendarButton: IButtonUI = {
    title: '',
    urlImage: {
      src: 'iconSearch',
      path: 'UI',
      style: {
        position: 'absolute',
        top: '60%',
        left: '50%',
        margin: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '50px',
        height: '50px',
      },
    },
    buttonProps: {
      onKeyDown: (event: any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (isExtended) {
            dispatch(toogleExtendedMenu());
          }
          setExpanded(!expanded);
        }
      },
      className: `${expanded ? 'w-[240px]' : 'w-[58px]'} border-0 md:border-2 bg-[#2e8e9e]`,
    },
    children: calendarInpt(),
    onClickHanbdlerButtonUI: (e: any) => {
      e.preventDefault();
      if (isExtended) {
        dispatch(toogleExtendedMenu());
      }
      setExpanded(!expanded);
    },
    expanded: expanded,
    styleClassname: 'p-button',
  };

  const dowloadButton: IButtonUI = {
    title: '',
    urlImage: {
      src: !table.data.body.count || loading ? 'iconDonwloadDisabled' : 'iconDonwload',
      path: 'UI',
      style: {
        position: 'absolute',
        top: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '50%'}`,
        left: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '50%'}`,
        margin: 'auto',
        transform: 'translate(-50%, -50%)',
        maxWidth: '42px',
        maxHeight: '42px',
        visibility: `${loading ? 'hidden' : 'visible'}`,
      },
    },
    buttonProps: {
      style: {
        height: '56px',
        background: !table.data.body.count || loading ? '#D8D8D8' : ' #2E8E9E',
      },
      className: 'w-[58px] border-0 md:border-2 md:border-white rounded-2xl',
      disabled: !table.data.body.results.length,
      loading: loading,
      loadingIcon: <SVGComponent path="UI" src="iconSpinner" className="animate-spin"></SVGComponent>,
    },
    styleClassname: 'borde-0',
    onClickHanbdlerButtonUI: () => {
      try {
        const { mutateAsync } = donwloadService;
        const newParams = {
          object_date: params.object_date ? params.object_date : null,
          operation_area: params.operation_area,
        };
        setTimeout(async () => {
          setLoading(true);
          const response = await mutateAsync(newParams); // Esperar a que la mutación se complete
          if (response.data) {
            const blob = new Blob([response.data]);
            const a = document.createElement('a');
            a.download = `Historial de balance ${getDateCutomeString(new Date(), 'desktop')}.csv`;
            a.href = URL.createObjectURL(blob);
            const clickEvt = new MouseEvent('click', {
              view: window,
              bubbles: true,
              cancelable: true,
            });
            a.dispatchEvent(clickEvt);
            a.remove();
            setLoading(false);
          }
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    },
  };
  const updateDataTable = (data: IResponseBalanceTypeOperation) => {
    if (data.results.length) {
      const updatedBody = data.results.map((item: any) => ({
        ...item,
        transaction_date: getDateCutomeString(item.transaction_date, 'desktop'),
      }));
      setTable((prevTable) => ({
        ...prevTable,
        dataTableProps: {
          ...prevTable.dataTableProps,
        },
        data: {
          ...prevTable.data,
          body: {
            ...data,
            count: data.count ? data.count : 0,
            results: updatedBody,
          },
        },
        pagination: {
          first: 0,
          setFirst: () => 0,
          totalPages: data.count ? data.count : 1,
          setTotalPages: () => (data.count ? data.count : 1),
          paginationProps: {},
        },
      }));
    }
  };

  const onChangePage = async (event: any) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: event.page + 1,
    }));
  };

  const showCustomButtonUI = (array: IButtonUI[]) => {
    return array.map((button, index) => (
      <ButtonUI
        key={index}
        title={button.title}
        urlImage={button.urlImage}
        onClickHanbdlerButtonUI={button.onClickHanbdlerButtonUI}
        buttonProps={button.buttonProps}
        styleClassname={button.styleClassname}
        // eslint-disable-next-line react/no-children-prop
        children={button.children}
      />
    ));
  };

  const getDataCardMobile = (table: IResponseBalanceTypeOperation): void => {
    const arraykeys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]> = table.results.length
      ? (Object.keys(table.results[0]) as Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>)
      : [];

    const arrayCardStructure: ICardBodyCustom[] = [
      {
        dividerParent: 1,
        htmlCustomParent: 'div',
        className: 'w-[60%] flex flex-col gap-y-[0.3rem] ml-2 justify-center',
        body: [
          {
            htmlCustomElementType: 'span',
            classNames: 'flex items-startw text-[15px] font-[400] leading-none',
            style: {},
            value: '',
            order: '1',
            fieldfind: 'transaction_date',
          },
          {
            htmlCustomElementType: 'span',
            classNames: 'flex items-startw text-[11px] font-[400] leading-none',
            style: {},
            value: '',
            order: '2',
            fieldfind: 'wallet_network',
          },
          {
            htmlCustomElementType: 'span',
            classNames: 'flex justify-start items-end text-[11px] font-[400] leading-none',
            style: {},
            value: '',
            order: '3',
            fieldfind: 'description',
          },
        ],
      },
      {
        htmlCustomParent: 'div',
        dividerParent: 2,
        className: 'flex-1 flex flex-col items-end mr-2 gap-y-1 justify-center leading-[1]',
        body: [
          {
            htmlCustomElementType: 'children',
            classNames: 'flex font-[400] text-[8px] text-[0.8rem] leading-none',
            style: {},
            value: `${table.results.length ? 'Balance' : ''}`,
            order: '1',
            fieldfind: 'status',
            children: (value): ReactNode => {
              return (
                <div className='flex flex-row items-center gap-x-[0.15rem]'>
                  <span className='text-[0.7rem]'>Estado:</span>
                  {CreateIcon({
                    icon: value === 'VERIFIED' ? iconVerify : iconNotVerify, imageProps: {
                      alt: 'iconVerify',
                      src: '',
                      width: 18,
                      height: 18
                    }
                  })}
                </div>
              )
            }
          },
          {
            htmlCustomElementType: 'span',
            classNames: 'flex items-start font-[400] text-[16px] leading-none',
            style: {},
            value: '',
            order: '2',
            fieldfind: 'amount',
          },
        ],
      },
    ];

    const dataCard: IResponseBalanceTypeOperation = !table.results.length ? createEmptyRowArrayCustom(5, table) : table;
    return setDataCardMobile(dataCard, arrayCardStructure, arraykeys, !table.results.length ? true : false);
  };

  const setDataCardMobile = (
    dataCard: IResponseBalanceTypeOperation,
    arrayStructure: ICardBodyCustom[],
    arrayKeys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>,
    showMessage: boolean
  ): void => {
    const divCard = document.getElementById('card-ui');
    const divEmptyExist = document.getElementById('empty-card');

    if (!divEmptyExist && showMessage) {
      const propietariesDiv = {
        id: 'empty-card',
        style: {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          top: '0.8rem',
          fontSize: '1.2rem',
          color: 'white',
        },
        innerText: 'No se Encontraron Resultados',
      } as HTMLDivElement;
      createDivTextEmptyData(propietariesDiv, divCard as HTMLDivElement);
    }

    if (!showMessage) {
      divEmptyExist?.remove();
    }

    const result = buildArrayResultCard(dataCard, arrayStructure, arrayKeys);
    setCardData(result);
  };

  const childrenButton = () => {
    return (
      <>
        <div className="flex flex-1 flex-row justify-start gap-x-4 pl-6">
          <ButtonUI
            title={dowloadButton.title}
            urlImage={dowloadButton.urlImage}
            onClickHanbdlerButtonUI={dowloadButton.onClickHanbdlerButtonUI}
            buttonProps={dowloadButton.buttonProps}
            styleClassname={dowloadButton.styleClassname}
            // eslint-disable-next-line react/no-children-prop
            children={dowloadButton.children}
          />
          <ButtonUI
            title={calendarButton.title}
            urlImage={calendarButton.urlImage}
            onClickHanbdlerButtonUI={calendarButton.onClickHanbdlerButtonUI}
            buttonProps={calendarButton.buttonProps}
            styleClassname={calendarButton.styleClassname}
            // eslint-disable-next-line react/no-children-prop
            children={calendarButton.children}
          />
        </div>
      </>
    );
  };

  const headerTable = () => {
    return (
      <div className=" flex h-[58px] w-full flex-row items-center justify-center bg-[#2E8E9E]">
        <span className="w-full text-center text-xl font-bold text-white md:w-[55%] md:text-right">TRANSACCIONES</span>
        {!useMobile && childrenButton()}
      </div>
    );
  };

  useEffect(() => {
    if (!updateTable) {
      updateDataTable(table.data.body);
      setUpdateTable(true);
    }
  }, []);

  useEffect(() => {
    useMobile && getDataCardMobile(table.data.body);
  }, [updateTable]);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (isExtended) {
          dispatch(toogleExtendedMenu());
        }
        setExpanded(!expanded);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [expanded]);

  useEffect(() => {
    if (isExtended && expanded) {
      setExpanded(false);
    }
  }, [isExtended, expanded]);

  useEffect(() => {
    if (data?.results.length) {
      updateDataTable(data);
      useMobile && getDataCardMobile(data);
    }
  }, [data]);

  useEffect(() => {
    setTable((prevTable) => ({
      ...prevTable,
      dataTableProps: {
        loading: isLoading, // El loading de la tabla se establece según el estado actual de isLoading
      },
    }));
  }, [isLoading]);

  useEffect(() => {
    setTable((prevTable) => ({
      ...prevTable,
      pagination: {
        first: 0,
        setFirst: () => 0,
        totalPages: 10,
        setTotalPages: () => 1,
        paginationProps: {},
      },
    }));
  }, [isError]);

  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      object_date: date ? getDateISO(date as string) : null,
      page: '1',
    }));
  }, [date]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-6">
      {useIsMobile() ? (
        <>
          <div className="mt-5 flex h-[45px] w-full flex-row justify-center md:h-[54px]">
            <TitleUI
              title={'TRANSACIONES'}
              urlImage={imageTitle}
              transparent
              onClickHandler={{
                buttonTitle: undefined,
                buttonBack: () => {
                  router.push('/admin/cofounder');
                },
              }}
              className={`relative flex w-full flex-row ${(expanded && useTablet) ? 'justify-start' : 'justify-center'
                } justify-items-stretch text-center`} />
          </div>
          <div className='flex flex-col gap-y-2 w-full items-center'>
            <CardUI
              data={table.data}
              onCustomChange={onChangePage}
              style={table.style}
              styleCustom={table.styleCustom}
              pagination={table.pagination}
              urlImage={table.urlImage}
              dataTableProps={{}}>
              {child(cardData, `flex h-[70px] flex-row rounded-xl bg-[#1F222B] text-[#FFF] items-center`)}
            </CardUI>

            {isLoading && (
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            )}

            <div className="flex flex-row justify-center gap-5">{showCustomButtonUI([calendarButton, dowloadButton])}</div>
          </div>
        </>
      ) : (
        <TableCustomUI
          data={table.data}
          urlImage={table.urlImage}
          style={table.style}
          dataTableProps={{ ...table.dataTableProps, header: headerTable }}
          columnProps={table.columnProps}
          onCustomChange={onChangePage}
          styleCustom={table.styleCustom}
          pagination={table.pagination}
        />
      )}
    </div>
  );
};

Transactions.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Transactions;
