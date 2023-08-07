import React, { CSSProperties, FC, ReactElement, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import type { NextPageWithLayout } from '@/pages/_app';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

//Prime React
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { ProgressSpinner } from 'primereact/progressspinner';

//Interface  UI
import { IButtonUI, ICardBodyCustom, ICustomHerders, ITableCustomUI, IUrlImage } from '@/api/types/UI';
import { IQueryBalanceTypeOperation, IResponseBalanceTypeOperation, ResultKeysMap } from '@/api/types/transaction';

//Utils
import { createDivTextEmptyData, createEmptyRowArrayCustom, getDateCutomeString, getDateISO } from '@/utils/tools/utils';
import { twMerge } from 'tailwind-merge';
import useMediaQuery, { useIsMobile } from '@/hooks/useMediaQuery.hook';

//Custom props
import TableCustomUI from '@/components/UI/TableUI';
import TitleUI from '@/components/UI/TitleUI';
import WithdrawalModal from '@/components/Withdrawals/WithdrawalModal';
import ReinvestmentsModal from '@/components/Reinvestments/ReinvestmentsModal';
import CustonHerdersUI from '@/components/UI/CustomHeader';

import ButtonUI from '@/components/UI/Button';
import SVGComponent from '@/components/UI/SvgFC';
import CardUI from '@/components/UI/CardUI';

//Services
import { useGetQueryBalanceTypeOperation } from '@/api/hooks/queries/transaction.hook';
import { getBalanceTypeOperationDonwload } from '@/api/endpoints/transactions';
import { getExtendedMenu, toogleExtendedMenu } from '@/redux/features/appSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hook';

type calendarProps = React.ComponentProps<typeof Calendar>;

const TradingPlans: NextPageWithLayout = () => {
  const router = useRouter();
  const [useMobile, useDesktop] = [useIsMobile(), useMediaQuery('(max-width: 1280px)')];
  const dispatch = useAppDispatch();
  const isExtended = useAppSelector(getExtendedMenu);

  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showReinvestmentsModal, setShowReinvestmentsModal] = useState(false);
  const [params, setParams] = useState<IQueryBalanceTypeOperation>({
    operation_area: 'trading',
    page: '1',
  });
  const [date, setDate] = useState<string | Date | Date[] | null>(null);
  const { data, isLoading } = useGetQueryBalanceTypeOperation(params);
  const donwloadService = useMutation(getBalanceTypeOperationDonwload);
  const [loading, setLoading] = useState<boolean>(false);
  const [table, setTable] = useState<ITableCustomUI>({
    data: {
      header: [
        { field: 'object_date', header: 'Fecha' },
        { field: 'description', header: 'Detalle' },
        { field: 'amount', header: 'Monto' },
        { field: 'related_balance_post_operation', header: 'Balance' },
      ],
      body: {
        count: 0,
        next: '',
        previous: '',
        results: [],
      },
    },
    urlImage: {
      path: '',
      src: '/assets/UI/iconBackgroundTrading.svg',
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
    pagination: {
      paginationProps: {},
      first: 0,
      setFirst: () => 0,
      totalPages: 0,
      setTotalPages: () => 0,
    },
    onCustomChange: () => { },
    styleCustom: ['p-datatable', 'p-datatable-tbody-transparent', 'p-datatable-thead'],
  });
  const [expanded, setExpanded] = useState(false);
  // const calendarRef = useRef<Calendar>(null);

  const [cardData, setCardData] = useState<ICardBodyCustom[]>([
    {
      body: [
        {
          htmlCustomElementType: 'span',
          classNames: 'ml-[1rem] flex items-end text-[15px] font-[400] leading-none',
          style: {},
          value: '',
          order: '1',
          fieldfind: 'object_date',
        },
        {
          htmlCustomElementType: 'span',
          classNames: 'ml-[1rem] flex items-start font-[400] text-[12px] text-[0.8rem] leading-[1.8]',
          style: {},
          value: '',
          order: '3',
          fieldfind: 'description',
        },
        {
          htmlCustomElementType: 'span',
          classNames: 'flex justify-end mr-[1rem] items-end text-[11px] font-[400] leading-none',
          style: {},
          value: '',
          order: '2',
          fieldfind: 'customField',
        },
        {
          htmlCustomElementType: 'span',
          classNames: 'flex justify-end mr-[1rem] items-start text-[15px] font-[400] leading-[1.4]',
          style: {},
          value: '',
          order: '4',
          fieldfind: 'related_balance_post_operation',
        },
      ],
    },
  ]);

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
              <Calendar
                // ref={calendarRef} // Asociamos la referencia al componente
                {...props}
              />
              <SVGComponent path={'UI'} src={'iconCalendar'} style={styleSVG}></SVGComponent>
            </span>
          </>
        )}
      </div>
    );
  };

  const arrayListButton: IButtonUI[] = [
    {
      title: 'Invertir',
      urlImage: {
        src: 'iconReviesment',
        path: 'UI',
        style: {
          position: 'absolute',
          top: '55%',
          left: '50%',
          margin: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '48px',
          maxHeight: '48px',
        },
      },
      buttonProps: {
        style: {
          //eslint-disable-next-line react-hooks/rules-of-hooks
          width: `${useMediaQuery('(max-width: 1024px)') ? '80%' : '100%'}`,
          height: `${useIsMobile() ? '50px' : '56px'}`,
          display: 'flex',
          justifyContent: 'center',
        },
      },
      onClickHanbdlerButtonUI: () => {
        setShowReinvestmentsModal(true);
      },
      styleClassname: 'p-button',
    },
    {
      title: 'Retirar',
      urlImage: {
        src: 'iconReinv',
        path: 'UI',
        style: {
          position: 'absolute',
          top: '55%',
          left: '50%',
          margin: 'auto',
          transform: 'translate(-50%, -50%)',
          maxWidth: '48px',
          maxHeight: '48px',
        },
      },
      buttonProps: {
        style: {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          width: `${useMediaQuery('(max-width: 1024px)') ? '80%' : '100%'}`,
          height: `${useIsMobile() ? '50px' : '56px'}`,
          display: 'flex',
          justifyContent: 'center',
        },
      },
      onClickHanbdlerButtonUI: () => {
        setShowWithdrawalModal(true);
      },
      styleClassname: 'p-button',
    },
    {
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
          width: '58px',
          height: '58px',
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
        className: `${expanded ? 'w-[200px]' : 'w-[58px]'} border-0 md:border-2 md:w-[40%] lg:w-full bg-[#2E8E9E]`,
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
    },
  ];

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

  const customPropsCustomHeaders: ICustomHerders = {
    title: '',
    pathDividerContent: {
      firstPath: {
        content: '$800.00',
        title: 'Ganancias totales',
      },
      secondPath: {
        arrayButton: arrayListButton,
        classDivParent: `${useIsMobile() ? 'w-[120px] place-items-center' : 'w-[55%]'} grid grid-cols-2 md:gap-x-3 lg:w-[350px] `, //lg:w-[60%] xl:w-[50%]
        classDivChildren: `grid w-[45%] grid-cols-1 ${expanded ? 'lg:w-[50%] xl:w-[35%]' : 'lg:w-[100px]'}`,
      },
    },
  };

  const dowloadButton: IButtonUI = {
    title: '',
    urlImage: {
      src: !table.data.body.count ? 'iconDonwloadDisabled' : 'iconDonwload',
      path: 'UI',
      style: {
        position: 'absolute',
        top: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '50%'}`,
        left: `${useMediaQuery('(max-width: 1024px)') ? '50%' : '27px'}`,
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
        borderColor: 'transparent',
        background: !table.data.body.count || loading ? '#D8D8D8' : ' #2E8E9E',
      },
      className: 'w-[58px] md:w-[80%] lg:w-full md:flex-[1_1_60px] border-2 rounded-2xl',
      disabled: !table.data.body.count,
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
            a.download = `Historial de balance ${getDateCutomeString(new Date())}.csv`;
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
    const updatedBody = data.results.map((item: any) => ({
      ...item,
      amount: `$ ${item.amount}`,
      object_date: getDateCutomeString(item.object_date),
    }));
    setTable((prevTable) => ({
      ...prevTable,
      data: {
        ...prevTable.data,
        body: {
          ...data,
          count: data.count ? data.count : 1,
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

  const getDataCardMobile = (table: IResponseBalanceTypeOperation): ICardBodyCustom[] => {
    const arraykeys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]> = table.results.length
      ? (Object.keys(table.results[0]) as Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>)
      : [];

    const arrayCardStructure: ICardBodyCustom[] = [
      {
        body: [
          {
            htmlCustomElementType: 'span',
            classNames: 'ml-[1rem] flex items-end text-[15px] font-[400] leading-none',
            style: {},
            value: '',
            order: '1',
            fieldfind: 'object_date',
          },
          {
            htmlCustomElementType: 'span',
            classNames: 'mt-[0.5rem] ml-[1rem] flex items-start font-[400] text-[12px] text-[0.8rem] leading-none',
            style: {},
            value: '',
            order: '3',
            fieldfind: 'description',
          },
          {
            htmlCustomElementType: 'span',
            classNames: 'flex justify-end mr-[1rem] items-end text-[11px] font-[400] leading-none',
            style: {},
            value: table.results.length ? 'Balance' : '',
            order: '2',
            fieldfind: 'customField',
          },
          {
            htmlCustomElementType: 'span',
            classNames: 'mt-[0.2rem] flex justify-end mr-[1rem] items-start text-[15px] font-[400]',
            style: {},
            value: '',
            order: '4',
            fieldfind: 'related_balance_post_operation',
          },
        ],
      },
    ];

    const dataCard: IResponseBalanceTypeOperation = !table.results.length ? createEmptyRowArrayCustom(10, table) : table;
    return setDataCardMobile(dataCard, arrayCardStructure, arraykeys, !table.results.length ? true : false);
  };

  const setDataCardMobile = (
    data: IResponseBalanceTypeOperation,
    arrayStructure: ICardBodyCustom[],
    arrayKeys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>,
    showMessage: boolean
  ) => {
    const divCard = document.getElementById('card-ui');
    const divEmptyExist = document.getElementById('empty-card');

    if (data.results.length) {
      data.results.forEach((item: any) => {
        item.object_date = getDateCutomeString(item.object_date);
      });
    }

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

    const result: ICardBodyCustom[] = data.results.flatMap((body) => {
      return arrayStructure.map((data) => ({
        body: data.body.map((item, index) => ({
          ...item,
          value: item.fieldfind !== 'customField' && arrayKeys ? body[arrayKeys[index]] : item.value,
        })),
      }));
    });
    setCardData(result);
    return result;
  };

  const child = (data: ICardBodyCustom[]): React.ReactNode => {
    return data.map((dataItem, i) => (
      <div
        key={i}
        className="boder-2 grid h-[60px] grid-cols-2 grid-rows-2 rounded-xl bg-[#1F222B] text-[#FFF]"
        style={{
          gridTemplateColumns: '3fr 1fr',
        }}>
        {dataItem.body.map((item, j) => {
          if (item.htmlCustomElementType === 'span') {
            return (
              <span
                key={j}
                className={item.classNames}
                style={{
                  order: `${item.order}`,
                }}>
                {item.value}
              </span>
            );
          } else if (item.htmlCustomElementType === 'img') {
            return <SVGComponent key={j} path="UI" src={item.value} />;
          } else if (item.htmlCustomElementType === 'p') {
            return (
              <p key={j} className={item.classNames}>
                {item.value}
              </p>
            );
          } else {
            return null; // Add a default case or handle other types if needed
          }
        })}
      </div>
    ));
  };

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
    if (data) {
      updateDataTable(data);
      useMobile && getDataCardMobile(data);
    }
  }, [data]);

  useEffect(() => { }, [table]);

  useEffect(() => {
    setTable((prevTable) => ({
      ...prevTable,
      dataTableProps: {
        loading: isLoading, // El loading de la tabla se establece según el estado actual de isLoading
      },
    }));
  }, [isLoading]);

  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      object_date: date ? getDateISO(date as string) : null,
      page: '1',
    }));
  }, [date]);

  useEffect(() => {
    if (isExtended && expanded) {
      setExpanded(false);
    }
  }, [isExtended, expanded]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 md:gap-6">
      <div className="flex-ro mt-5 flex w-full">
        <TitleUI
          title="BALANCE DE TRADING PLANS"
          urlImage={imageTitle}
          transparent
          onClickHandler={{
            buttonTitle: undefined,
            buttonBack: () => {
              router.push('/welcome');
            },
          }}
          className={`relative flex w-full flex-row ${(useDesktop && isExtended && !useMobile) || (expanded && useDesktop) ? 'justify-start' : 'justify-center'
            } justify-items-stretch text-center`}
        />
        {!useIsMobile() && showCustomButtonUI([dowloadButton])}
      </div>
      {useIsMobile() ? (
        <>
          {CustonHerdersUI({ ...customPropsCustomHeaders })}
          <CardUI
            data={table.data}
            onCustomChange={onChangePage}
            style={table.style}
            styleCustom={table.styleCustom}
            pagination={table.pagination}
            urlImage={table.urlImage}
            dataTableProps={{}}>
            {child(cardData)}
          </CardUI>

          {isLoading && (
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
          )}

          <div className="flex flex-row justify-center gap-5">
            {showCustomButtonUI([...arrayListButton.filter((child) => !!child.children), dowloadButton])}
          </div>
        </>
      ) : (
        <TableCustomUI
          data={table.data}
          urlImage={table.urlImage}
          style={table.style}
          dataTableProps={{
            ...table.dataTableProps,
            header: CustonHerdersUI({ ...customPropsCustomHeaders }),
          }}
          onCustomChange={onChangePage}
          styleCustom={table.styleCustom}
          pagination={table.pagination}
        />
      )}

      {showWithdrawalModal && <WithdrawalModal visible={showWithdrawalModal} setVisible={setShowWithdrawalModal} type="normal" />}
      {showReinvestmentsModal && <ReinvestmentsModal visible={showReinvestmentsModal} setVisible={setShowReinvestmentsModal} />}
    </div>
  );
};

TradingPlans.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default TradingPlans;
