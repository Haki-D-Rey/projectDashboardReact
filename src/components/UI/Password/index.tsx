import React, { CSSProperties } from 'react';
import { IconType, classNames } from 'primereact/utils';
import { Password as PasswordInput, PasswordProps } from 'primereact/password';
import { useController } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { Control, FieldValues, Path } from 'react-hook-form';
import { useIsMobile } from '@/hooks/useMediaQuery.hook';

import useMediaQuery from '@/hooks/useMediaQuery.hook';
//get prop types of InputText
type InputTextProps = React.ComponentProps<typeof PasswordInput>;

interface IFormInput<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  showFooter?: boolean;
  rightLabel?: React.ReactNode;
  className?: string;
  RightIcon?: React.FunctionComponent<any>;
  Icon?: React.FunctionComponent<any>;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputTextProps;
  control: Control<T>;
  hideIcon?: IconType<PasswordProps> | React.FunctionComponent<any>;
  showIcon?: IconType<PasswordProps> | React.FunctionComponent<any>;
  style?: {
    [name: string]: CSSProperties | string;
  };
}

const Password = <T extends FieldValues>({
  name,
  control,
  label,
  rightLabel,
  showFooter,
  labelProps,
  inputProps,
  RightIcon,
  Icon,
  hideIcon,
  showIcon,
  style,
}: IFormInput<T>) => {
  const { field, fieldState } = useController({ name, control });
  const footer = (
    <>
      <hr className="my-2" />
      <p className="mt-2">Sugerencias:</p>
      <ul className="line-height-2 ml-2 mt-0 pl-2">
        <li>Al menos una minúscula</li>
        <li>Al menos una mayúscula</li>
        <li>Al menos un número</li>
        <li>Minimo 8 caracteres</li>
      </ul>
    </>
  );

  const [isDesktop, isMobile] = [useMediaQuery('(max-width: 1920px)'), useMediaQuery('(max-width: 1024px)')];

  return (
    <div className={twMerge('flex flex-col justify-between', inputProps?.className)}>
      {label && (
        <label {...labelProps} htmlFor={field.name} className={classNames({ 'p-error': fieldState.error })}>
          {label}
        </label>
      )}
      <span className={classNames({ 'p-input-icon-left': Icon, 'p-input-icon-right': RightIcon })}>
        {Icon && <Icon />}
        <PasswordInput
          toggleMask
          footer={showFooter ? footer : undefined}
          {...inputProps}
          promptLabel="Ingrese una contraseña"
          weakLabel="Poco segura"
          mediumLabel="Casi segura"
          strongLabel="Segura"
          id={field.name}
          value={field.value || ''}
          className={'w-full ' + inputProps?.className}
          onChange={(e) => field.onChange(e.target.value)}
          inputStyle={Icon ? { paddingLeft: isMobile ? '3.5rem' : '4rem', fontSize: isMobile ? '1rem' : '1.4rem' } : undefined}
          inputClassName={classNames({ 'p-invalid': fieldState.error }) + ` ${style ? style.inputClassName : ''}`}
          hideIcon={hideIcon}
          showIcon={showIcon}
        />
        {RightIcon && <RightIcon />}
      </span>
      <small className="p-error w-full text-left">{fieldState.error?.message}</small>
    </div>
  );
};

export default Password;
