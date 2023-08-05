import React, { ReactElement, useState } from 'react';

import { useForm } from 'react-hook-form';
import Image from 'next/image';

import Layout from '@/components/Layout';
import Lock from '/public/assets/assets-globals/candado.svg'

import TitleUI from '@/components/UI/TitleUI/index';
import ConfirmPasswordModal from '@/components/Profile/ConfirmPasswordModal';
import ChangeDataModal from '@/components/Profile/ChangeDataModal';

import { useUserData } from '@/api/hooks/queries/user.hook';
import { NextPageWithLayout } from '@/pages/_app';
import MainProfile from '@/components/Profile';
import EditProfile from '@/components/Profile/EditProfile';
import { IUrlImage } from '@/api/types/UI';

const Profile: NextPageWithLayout = () => {
  const { data } = useUserData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ...data,
    },
  });
  const [showForm, setShowForm] = useState<boolean>(true);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSuccessValidation = () => {
    setShowConfirmPassword(false);
    setShowEditProfile(true);
  };

  const changeView = () => setShowForm(!showForm);

  const urlImage: IUrlImage = { path: 'assets-globals', src: 'candado', style: {} };

  return (
    <>
      <div className="relative mx-auto flex h-full w-[95%] flex-col justify-evenly rounded-t-[30px] bg-secondary lg:mr-[1%] xl:mr-[2%] xl:pb-6">
        {showForm ? <MainProfile data={data} changeView={changeView} /> : <EditProfile data={data} changeView={changeView} />}


        <div className="mx-auto w-[60%] border-2 xl:w-[40%] xl:max-w-[395px] cursor-pointer rounded-xl bg-tertiary px-1">
          <TitleUI title="Cambiar Contraseña"
            urlImage={urlImage}
            transparent={false}
          />
        </div>
      </div>

      <ChangeDataModal setVisible={setShowEditProfile} visible={showEditProfile} />
      <ConfirmPasswordModal setVisible={setShowConfirmPassword} visible={showConfirmPassword} onSuccessValidation={onSuccessValidation} />
    </>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Profile;
