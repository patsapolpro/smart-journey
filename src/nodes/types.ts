import type { Node, BuiltInNode, Edge } from '@xyflow/react';

export type PositionLoggerNode = Node<{ label: string }, 'position-logger'>;
export type AppNode = BuiltInNode | PositionLoggerNode;
export type AppEdge = Edge;
