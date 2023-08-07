import React, { ReactElement, useState } from 'react';

import { useForm } from 'react-hook-form';

import Layout from '@/components/Layout';
import Lock from '/public/assets/assets-globals/candado.svg';

import Image from 'next/image';
import ConfirmPasswordModal from '@/components/Profile/ConfirmPasswordModal';
import CodeSecurity from '@/components/Profile/CodeSecurity';

import { useUserData } from '@/api/hooks/queries/user.hook';
import { NextPageWithLayout } from '@/pages/_app';
import MainProfile from '@/components/Profile'
import EditProfile from '@/components/Profile/EditProfile';
import { IUrlImage } from '@/api/types/UI';

const Profile: NextPageWithLayout = () => {
  const { data } = useUserData();
  const {control, handleSubmit} = useForm({
    defaultValues: {
      ...data
    }
  });
  const [showForm, setShowForm] = useState<boolean>(true);

  const [codeSecurity, setCodeSecurity] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSuccessValidation = () => {
    setShowConfirmPassword(false);
    setCodeSecurity(true);
  };

  const changeView = () => setShowForm(!showForm);

  const urlImage: IUrlImage = { path: 'assets-globals', src: 'candado', style: {} };

  return (
    <>
      <div className="relative mx-auto flex h-full w-[95%] flex-col justify-evenly rounded-t-[30px] bg-secondary lg:mr-[1%] xl:mr-[2%] xl:pb-6">
        {showForm ? <MainProfile data={data} changeView={changeView} /> : <EditProfile data={data} changeView={changeView} setVisibleModal={setCodeSecurity}/>}
        
        <button className={`mx-auto flex w-[40%] lg:w-[273px] cursor-pointer items-center justify-center gap-4 rounded-xl border-2 ${!showForm ? "bg-tertiary" : "bg-secondary"} p-1 xl:w-[25%]`}
         onClick={() => setShowConfirmPassword(true)}
         disabled={showForm}
        >
          <Image src={Lock} alt="" className="-mb-1 lg:w-8 xl:w-12 object-cover" />{' '}
          <p className="text-shadow text-lg font-semibold text-white">Cambiar contraseña</p>
        </button>
      </div>

      <CodeSecurity visible={codeSecurity} setVisible={setCodeSecurity} />
      <ConfirmPasswordModal setVisible={setShowConfirmPassword} visible={showConfirmPassword} onSuccessValidation={onSuccessValidation} />
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;