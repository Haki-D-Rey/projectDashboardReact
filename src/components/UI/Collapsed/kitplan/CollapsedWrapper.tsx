import React, { FC, useState } from "react";

import { CollapseProvider } from '../../../../context/CollapseProvider'

import CollapsedContentKP from '../../../KitPlans/index';
import Collapsed from "./Collapsed";
import Title from '../../Title'

import { IResponseKitPlan } from "@/api/types/transaction";

interface CollapsedProps {
  title: string;
  dataKp: IResponseKitPlan[] | undefined;
  indexKey?: number;
}

function CollapsedWrapper({ title, dataKp, indexKey }: CollapsedProps) {
  const [showCollapsed, setShowCollapsed] = useState<boolean | undefined>(indexKey === 0 ? true : false);
  const [dataOrder, setDataOrder] = useState<IResponseKitPlan[] | undefined>(dataKp?.slice().sort((a: any, b: any) => a.price - b.price))

  return (
    <CollapseProvider state={showCollapsed}>
      <Collapsed
        showCollapsed={showCollapsed}
        childrenTitle={<Title title={title} localCollapse={showCollapsed} />}
        childrenContent={<CollapsedContentKP dataKp={dataOrder} />}
      />
    </CollapseProvider>

  );
}

export default CollapsedWrapper;