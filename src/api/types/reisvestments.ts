import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Control, FieldValues, Path } from 'react-hook-form';

//get prop types of AutoComplete
type DropdownTextProps = React.ComponentProps<typeof Dropdown>;
type InputTextProps = React.ComponentProps<typeof InputText>;


type TypeComponent<T extends FieldValues> = {
    type: 'input';
    props: InputTextProps;
    name: any;
    label?: string;
    rightLabel?: React.ReactNode;
    className?: string;
    RightIcon?: React.FunctionComponent<any>;
    Icon?: React.FunctionComponent<any>;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    control: Control<T>
  } | {
    type: 'dropdown';
    props: DropdownTextProps;
    name: any;
    label?: string;
    rightLabel?: React.ReactNode;
    className?: string;
    RightIcon?: React.FunctionComponent<any>;
    Icon?: React.FunctionComponent<any>;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    control: Control<T>
    onCustomChange?: (selectedValue: DropdownChangeEvent) => void | Promise<void>;
  }
  |
  {
    type: 'QR'
  };

  
  export interface IStructureFormComponent<T extends FieldValues> {
    components: TypeComponent<T>[];
    sideNumberGridCol: number;
  }
