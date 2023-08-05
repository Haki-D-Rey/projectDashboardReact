import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';


interface InputProfileProps <T extends FieldValues> {
    name: Path<T>;
    label: string;
    defaultValue: string | undefined;
    control: Control<T>;
    type: string;
}

const InputProfile = <T extends FieldValues>({
  name, label, defaultValue, control, type
}: InputProfileProps<T>)  => {

  const { field, fieldState } = useController({ name, control});

  return (
    <div className="flex w-auto flex-col gap-2 text-white ">
      <label className='font-bold  lg:text-lg xl:text-xl '>{label}</label>
      <input 
        className="lg:text-[16px] xl:text-lg w-[70%] text-gray-400 rounded-lg focus:outline focus:outline-tertiary bg-primary py-1 lg:px-4 text-[16px] xl:text-[17px] font-normal 2xl:py-2 2xl:-mt-1" 
        type={type}
         {...field} 
        />
      <small className='text-red-500'>{fieldState.error?.message}</small>
    </div>
  );
}

export default InputProfile;