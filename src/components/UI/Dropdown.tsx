import React, { CSSProperties } from 'react';
import { classNames } from 'primereact/utils';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { Control, FieldValues, Path } from 'react-hook-form';

//get prop types of AutoComplete
type DropdownProps = React.ComponentProps<typeof Dropdown>;

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  rightLabel?: React.ReactNode;
  className?: string;
  RightIcon?: React.FunctionComponent<any>;
  Icon?: React.FunctionComponent<any>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  dropdownProps?: DropdownProps;
  control: Control<T>;
  onCustomChange?: (selectedValue: DropdownChangeEvent) => void | Promise<void>;
  styleSpan?: CSSProperties;
}
//FC<IFormInput>
const PrimeDropdown = <T extends FieldValues>({
  name,
  control,
  label,
  rightLabel,
  labelProps,
  dropdownProps,
  RightIcon,
  Icon,
  className,
  onCustomChange,
  styleSpan,
}: IFormInput<T>) => {
  const { field, fieldState } = useController({ name, control });

  const handleDropdownChange = (event: DropdownChangeEvent) => {
    const selectedValue = event;

    if (onCustomChange) {
      onCustomChange(selectedValue);
    }

    field.onChange(event);
  };

  return (
    <div className={twMerge('flex flex-col justify-between', className)}>
      {label && (
        <label {...labelProps} htmlFor={field.name} className={classNames({ 'p-error': fieldState.error })}>
          {label}
        </label>
      )}
      <span className={twMerge(classNames({ 'p-input-icon-left': Icon, 'p-input-icon-right': RightIcon }, className))} style={styleSpan}>
        {Icon && <Icon />}
        <Dropdown
          {...dropdownProps}
          inputRef={field.ref}
          inputId={field.name}
          value={field.value}
          onChange={handleDropdownChange}
          className={twMerge(classNames({ 'p-invalid': fieldState.error }) + ' w-full', dropdownProps?.className)}
        />
        {RightIcon && <RightIcon />}
      </span>
      <small className="p-error">{fieldState.error?.message}</small>
    </div>
  );
};

export default PrimeDropdown;
