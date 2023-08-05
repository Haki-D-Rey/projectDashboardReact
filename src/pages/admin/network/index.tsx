import React, { ReactElement, ReactNode, useState } from 'react';

import { SelectButton } from 'primereact/selectbutton';

import Layout from '@/components/Layout';
import Table from '@/components/Network/Table';
import Toolbar from '@/components/Common/Toolbar';
import Organigram from '@/components/Network/Organigram';

import { Icon } from '@iconify/react';

import type { NextPageWithLayout } from '@/pages/_app';
import { useNetworkData } from '@/api/hooks/queries/user.hook';

type View = 'table' | 'organigram';

const justifyOptions = [
  { icon: 'material-symbols:table-rows-rounded', value: 'table' },
  { icon: 'mdi:account-network', value: 'organigram' },
];

type ViewType = {
  icon: ReactNode;
  value: View;
};

const Network: NextPageWithLayout = () => {
  const { data } = useNetworkData();

  const [value, setValue] = useState(justifyOptions[0].value);

  const justifyTemplate = (option: ViewType) => {
    return <span className="iconify text-xl" data-icon={option.icon}></span>;
  };

  return (
    <>
      <Toolbar title="Mi red de referidos">
        <SelectButton value={value} onChange={(e) => setValue(e.value)} itemTemplate={justifyTemplate} optionLabel="value" options={justifyOptions} />
      </Toolbar>
      {value === 'table' ? <Table /> : <Organigram />}
    </>
  );
};

Network.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Network;
