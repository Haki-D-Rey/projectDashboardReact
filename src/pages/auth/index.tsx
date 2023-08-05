/* eslint-disable @next/next/no-sync-scripts */
import React, { FC, useState, CSSProperties } from 'react';

import PublicPage from '@/hoc/PublicPage';
import Input from '@/components/UI/Input';
import PrimeCheckBox from '@/components/UI/CheckBox';
import { Button } from 'primereact/button';

import Image from 'next/image';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/api/hooks/mutations/user.hook';

import Link from 'next/link';

import { loginFormSchema, LoginFormType } from '@/utils/validators/login';
import { triggerError, triggerLoading, triggerSuccess } from '@/utils/tools/message';
import Password from '@/components/UI/Password';

import TopBar from '@/components/UI/Topbar';

import SVGComponent from '@/components/UI/SvgFC';
import useMediaQuery from '@/hooks/useMediaQuery.hook';

import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

interface ILoginProps {}

const Login: FC<ILoginProps> = ({}) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const login = useLogin();

  const onSubmitHandler = async (data: LoginFormType) => {
    console.log('🚀 ~ file: index.tsx:31 ~ onSubmitHandler ~ data:', data);
    try {
      triggerLoading('Iniciando sesión', 'Espere un momento');
      const response = await signIn('credentials', { redirect: false, ...data });

      if (!response?.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }
      triggerSuccess('Has iniciado sesión correctamente', 'Bienvenido');
    } catch (error) {
      triggerError('Usuario o contraseña incorrectos', 'Error');
    }
  };
  const [isMobile, isMobileorTablet] = [useMediaQuery('(max-width: 1024px)'), useMediaQuery('(max-width: 512px)')];

  //SVG Export and Styles
  const svgEmail = () => {
    const customStyles: CSSProperties = {
      position: 'absolute',
      top: '50%',
      marginTop: isMobile ? '-1rem' : '-1.5rem',
      marginLeft: '0.5rem',
      width: isMobile ? '40px' : '50px',
      height: isMobile ? '40px' : '50px',
    };
    return <SVGComponent path="login" src="Usuario" style={customStyles} />;
  };

  const svgPassword = () => {
    const customStyles: CSSProperties = {
      position: 'absolute',
      top: '50%',
      marginTop: isMobile ? '-1rem' : '-1.5rem',
      marginLeft: '0.5rem',
      zIndex: '1',
      width: isMobile ? '40px' : '50px',
      height: isMobile ? '40px' : '50px',
    };
    return <SVGComponent path="login" src="Password" style={customStyles} />;
  };

  //Style Element JSX
  const boxButtonStyle: CSSProperties = {
    backgroundColor: isHover ? '#2E8E9E' : 'transparent',
    color: isHover ? '#FFFFFF' : '##4fe8d0',
    fontWeight: 900,
    padding: '0.5rem 0',
    borderRadius: '1rem',
    cursor: 'pointer',
  };

  const customStylesSignIn: CSSProperties = {
    width: '33px',
    height: '35px',
    margin: 'auto',
  };

  const configStylePassword = {
    hideIcon: {
      width: isMobile ? '24px' : '32px',
      height: isMobile ? '24px' : '32px',
      marginTop: isMobile ? '-0.4rem' : '-0.7rem',
      marginRight: '0.5rem',
    },
    showIcon: {
      width: isMobile ? '24px' : '32px',
      height: isMobile ? '24px' : '32px',
      marginTop: isMobile ? '-0.4rem' : '-0.7rem',
      marginRight: '0.5rem',
    },
    inputClassName: 'min-[1024px]:h-[60px] h-[50px] w-full rounded-full bg-primaryDark text-[#FFFFFF]',
  };
  return (
    <PublicPage>
      <div className="flex min-h-screen flex-col items-center bg-BackgroundDark">
        <TopBar />

        <div className="min-w-2xl mt-[2rem] flex w-[90%] grow flex-col items-center gap-6 sm:mx-auto min-[768px]:w-[75%] min-[1534px]:w-[55%]">
          <div className="my-[2rem] h-[128px] w-[128px] sm:mx-auto min-[1024px]:h-[194px] min-[1024px]:w-[194px]">
            <Image
              className="mx-auto"
              src="https://d32m9psmi7z6jn.cloudfront.net/images/logo/dashboard/logo-white.png"
              alt="logo de barter capital"
              width={194}
              height={194}
            />
          </div>

          <div className="w-[90%] min-[1024px]:w-[70%]">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmitHandler)}>
              <Input
                Icon={svgEmail}
                name="username"
                control={control}
                inputProps={{
                  type: 'email',
                  placeholder: 'Correo Electrónico',
                  style: {
                    height: isMobile ? '50px' : '60px',
                    background: '#1F222B',
                  },
                }}
              />

              <Password
                Icon={svgPassword}
                name="password"
                control={control}
                inputProps={{
                  feedback: false,
                  type: 'password',
                  placeholder: 'Contraseña',
                }}
                hideIcon={<RxEyeOpen style={configStylePassword.hideIcon} />}
                showIcon={<RxEyeClosed style={configStylePassword.showIcon} />}
                style={configStylePassword}
              />

              <div className="flex flex-col justify-center gap-5">
                <PrimeCheckBox
                  name="remember"
                  control={control}
                  label="Recordar mis credenciales"
                  className="m-auto text-[#FFFFFF]/50  min-[1024px]:text-2xl"
                />
                <Button
                  type="submit"
                  outlined
                  className="m-auto w-[25%] text-2xl min-[512px]:w-[35%] min-[1024px]:w-[220px]"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={boxButtonStyle}>
                  {isMobileorTablet ? (
                    <SVGComponent path="login" src="buttonSignIn" style={customStylesSignIn} />
                  ) : (
                    <span className="m-auto text-base min-[1024px]:text-2xl">{login.isLoading ? 'Cargando...' : 'Iniciar Sesión'}</span>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-2 text-center text-[#FFFFFF]/50 min-[1024px]:text-2xl">
            <Link href="/auth/reset-password" className="font-[600] hover:text-[#3bb3c9]">
              ¿Olvidaste tu contraseña?
            </Link>
            <p className="font-extralight ">
              ¿Aún no tienes cuenta?{' '}
              <Link href="/auth/register" className="font-[600] hover:text-[#3bb3c9]">
                Registrarme ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicPage>
  );
};

export default Login;
