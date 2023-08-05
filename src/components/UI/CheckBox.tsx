import React, { ReactElement, useEffect } from 'react';

import { classNames } from 'primereact/utils';
import { Checkbox } from 'primereact/checkbox';

import { twMerge } from 'tailwind-merge';
import { useController } from 'react-hook-form';

import type { Control, FieldValues, Path } from 'react-hook-form';

//get prop types of InputText
type InputTextProps = React.ComponentProps<typeof Checkbox>;

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label?: React.ReactNode;
  rightLabel?: React.ReactNode;
  className?: string;
  RightIcon?: React.FunctionComponent<any>;
  Icon?: React.FunctionComponent<any>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputTextProps;
  control: Control<T>;
}
//FC<IFormInput>
const PrimeCheckBox = <T extends FieldValues>({
  name,
  control,
  label,
  rightLabel,
  labelProps,
  inputProps,
  RightIcon,
  Icon,
  className,
}: IFormInput<T>) => {
  const { field, fieldState } = useController({ name, control });

  useEffect(() => {
    const checkboxBox: HTMLElement | null = document.querySelector('.p-checkbox-box');

    if (checkboxBox !== null) {
      // Aquí puedes utilizar la constante checkboxBox y TypeScript sabrá que es de tipo HTMLElement
      checkboxBox.style.border = '2px solid #2E8E9E';
    }
  }, []);

  return (
    <div className={twMerge('flex flex-col justify-between', inputProps?.className, className)}>
      <div className="flex items-center gap-2">
        <Checkbox
          {...inputProps}
          inputId={field.name}
          checked={field.value}
          inputRef={field.ref}
          className={classNames({ 'p-invalid': fieldState.error })}
          onChange={(e) => field.onChange(e.checked)}
        />
        {label && (
          <label {...labelProps} htmlFor={field.name} className={classNames({ 'p-error': fieldState.error })}>
            {label}
          </label>
        )}
      </div>

      <small className="p-error">{fieldState.error?.message}</small>
    </div>
  );
};

export default PrimeCheckBox;
