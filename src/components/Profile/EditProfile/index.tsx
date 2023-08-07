import React, { FC } from 'react';

import Image from 'next/image';

import { useUpdateEditUser } from "@/api/hooks/mutations/user.hook"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '@/utils/validators/profile';

import SaveIcon from '/public/assets/assets-globals/saveIcon.svg';
import CameraIcon from '/public/assets/assets-globals/cameraEdit.svg';
import Input from '@/components/UI/Input';
import { IResponseGetUserData } from '@/api/types/user';
import InputProfile from '@/components/UI/InputProfile';

import { IProfile } from '@/api/types/util';

interface EditProfile extends IProfile {
  setVisibleModal: (visible : boolean ) => void;
}

const EditProfile: FC<EditProfile> = ({ data, changeView, setVisibleModal }) => {
  const updateEditUserMutation = useUpdateEditUser();

  const { control, handleSubmit } = useForm<IResponseGetUserData>({
    defaultValues: {
      ...data
    },
    resolver: zodResolver(profileSchema)
  });

  const showDataFromForm = async (form : any) => {
    console.log('🚀 ~ file: index.tsx:31 ~ onSubmitHandler ~ data:', form);
    setVisibleModal(true);
    try {
      //TODO: Spinner of loading
      const response = await updateEditUserMutation.mutateAsync({
        id: data?.id,
        ...form,
      }).then(() => changeView);
    } catch (error) {
      //TODO: Modals for error
    }
  }

  return (
    <form
      className="mx-auto grid grid-cols-2 grid-rows-5 gap-y-4 lg:h-[80%] lg:w-[90%] xl:h-[80%] xl:w-[95%] 2xl:xl:h-[80%] 2xl:w-[85%]"
      onSubmit={handleSubmit(showDataFromForm)}>
      <div className="row-span-4 flex w-[90%] flex-col justify-around justify-self-end  lg:pl-2 2xl:pl-12">
        <div className="relative overflow-hidden lg:h-[257px] lg:min-h-[257px] lg:w-[257px] lg:min-w-[257px] 2xl:h-[300px] 2xl:min-h-[300px] 2xl:w-[300px] 2xl:min-w-[300px]">
          <img className="h-full w-full rounded-full border-8 border-[#2E8E9E] bg-white" src={data?.profile_image} alt="" />
          <div className="absolute -bottom-4 right-6 h-20 w-20 cursor-pointer">
            <input type="file" className="absolute z-[80] h-20 w-20 cursor-pointer opacity-0" accept="image/png, .jpeg, .jpg" capture />
            <Image src={CameraIcon} alt="" className="relative z-30" />
          </div>
        </div>
        {/* <InputProfile
          name="first_name"
          label="Nombre Completo"
          defaultValue={`${data?.first_name} ${data?.last_name}`}
          control={control}
          type="text"
        /> */}
        <p className="flex w-[80%] flex-col font-bold text-white lg:text-lg xl:text-xl">
          Nombre Completo{' '}
          <span className="font-normal text-gray-400 lg:text-[16px] xl:text-lg">
            {data?.first_name} {data?.last_name}
          </span>
        </p>
      </div>

      <div className="2xl:justify-evenlyn row-span-4 flex flex-col justify-around lg:pl-6 xl:pl-2 2xl:gap-6 ">
        <InputProfile name="email" label="Correo Electrónico" defaultValue={data?.email ? data.email : ''} control={control} type="email" />
        <InputProfile name="username" label="Nombre de Usuario" defaultValue={data?.username ? data.username : ''} control={control} type="text" />
        <InputProfile name="address" label="Detalles de dirección" defaultValue={data?.address ? data.address : ''} control={control} type="text" />
        <InputProfile name="phone_number" label="Teléfono" defaultValue={data?.phone_number ? data.phone_number : ''} control={control} type="number" />
      </div>
      <div className="col-span-2 mx-auto w-[90%] lg:pl-2 2xl:pl-12">
        <p className="flex flex-col font-bold text-white lg:text-lg xl:text-lg ">
          Enlace de Referido:{' '}
          <a
            className="text-gray-400 underline lg:text-[16px] xl:text-lg"
            href={`https://bartercapital-dashboard.com/#/auth/register?referral_code=${data?.referral_code}`}>
            https://bartercapital-dashboard.com/#/auth/register?referral_code={data?.referral_code}
          </a>
        </p>
      </div>
      <button
        className="absolute -top-3 right-16 grid h-[55px] w-[55px] place-content-center rounded-b-3xl bg-primary p-4 text-white xl:h-[75px] xl:w-[75px]"
        type="submit"
        //onClick={changeView}
        >
        <Image src={SaveIcon} alt="" className="w-8" />
      </button>
    </form>
  );
}

export default EditProfile;