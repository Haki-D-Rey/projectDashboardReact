import React from 'react';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { Control, FieldValues, Path } from 'react-hook-form';
import useMediaQuery from '@/hooks/useMediaQuery.hook';

//get prop types of InputText
type InputTextProps = React.ComponentProps<typeof InputText>;

export interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  rightLabel?: React.ReactNode;
  className?: string;
  RightIcon?: React.FunctionComponent<any>;
  typeIcon?: number;
  Icon?: string | React.FunctionComponent<any>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputTextProps;
  control: Control<T>;
}
const Input = <T extends FieldValues>({ name, control, label, rightLabel, labelProps, inputProps, RightIcon, Icon, className }: IFormInput<T>) => {
  const { field, fieldState } = useController({ name, control });
  const [isDesktop, isMobile] = [useMediaQuery('(max-width: 1920px)'), useMediaQuery('(max-width: 1024px)')];

  return (
    <div className={twMerge('flex flex-col justify-between', className)}>
      {label && (
        <label {...labelProps} htmlFor={field.name} className={classNames({ 'p-error': fieldState.error })}>
          {label}
        </label>
      )}
      <span className={classNames({ 'p-input-icon-left': Icon, 'p-input-icon-right': RightIcon }) + ' drop-shadow-lg'}>
        {Icon && <Icon />}
        <InputText
          {...inputProps}
          id={field.name}
          value={field.value || ''}
          className={twMerge(classNames({ 'p-invalid': fieldState.error }) + ' w-full ', inputProps?.className)}
          onChange={(e) => {
            field.onChange(e.target.value);
          }}
        />
        {RightIcon && <RightIcon />}
      </span>
      <small className="p-error w-full text-left">{fieldState.error?.message}</small>
    </div>
  );
};

export default Input;
