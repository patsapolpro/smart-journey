import type { NodeTypes } from '@xyflow/react';

import { AppNode } from './types';
import { NodeModel } from './interfaces';
import ScriptNode from './node/ScriptNode';
import OutputNode from './node/OutputNode';
import InputNode from './node/input/InputNode';

// Initialize nodes
export const initialNodes: AppNode[] = [
  { 
    id: 'a', 
    type: 'input', 
    position: { x: 0, y: 0 },
    data: { 
      fields: []
    } 
  },
  {
    id: 'b',
    type: 'script',
    position: { x: -100, y: 100 },
    data: { code: 'script node' },
  },
  { id: 'c', position: { x: 100, y: 100 }, data: { label: 'your ideas' } },
  {
    id: 'd',
    type: 'output',
    position: { x: 0, y: 200 },
    data: { label: 'label output' },
  },
];

// Register custom node types
export const customNodeTypes: NodeTypes = {
  'input': InputNode,
  'script': ScriptNode,
  'output': OutputNode,
  // Add any additional custom nodes here
};

// Define possible node types
export type NodeType = 'input' | 'output' | 'script';

// Define nodes configuration
const Nodes: { [key in NodeType]: NodeModel } = {
  input: {
    label: 'Input Node',
    key: 'input',
    code: ''
  },
  output: {
    label: 'Output Node',
    key: 'output',
    code: ''
  },
  script: {
    label: 'Script Node',
    key: 'script',
    code: ''
  },
};

export default Nodes;