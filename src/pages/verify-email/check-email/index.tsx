import React from 'react';
import Image from 'next/image';

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router';

function Main() {
  const router = useRouter();

  const handleLogOut = () => {
    signOut();
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary text-white lg:gap-7">
      <Image
        className="mx-auto h-20 w-auto"
        src="https://d32m9psmi7z6jn.cloudfront.net/images/logo/dashboard/logo-white.png"
        alt="logo de barter capital"
        width={80}
        height={80}
      />
      <div className="flex h-[50%] min-h-[330px] w-[80%] flex-col items-center justify-around rounded-3xl border bg-secondary font-bold p-2 lg:h-[365px] lg:w-[1100px]">
        <h1 className="uppercase tracking-wide text-lg text-center mx-auto lg:text-[46px]">Verificar Correo Electronico</h1>
        <p className="text-center text-xs md:text-[32px] md:font-light md:leading-8">
          Tu cuenta ha sido creada exitosamente, verifica tu correo para iniciar sesion y disfrutar de nuestros servicios
        </p>
        <button className="rounded-lg border bg-primary p-2 lg:p-4 text-white" onClick={handleLogOut}>
          Ir a iniciar sesion
        </button>
        <p className='text-center'>
          ¿No recibiste el correo? <span className="underline">Reenviar correo</span>
        </p>
      </div>
    </div>
  );
}

export default Main;
