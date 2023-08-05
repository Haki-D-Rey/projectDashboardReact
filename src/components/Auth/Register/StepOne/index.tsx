import React, { FC, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from 'primereact/button';
import Input from '@/components/UI/Input';

import { registerFormStepOneSchema, RegisterFormStepOneType } from '@/utils/validators/register';

import useMediaQuery, { useIsMobile } from '@/hooks/useMediaQuery.hook';
import PrimeDropdown from '@/components/UI/Dropdown';
import { useQueryGetContriesUniversal } from '@/api/hooks/queries/external';
import { IGetContriesUniversalListStates, IGetUniversalListContries, IParamsSearch } from '@/api/types/external';
import { SelectItemOptionsType } from 'primereact/selectitem';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { getStatesUniversal } from '@/api/endpoints/external';
import { animationStep } from '@/utils/tools/utils';

interface IStepOneProps {
  values?: RegisterFormStepOneType;
  handleChange: (data: RegisterFormStepOneType) => void;
}

const StepOne: FC<IStepOneProps> = ({ values, handleChange }) => {
  const { control, handleSubmit, formState } = useForm<RegisterFormStepOneType>({
    resolver: zodResolver(registerFormStepOneSchema),
    defaultValues: values,
  });

  const { data } = useQueryGetContriesUniversal();
  const [contries, setContries] = useState<SelectItemOptionsType>([]);
  const [cities, setCities] = useState<SelectItemOptionsType>([]);

  const [useMobile, useDesktop, UseTableOrDesktop] = [useIsMobile, useMediaQuery('(min-width: 1280px)'), useMediaQuery('(max-width: 1280px)')];

  const fetchDataCities = async (params: IParamsSearch) => {
    const response = await getStatesUniversal(params);
    if (response) {
      const SelectItem: SelectItemOptionsType = response.map((data: IGetContriesUniversalListStates) => ({
        label: data.state_name,
        value: data.state_name,
      }));
      setCities(SelectItem);
    }
  };
  const onSelectContries = async (event: DropdownChangeEvent): Promise<void> => {
    const params: IParamsSearch = {
      name: event.value,
      typeSearch: 'states',
    };
    await fetchDataCities(params);
    return;
  };

  useEffect(() => {
    if (data) {
      const SelectItem: SelectItemOptionsType = data.map((data: IGetUniversalListContries) => ({
        label: data.country_name,
        value: data.country_name,
      }));
      setContries(SelectItem);
    }
  }, [data]);

  useEffect(() => {
    const params: IParamsSearch = {
      name: control._formValues.country,
      typeSearch: 'states',
    };
    fetchDataCities(params);
  }, [contries]);

  return (
    <form className="my-4 flex flex-col gap-4" onSubmit={handleSubmit(handleChange)}>
      <h1 className="text-center text-xl font-bold text-white md:text-2xl">Ingresa tus datos personales</h1>
      <Input
        name="first_name"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Ingresa tu(s) nombre(s)',
          className: 'font-ligth',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
          keyfilter: 'alpha',
        }}
      />

      <Input
        name="last_name"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Ingresa tu(s) apellido(s)',
          className: 'font-ligth',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
          keyfilter: 'alpha',
        }}
      />

      <Input
        name="personal_identification"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Ingresa tu DNI / Cédula',
          className: 'font-ligth',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
          keyfilter: 'alphanum',
        }}
      />

      <PrimeDropdown
        control={control}
        name="country"
        dropdownProps={{
          placeholder: 'Selecciona tu país',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            color: 'white',
            backgroundColor: '#1F222B',
          },
          optionLabel: 'label',
          optionValue: 'value',
          options: contries,
        }}
        onCustomChange={onSelectContries}
      />

      <PrimeDropdown
        control={control}
        name="city"
        dropdownProps={{
          placeholder: 'Selecciona tu ciudad',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            color: 'white',
            backgroundColor: '#1F222B',
          },
          optionLabel: 'label',
          optionValue: 'value',
          options: cities,
        }}
      />

      <Input
        name="zip_code"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Código postal',
          className: 'font-ligth',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
          keyfilter: 'int',
        }}
      />

      <Input
        name="address"
        control={control}
        inputProps={{
          type: 'text',
          placeholder: 'Dirección',
          className: 'font-ligth',
          style: {
            borderRadius: '20px',
            border: 'none',
            height: `${useDesktop ? '48px' : '40px'}`,
            fontSize: `${useDesktop ? '18px' : '14px'}`,
            fontWeight: '400',
            color: 'white',
            backgroundColor: '#1F222B',
          },
        }}
      />
      <div className="flex w-full justify-center">
        <Button
          type="submit"
          label="Siguiente"
          className="flex w-[100px] justify-center p-3"
          style={{
            background: '#2E8E9E',
            border: 'none',
            borderRadius: '20px',
            color: 'white',
            width: '128px',
            height: '40px',
          }}
          loading={formState.isSubmitting}
          disabled={!formState.isValid}
          onClick={() => {
            animationStep(1, 0);
          }}
        />
      </div>
    </form>
  );
};

export default StepOne;
