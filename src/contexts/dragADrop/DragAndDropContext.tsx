import { NodeType } from '@/nodes/Nodes';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

type DnDContextType = [NodeType | null, Dispatch<SetStateAction<NodeType | null>>];

const DnDContext = createContext<DnDContextType | undefined>(undefined);

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<NodeType | null>(null);
  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
};

export const useDnD = (): DnDContextType => {
  const context = useContext(DnDContext);
  if (!context) {
    throw new Error('useDnD must be used within a DnDProvider');
  }
  return context;
};