import { ReactNode, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

type CollapsedContextType = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const defaultValue: CollapsedContextType = {
  collapsed: false,
  setCollapsed: () => {},
};

const CollapsedContext = createContext<CollapsedContextType>(defaultValue);

export const CollapseProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <CollapsedContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </CollapsedContext.Provider>
  );
};

export const useCollapsed = () =>
  useContextSelector(CollapsedContext, (ctx) => ctx.collapsed);

export const useSetCollapsed = () =>
  useContextSelector(CollapsedContext, (ctx) => ctx.setCollapsed);
