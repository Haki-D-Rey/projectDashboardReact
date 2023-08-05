import React from 'react';

import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

import { twMerge } from 'tailwind-merge';
import { classNames } from 'primereact/utils';
import { useController } from 'react-hook-form';

import type { Control, FieldValues, Path } from 'react-hook-form';

//get prop types of InputText
type InputTextProps = React.ComponentProps<typeof Calendar>;

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  rightLabel?: React.ReactNode;
  className?: string;
  RightIcon?: React.FunctionComponent<any>;
  Icon?: React.FunctionComponent<any>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputTextProps;
  control: Control<T>;
}

const DateInput = <T extends FieldValues>({ name, control, label, rightLabel, labelProps, inputProps, RightIcon, Icon }: IFormInput<T>) => {
  const { field, fieldState } = useController({ name, control });

  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
    today: 'Hoy',
    clear: 'Limpiar',
  });

  return (
    <div className={twMerge('flex flex-col justify-between', inputProps?.className)}>
      {label && (
        <label {...labelProps} htmlFor={field.name} className={classNames({ 'p-error': fieldState.error })}>
          {label}
        </label>
      )}
      <span className={classNames({ 'p-input-icon-left': Icon, 'p-input-icon-right': RightIcon })}>
        {Icon && <Icon />}
        <Calendar
          locale="es"
          {...inputProps}
          id={field.name}
          value={field.value}
          className={classNames({ 'p-invalid': fieldState.error }) + ' w-full'}
          onChange={(e) => field.onChange(e.target.value)}
        />
        {RightIcon && <RightIcon />}
      </span>
      <small className="p-error w-full text-left">{fieldState.error?.message}</small>
    </div>
  );
};

export default DateInput;
