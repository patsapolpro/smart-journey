import type { Node, Edge } from '@xyflow/react';
import { InputField } from './node/input/interface';

export type InputNode = Node<{ fields: InputField[] }, 'input'>;
export type ScriptNode = Node<{ code: string }, 'script'>;
export type OutputNode = Node<{ label: string }, 'output'>;
export type AppNode = InputNode | ScriptNode | OutputNode;
export type AppEdge = Edge;