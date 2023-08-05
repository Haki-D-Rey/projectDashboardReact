import { ReactNode } from 'react';
import Image, { ImageProps, StaticImageData } from 'next/image';

import { IBodyCardDetails, ICardBodyCustom, IUrlImage } from '@/api/types/UI';
import { IBalanceTypeWithMappedResultKeys, IQueryBalanceTypeOperation, IResponseBalanceTypeOperation, ResultKeysMap } from '@/api/types/transaction';
import SVGComponent from '@/components/UI/SvgFC';

const getDateISO = (date: Date | string): string => {
  const fecha = new Date(date);

  const año = fecha.getFullYear();
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();

  const fechaISO = `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

  return fechaISO;
};

const getDateCutomeString = (date: string | Date, type: 'mobile' | 'desktop'): string => {
  const fechaHora = new Date(date);

  const dia = fechaHora.getDate();
  const mes = fechaHora.toLocaleString('default', { month: 'long' });
  const año = fechaHora.getFullYear();

  const fechaCustom = dia + ' de ' + mes + (type === 'desktop' ? ' ' + año : '');
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

const buildArrayResultCard = (
  data: IResponseBalanceTypeOperation,
  arrayStructure: ICardBodyCustom[],
  arrayKeys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>
): ICardBodyCustom[][] => {
  const result: ICardBodyCustom[][] = [];
  data.results.forEach((body: IBalanceTypeWithMappedResultKeys) => {
    result.push(
      arrayStructure.flatMap((data) => ({
        ...data,
        body: data.body.flatMap((item) => ({
          ...item,
          value: item.fieldfind !== 'customField' && arrayKeys ? body[getValueRowCardData(arrayKeys, item)] : item.value,
        })),
      }))
    );
  });
  return result;
};

const getValueRowCardData = (keys: Array<keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']]>, card: IBodyCardDetails) => {
  const key: keyof ResultKeysMap[IQueryBalanceTypeOperation['operation_area']] = keys.filter((key) => key === card.fieldfind)[0];
  return key;
};

const child = (data: ICardBodyCustom[][], classNamePT: string): React.ReactNode => {
  return (
    <>
      {data.map((card, i) => (
        <div key={i} className={classNamePT}>
          {card.map((dataItem, index) => {
            if (dataItem.htmlCustomParent === 'div') {
              return (
                <div className={dataItem.className} key={index}>
                  {dataItem.body.map((item, j) => {
                    if (item.htmlCustomElementType === 'span') {
                      return (
                        <span
                          key={j}
                          className={item.classNames}
                          style={{
                            order: `${item.order}`,
                          }}>
                          {item.value}
                        </span>
                      );
                    } else if (item.htmlCustomElementType === 'img') {
                      return <SVGComponent key={j} path="UI" src={item.value} />;
                    } else if (item.htmlCustomElementType === 'p') {
                      return (
                        <p key={j} className={item.classNames}>
                          {item.value}
                        </p>
                      );
                    } else {
                      return <div key={j} style={{
                        order: `${item.order}`
                      }}>{item.children && item.children(item.value)}</div>;
                    }
                  })}
                </div>
              );
            }
            return <></>;
          })}
        </div>
      ))}
    </>
  );
};

interface IPropietariesContentHtml extends HTMLDivElement { }
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
  buildArrayResultCard,
  getValueRowCardData,
  child,
};
