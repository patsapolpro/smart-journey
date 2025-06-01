import { create } from 'zustand';

type Field = {
  direction: 'I' | 'O';
  name: string;
  required: 'M' | 'O';
  length: number;
  type: string;
  location: string;
  remark?: string;
};

type NodeIOState = {
  nodeFields: Record<string, Field[]>; // nodeId => fields
  addField: (nodeId: string, field: Field) => void;
  updateField: (nodeId: string, index: number, field: Field) => void;
  deleteField: (nodeId: string, index: number) => void;
  saveFields: (nodeId: string, fields: Field[]) => void;
};

export const useInputNodeStore = create<NodeIOState>((set) => ({
  nodeFields: {},

  addField: (nodeId, field) =>
    set((state) => ({
      nodeFields: {
        ...state.nodeFields,
        [nodeId]: [...(state.nodeFields[nodeId] || []), field],
      },
    })),

  updateField: (nodeId, index, field) =>
    set((state) => {
      const updated = [...(state.nodeFields[nodeId] || [])];
      updated[index] = field;
      return {
        nodeFields: { ...state.nodeFields, [nodeId]: updated },
      };
    }),

  deleteField: (nodeId, index) =>
    set((state) => {
      const updated = [...(state.nodeFields[nodeId] || [])];
      updated.splice(index, 1);
      return {
        nodeFields: { ...state.nodeFields, [nodeId]: updated },
      };
    }),

  saveFields: (nodeId, fields) =>
    set((state) => ({
      nodeFields: { ...state.nodeFields, [nodeId]: fields },
    })),
}));
