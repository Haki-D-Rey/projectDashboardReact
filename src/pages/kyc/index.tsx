
import { Button } from 'primereact/button';
import Image from 'next/image';

import { useIsMobile } from '@/hooks/useMediaQuery.hook';

const KycScreen = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-primary">
      <Image
        className="mx-auto h-20 w-auto"
        src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/logo/dashboard/logo-white-h.png'}
        alt="logo de barter capital"
        width={80}
        height={80}
      />
      <div className="flex flex-col justify-center items-center gap-3 py-6 px-3 rounded-xl border bg-secondary md:py-10 md:px-8  md:rounded-3xl md:gap-5">
        <h1 className="text-xl md:text-3xl font-bold text-white uppercase">Verificación Obligatoria</h1>
        <Button
          label="Iniciar Verificacion"
          icon="pi pi-shield"
          style={{
            backgroundColor: '#040D19',
            color: 'white',
            border: '1px solid gray',
            fontWeight: '500',
            width: isMobile ? '80%' : '70%',
            maxWidth: '250px',
            height: isMobile ? '40px' : '45px',
            fontSize: isMobile ? '12px' : '16px'
          }}
        />
      </div>
    </div>
  );
};


export default KycScreen;