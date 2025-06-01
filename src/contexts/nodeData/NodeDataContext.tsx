import { createContext, useContext, useState, ReactNode } from 'react';

interface NodeDataContextType {
  inputs: Record<string, any>;
  setInput: (nodeId: string, value: any) => void;
  outputs: Record<string, any>;
  setOutput: (nodeId: string, value: any) => void;
  codes: Record<string, any>;
  setCode: (nodeId: string, value: any) => void;
}

const NodeDataContext = createContext<NodeDataContextType | undefined>(undefined);

export const NodeDataProvider = ({ children }: { children: ReactNode }) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [outputs, setOutputs] = useState<Record<string, any>>({});
  const [codes, setCodes] = useState<Record<string, any>>({});

  const setInput = (nodeId: string, value: any) => {
    setInputs((prev) => ({ ...prev, [nodeId]: value }));
  };

  const setOutput = (nodeId: string, value: any) => {
    setOutputs((prev) => ({ ...prev, [nodeId]: value }));
  };

  const setCode = (nodeId: string, value: any) => {
    setCodes((prev) => ({ ...prev, [nodeId]: value }));
  };

  return (
    <NodeDataContext.Provider value={{ inputs, setInput, outputs, setOutput, codes, setCode }}>
      {children}
    </NodeDataContext.Provider>
  );
};

export const useNodeData = () => {
  const context = useContext(NodeDataContext);
  if (!context) {
    throw new Error('useNodeData must be used within a NodeDataProvider');
  }
  return context;
};
