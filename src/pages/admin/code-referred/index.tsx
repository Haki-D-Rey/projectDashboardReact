import React, { ReactElement } from "react";

import { CollapseProvider } from "@/context/CollapseProvider";

import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/Layout";

import CodeReferredCollapse from "@/components/Code-Referred/collapse";
import Paginator from "@/components/Common/Paginator";


import Collapsed from "@/components/UI/Collapsed/kitplan/Collapsed";


const CodeReferred: NextPageWithLayout = () => {
    return(
        <CollapseProvider state={false}>
          <section className="w-[90%] h-full ml-2 flex flex-col gap-1 bg-primary">
            <h1 className="w-full bg-tertiary text-white font-semibold text-xl py-1 grid place-content-center rounded-xl">Mi red de referidos</h1>
            <CodeReferredCollapse isReferred={false} name="Leticia" lastName="Wood" countUser="4" arrow={false}/>
            <div className="h-auto flex flex-col gap-1">
               <Collapsed 
                showCollapsed={true}
                childrenTitle={<CodeReferredCollapse isReferred={false} name="Isaac" lastName="Montoya" straight="3" level="1" arrow={true} />} 
                childrenContent={<TitleCollapseData />}
                />
                <CodeReferredCollapse isReferred={false} name="Alex" lastName="Code" countUser="0" arrow={false}/>
                <CodeReferredCollapse isReferred={false} name="Jeffrey" lastName="Somarriba" countUser="0" arrow={false}/>
                <CodeReferredCollapse isReferred={false} name="Patrick" lastName="Bateman" countUser="0" arrow={false}/>
            </div>
            <Paginator />
        </section>
        </CollapseProvider>
    );
}

CodeReferred.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default CodeReferred;


const TitleCollapseData = () => {
    const data = [
        {
            name: "Element 1",
            lastName: 'Campos',
            countUser: "10",
            level: "Beginner",
            straight: "Yes",
            arrow: false,
          },
          {
            name: "Element 2",
            lastName: 'Gutierrez',
            countUser: "20",
            level: "Intermediate",
            straight: undefined,
            arrow: false,
          },
          {
            name: "Element 3",
            lastName: 'Machado',
            countUser: "5",
            level: undefined,
            straight: undefined,
            arrow: false,
          },
          {
            name: "Element 4",
            lastName: 'Rizo',
            countUser: undefined,
            level: undefined,
            straight: undefined,
            arrow: false,
          },
    ]

    return (
      <div className="ml-4 flex w-[100%] flex-col gap-1 pt-2">
        {data.map((item, index) => (
          <CodeReferredCollapse
            isReferred={true}
            key={index}
            name={item.name}
            lastName={item.lastName}
            countUser={item.countUser}
            level={item.level}
            straight={item.straight}
            arrow={item.arrow}
          />
        ))}
      </div>
    );
}