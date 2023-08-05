import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { CSSProperties, ReactNode } from 'react';
import { IResponseBalanceTypeOperation } from './transaction';
import { Paginator } from 'primereact/paginator';
import { Column } from 'primereact/column';

export interface IUrlImage {
  path: string;
  src: string;
  style: CSSProperties;
}
export interface ITableUI {
  data: ITablaData;
  urlImage: IUrlImage;
  style: CSSProperties;
  dataTableProps: DataTableProps;
  columnProps?: ColumnProps;
}

export interface ITablaData {
  header: ITablaHeader[];
  body: IResponseBalanceTypeOperation;
}

interface ITablaHeader {
  field: string;
  header: string;
}

export interface ITitleUI {
  title: string;
  urlImage: IUrlImage;
  onClickHandler?: IButtonEvent | undefined;
  transparent?: boolean;
  className?: string;
  children?: ReactNode;
}

export interface IButtonEvent {
  buttonBack: (() => React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> | void) | undefined;
  buttonTitle: (() => React.MouseEventHandler<HTMLButtonElement | HTMLDivElement> | void) | undefined;
}

//get prop types of InputText
type ButtonProps = React.ComponentProps<typeof Button>;
export interface IButtonUI extends ITitleUI {
  buttonProps: ButtonProps;
  styleClassname: string;
  onClickHanbdlerButtonUI: ((e: any) => void) | undefined;
  children?: React.ReactNode;
  expanded?: boolean;
}

export interface ITableCustomUI extends ITableUI {
  styleCustom: string[];
  onCustomChange: (selectedValue: any) => void;
  pagination?: {
    paginationProps: PaginationProps | {};
    first: number;
    setFirst: (value: number) => void;
    totalPages: number;
    setTotalPages: (value: number) => void;
  };
}

type DataTableProps = React.ComponentProps<typeof DataTable>;
type ColumnProps = React.ComponentProps<typeof Column>;
type PaginationProps = React.ComponentProps<typeof Paginator>;
export interface ICustomHerders {
  title?: string;
  pathDividerContent: IPathDividerContent;
}

export interface IPathDividerContent {
  firstPath: IFirstPathContent;
  secondPath: ISecondPathContent;
}

export interface IFirstPathContent {
  title: string;
  content: string;
}

export interface ISecondPathContent {
  arrayButton: IButtonUI[] | [];
  classDivParent: string;
  classDivChildren: string;
}

export interface ICardUI extends ITableCustomUI {
  children?: React.ReactNode;
}


export interface ICardBodyCustom {
  body: IBodyCardDetails[];
  htmlCustomParent?: string;
  className?: string;
  dividerParent?: number
}

export interface IBodyCardDetails {
  htmlCustomElementType: string;
  order: string | '';
  classNames: string | '';
  style: CSSProperties | {};
  value: string;
  fieldfind: string | 'customfield';
}