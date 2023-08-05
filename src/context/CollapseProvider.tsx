import React, { FC, createContext, useState, useEffect, Children } from 'react';

interface ICollapseProvider {
  state: boolean | undefined;
  children: React.ReactNode;
}

interface IDefaultValues {
    collapsedState: boolean | undefined;
    setCollapsedState: (value : boolean) => void;
}

const defaultValues: IDefaultValues = {
    collapsedState: false,
    setCollapsedState: (value) => console.log(true)
}

export const collapseContext = createContext(defaultValues);

export const CollapseProvider: FC<ICollapseProvider> = ({ state, children }) => {
  const [collapsedState, setCollapsedState] = useState(state);

  return <collapseContext.Provider value={{ collapsedState, setCollapsedState }}>{children}</collapseContext.Provider>;
};
