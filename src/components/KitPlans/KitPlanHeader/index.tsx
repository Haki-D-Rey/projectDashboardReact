import React from 'react'

interface IKitPlanHeader {
  title: string;
}

function Main({ title }: IKitPlanHeader) {
  return (
    <div className="w-full">
      <h1 className="text-center font-bold md:text-3xl uppercase">{title}</h1>
    </div>
  );
}

export default Main;