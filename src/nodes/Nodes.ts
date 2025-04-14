import type { NodeTypes } from '@xyflow/react';

import PositionLoggerNode from './PositionLoggerNode';
import { AppNode } from './types';
import { NodeModel } from './interfaces';

// Initialize nodes
export const initialNodes: AppNode[] = [
  { id: 'a', type: 'input', position: { x: 0, y: 0 }, data: { label: 'wire' } },
  {
    id: 'b',
    type: 'position-logger',
    position: { x: -100, y: 100 },
    data: { label: 'drag me!' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'with React Flow' },
  },
];

// Register custom node types
export const customNodeTypes: NodeTypes = {
  'position-logger': PositionLoggerNode,
  // Add any additional custom nodes here
};

// Define possible node types
export type NodeType = 'input' | 'default' | 'output' | 'position-logger';

// Define nodes configuration
const Nodes: { [key in NodeType]: NodeModel } = {
  input: {
    label: 'Input Node',
    key: 'input',
  },
  default: {
    label: 'Default Node',
    key: 'default',
  },
  output: {
    label: 'Output Node',
    key: 'output',
  },
  'position-logger': {
    label: 'Position Logger Node',
    key: 'position-logger',
  },
};

export default Nodes;