import React, { FC, ImgHTMLAttributes, CSSProperties } from 'react';

interface ISVGComponent extends ImgHTMLAttributes<HTMLImageElement> {
  path: string;
  src: string;
  style?: CSSProperties;
}

const SVGComponent: FC<ISVGComponent> = ({ path, src, style, ...props }) => {
  // Importar el SVG desde los assets
  const importedSVG = require(`/public/assets/${path}/${src}.svg`).default;

  // Renderizar el SVG como un componente React
  const SVGComponent = React.createElement('img', {
    src: importedSVG.src,
    alt: 'SVG',
    style: { ...style },
    ...props,
  });

  return SVGComponent;
};

export default SVGComponent;
