import React, { FC, useEffect } from 'react';

import ModalProfile from '@/components/UI/ModalProfile';
import { Button } from 'primereact/button';

import { Dialog } from 'primereact/dialog';
import { Controller, useForm } from 'react-hook-form';
import { profileSchema, ProfileType } from '@/utils/validators/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserData } from '@/api/hooks/queries/user.hook';
import { MdCode, MdMap, MdPhoneAndroid } from 'react-icons/md';
import ImageUploader from '@/components/UI/ImageUploader';
import { s3Client } from '@/utils/tools/aws';
import { BUCKET_URL, SIZE_2MB, BUCKET_URL_S3 } from '@/utils/constants/utils';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { useUpdateEditUser } from '@/api/hooks/mutations/user.hook';
import { IMutationEditUserArgs } from '@/api/types/user';
import { boolean } from 'zod';

interface IChangeDataModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const CodeSecurity: FC<IChangeDataModalProps> = ({ visible, setVisible }) => {
  return (
    <ModalProfile title='Se ha enviado un código de seguridad' 
    visible={visible} 
    setVisible={setVisible} 
    nameBtn='Confirmar código'
    description='Se ha enviado un código temporal de 8 digitos a tu correo electronico.'
    >
     <label className='text-lg'> Ingresa ese código para guardar tus cambios</label>
     <input type="text" placeholder='Ingrese un código de 8 dígitos' className='p-1 w-[75%] bg-white rounded-xl placeholder:text-[15px] pl-4 placeholder:text-black' />
    </ModalProfile>
  );
};



export default CodeSecurity;