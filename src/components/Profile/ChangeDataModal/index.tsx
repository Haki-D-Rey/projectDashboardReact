import React, { FC, useEffect } from 'react';

import Input from '@/components/UI/Input';
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

interface IChangeDataModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ChangeDataModal: FC<IChangeDataModalProps> = ({ visible, setVisible }) => {
  const { control, formState, setValue, handleSubmit } = useForm<ProfileType>({
    resolver: zodResolver(profileSchema),
  });
  let urlImage: string = '';
  const { errors } = formState;
  const { data } = useUserData();

  const updateUser = useUpdateEditUser();

  const uploadImage = async (file: File, email: string) => {
    let ObjectoUrl: { [name: string]: string };
    if (!BUCKET_URL) throw new Error('No se encontró el bucket de AWS');
    if (!email) throw new Error('No se encontró el email del usuario');
    if (file.size > SIZE_2MB) throw new Error('La imagen no debe superar los 2MB');

    const extension = file.name.split('.').pop();
    const Key = `${email}_profile_photo.${extension}`;
    urlImage = `${BUCKET_URL_S3}${Key}`;
    ObjectoUrl = {
      changingThisBreaksApplicationSecurity: urlImage,
    };
    Object.defineProperty(file, 'objectURL', {
      writable: true,
      value: ObjectoUrl || '{"changingThisBreaksApplicationSecurity": ""}',
    });

    const params = { Bucket: BUCKET_URL, Key, Body: file, ACL: 'public-read', ContentType: file.type };
    const response = await s3Client.send(new PutObjectCommand(params));
    return { response, urlImage };
  };

  const onSubmitHandler = async (datos: ProfileType) => {
    try {
      if (!datos.image) throw new Error('No se encontró la imagen');
      const { response, urlImage } = await uploadImage(datos.image, data?.email || '');
      console.log(datos.image);
      console.log(response);
      if (response.$metadata.httpStatusCode === 200) {
        const dataUpdateUser: IMutationEditUserArgs = {
          id: data?.id,
          username: data?.username,
          email: data?.email,
          address: datos.address,
          phone_number: datos.phone_number,
          zip_code: datos.zip_code,
          profile_image: urlImage,
        };
        const updateResponse = await updateUser.mutateAsync(dataUpdateUser);
        if (updateResponse) {
          setVisible(false);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data) {
      setValue('address', data.address);
      setValue('zip_code', data.zip_code);
      setValue('phone_number', data.phone_number);
    }
  }, [data]);

  return (
    <Dialog header="Actualizar datos" className="mx-10" visible={visible} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
      <form className="w-full p-4 text-center" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex w-full items-center justify-between">
          <div className="w-2/3 space-y-4">
            <Input
              name="phone_number"
              Icon={MdPhoneAndroid}
              control={control}
              inputProps={{ type: 'text', placeholder: 'Ingresa nuevo número de teléfono' }}
            />
            <Input name="address" Icon={MdMap} control={control} inputProps={{ type: 'text', placeholder: 'Ingresa nueva dirección' }} />
            <Input name="zip_code" Icon={MdCode} control={control} inputProps={{ type: 'text', placeholder: 'Ingresa nuevo código postal' }} />
          </div>
          <div className=" w-1/3 text-center">
            <div className="relative mx-auto w-40">
              <Controller
                name="image"
                control={control}
                render={({ field }) => <ImageUploader label={'Subir Imagen'} value={field.value} onChange={field.onChange} />}
              />
            </div>
          </div>
        </div>
        <p className="p-error">{errors.image?.message || errors.image?.message}</p>
        <p className="text-sm text-yellow-500">
          <span className="font-semibold">Nota:</span> Las imágenes deben ser en formato JPG o PNG y no deben superar los 2MB.
        </p>
        <Button type="submit" label="Guardar Cambios" className="mt-4 w-1/2" disabled={!formState.isValid} loading={formState.isSubmitting} />
      </form>
    </Dialog>
  );
};

export default ChangeDataModal;
