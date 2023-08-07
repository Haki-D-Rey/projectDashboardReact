import { ReactNode } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';

import { IUrlImage } from '@/api/types/UI';
import { IQueryBalanceTypeOperation, IResponseBalanceTypeOperation, ResultKeysMap } from '@/api/types/transaction';

const getDateISO = (date: Date | string): string => {
  const fecha = new Date(date);

  // Obtener los elementos de la fecha
  const año = fecha.getFullYear(); // Año (ej. 2023)
  const mes = fecha.getMonth() + 1; // Mes (0-11, por eso se suma 1) (ej. 7)
  const dia = fecha.getDate(); // Día del mes (ej. 14)

  // Formatear la fecha en el formato ISO 8601 (YYYY-MM-DD)
  const fechaISO = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

  return fechaISO;
};

const getDateCutomeString = (date: string | Date): string => {
  // Crear un objeto de fecha a partir de la cadena
  const fechaHora = new Date(date);

  // Obtener el día, mes y año
  const dia = fechaHora.getDate();
  const mes = fechaHora.toLocaleString('default', { month: 'long' });
  const año = fechaHora.getFullYear();

  // Crear la cadena de texto en el formato deseado
  const fechaCustom = dia + ' de ' + mes + ' ' + año;
  return fechaCustom;
};

const createImgBodyTable = (body: HTMLElement | null, urlImage: IUrlImage, idImg: string) => {
  const imgBody: HTMLElement | null = document.getElementById(idImg);

  if (!imgBody && body) {
    const image = document.createElement('img');
    image.src = urlImage.src;
    image.id = idImg;

    Object.assign(image.style, urlImage.style);
    body.appendChild(image);
    body.style.position = 'relative';

    body.style.borderCollapse = 'separate !important';
  }
};

const createEmptyRowArrayCustom = (size: number, data: IResponseBalanceTypeOperation) => {
  const arrayKeys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]> = data.results.length
    ? (Object.keys(data.results[0]) as Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>)
    : [];

  const emptyRow: { [name: string]: any } = {};
  arrayKeys.forEach((llave) => {
    emptyRow[llave] = '';
  });

  const empty: IResponseBalanceTypeOperation = {
    count: 10,
    next: '',
    previous: '',
    results: Array.from({ length: size }, () => emptyRow) as Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>,
  };
  return empty;
};

const createDivTextEmptyData = (propietariesContent: IPropietariesContentHtml, divParent: HTMLDivElement) => {
  const divEmpty = document.createElement(`div`);
  divEmpty.innerText = `${propietariesContent.innerText}`;
  divEmpty.id = `${propietariesContent.id}`;

  Object.assign(divEmpty.style, propietariesContent.style);
  divParent?.appendChild(divEmpty);
  return;
};

const CreateIcon = ({ icon, imageProps }: IIconShow): ReactNode => {
  imageProps.src = icon;
  return (
    <>
      <Image {...imageProps} />
    </>
  );
};

const changeStyleStepAnimation = (step: number, nameStepSelector: string) => {
  const stepInfos = document.querySelectorAll(nameStepSelector);
  if (stepInfos.length) {
    stepInfos[0].classList.remove('remove');
    if (!stepInfos[0].classList.contains('changed') && step === 1) {
      stepInfos[0].classList.add('changed');
    }

    if (stepInfos[0].classList.contains('changed') && step === 0) {
      stepInfos[0].classList.remove('changed');
      stepInfos[0].classList.add('remove');
    }
  }
};

const animationStep = (step: number, previous: number, valuePast?: number) => {
  const stepStyle = document.querySelectorAll('.step');

  if (step !== 0) {
    stepStyle[step].classList.remove('step-info');
  }

  stepStyle[previous].classList.add('step-info');
  stepStyle[step].classList.add('step-actual');
  if (previous !== 0 && stepStyle[previous + 1].classList.contains('step-actual')) {
    stepStyle[step].classList.remove('step-info');
    stepStyle[previous].classList.remove('step-actual');
  }
  if (valuePast) {
    stepStyle[valuePast].classList.remove('step-actual');
    stepStyle[valuePast].classList.remove('step-info');
  }
  if (valuePast && step === 2 && !stepStyle[step].classList.contains('step-info')) {
    stepStyle[step].classList.add('step-info');
    stepStyle[step].classList.remove('step-actual');
  }
};

interface IPropietariesContentHtml extends HTMLDivElement {}
interface IIconShow {
  icon: StaticImageData; // Change ReactElement to StaticImageData if you're using Next.js 12 or later
  imageProps: Omit<ImageProps, 'layout'>;
}
export {
  getDateISO,
  getDateCutomeString,
  createImgBodyTable,
  createEmptyRowArrayCustom,
  createDivTextEmptyData,
  CreateIcon,
  changeStyleStepAnimation,
  animationStep,
};
