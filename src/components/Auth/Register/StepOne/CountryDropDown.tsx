import React, { FC } from 'react';

import Image from 'next/image';
import { MdOutlinePublic } from 'react-icons/md';
import PrimeDropdown from '@/components/UI/Dropdown';
import countries from './countries';

import type { Control } from 'react-hook-form';
import type { RegisterFormStepOneType } from '@/utils/validators/register';
import { Dropdown } from 'primereact/dropdown';

type DropdownProps = React.ComponentProps<typeof Dropdown>;
interface ICountry {
  name: string;
  code: string;
}

interface ICountryDropDownProps {
  control: Control<RegisterFormStepOneType>;
  props: DropdownProps;
}

const CountryDropDown: FC<ICountryDropDownProps> = ({ control, props }) => {
  const selectedCountryTemplate = (option: ICountry, props: any) => {
    if (option) {
      //
      const flagName = option.name.replace(/ /g, '-');
      return (
        <div className="flex items-center gap-3">
          <div>
            <Image
              alt={option.name}
              src={`https://sciencekids.co.nz/images/pictures/flags680/${flagName}.jpg`}
              width={18}
              height={10}
              loader={({ src }) => src}
            />
          </div>

          <div>{option.name}</div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3 text-[12px] md:text-[18px]">
        <MdOutlinePublic />
        {props.placeholder}
      </div>
    );
  };

  const countryOptionTemplate = (option: ICountry) => {
    const flagName = option.name.replace(/ /g, '-');
    return (
      <div className="flex items-center gap-3">
        <div>
          <Image
            alt={option.name}
            src={`https://sciencekids.co.nz/images/pictures/flags680/${flagName}.jpg`}
            width={18}
            height={10}
            loader={({ src }) => src}
          />
        </div>

        <div className="text-[12px] md:text-[18px]">{option.name}</div>
      </div>
    );
  };

  return (
    <PrimeDropdown
      Icon={MdOutlinePublic}
      name="country"
      control={control}
      dropdownProps={{
        type: 'text',
        optionLabel: 'name',
        optionValue: 'code',
        itemTemplate: countryOptionTemplate,
        valueTemplate: selectedCountryTemplate,
        placeholder: 'Selecciona tu país',
        options: countries,
        ...props,
      }}
    />
  );
};

export default CountryDropDown;
