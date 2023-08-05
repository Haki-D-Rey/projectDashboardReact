import React, { FC } from 'react';
import Image from 'next/image';

import CameraIcon from '/public/assets/assets-globals/cameraEdit.svg';
import { MdEdit } from 'react-icons/md';

import { IProfile } from '@/api/types/util';

const MainProfile:FC <IProfile> = ({ data, changeView }) => {
    return(
        <div className="mx-auto grid grid-cols-2 grid-rows-5 gap-y-4 lg:h-[80%] lg:w-[90%] xl:h-[80%] xl:w-[95%] 2xl:xl:h-[75%] 2xl:w-[85%]">
            <div className="row-span-4 justify-self-end flex flex-col w-[90%] justify-around  lg:pl-2 2xl:pl-12">
              <div className="relative lg:h-[257px] lg:w-[257px] lg:min-h-[257px] lg:min-w-[257px] overflow-hidden 2xl:h-[300px] 2xl:w-[300px] 2xl:min-h-[300px] 2xl:min-w-[300px]">
                <img className="h-full w-full rounded-full border-8 border-[#2E8E9E] bg-white" src={data?.profile_image} alt="" />
                <div className="absolute -bottom-4 right-6 h-20 w-20 cursor-pointer">
                  <input type="file" className="absolute z-[80] h-20 w-20 cursor-pointer opacity-0" accept="image/png, .jpeg, .jpg" capture />
                  <Image src={CameraIcon} alt="" className="relative z-30" />
                </div>
              </div>
              <p className="flex w-[80%] flex-col font-bold text-white lg:text-lg xl:text-xl">
                Nombre Completo{' '}
                <span className="lg:text-[16px] xl:text-lg font-normal text-gray-400">
                  {data?.first_name} {data?.last_name}
                </span>
              </p>
            </div>

            <div className="row-span-4 flex flex-col justify-around lg:pl-6 xl:p-0">
              <p className="flex flex-col font-bold text-white lg:text-lg xl:text-xl">
                Correo Electrónico: <span className="lg:text-[16px] font-normal xl:text-lg text-gray-400">{data?.email}</span>
              </p>
              <p className="flex flex-col font-bold text-white lg:text-lg xl:text-xl">
                Nombre de usuario: <span className="lg:text-[16px] font-normal xl:text-lg text-gray-400">{data?.username}</span>
              </p>
              <p className="flex flex-col font-bold text-white lg:text-lg xl:text-xl">
                Detalles de Dirección: <span className="lg:text-[16px] font-normal xl:text-lg text-gray-400">{data?.address}</span>
              </p>
              <p className="flex flex-col font-bold text-white lg:text-lg xl:text-xl">
                Teléfono: <span className="lg:text-[16px] font-normal xl:text-lg text-gray-400">{data?.phone_number}</span>
              </p>
            </div>
            <div className="col-span-2 mx-auto w-[90%]  lg:pl-2">
              <p className="flex flex-col font-bold text-white lg:text-lg xl:text-lg 2xl:pl-12">
                Enlace de Referido:{' '}
                <a
                  className="lg:text-[16px] xl:text-lg text-gray-400 underline"
                  href={`https://bartercapital-dashboard.com/#/auth/register?referral_code=${data?.referral_code}`}>
                  https://bartercapital-dashboard.com/#/auth/register?referral_code={data?.referral_code}
                </a>
              </p>
            </div>
            <button
          className="absolute grid place-content-center -top-3 right-16 h-[55px] w-[55px] xl:w-[75px] xl:h-[75px] rounded-b-3xl bg-primary p-4 text-white"
          onClick={changeView}
          type='submit'>
           <MdEdit className='text-2xl' />
        </button>
          </div>
    )
}

export default MainProfile;