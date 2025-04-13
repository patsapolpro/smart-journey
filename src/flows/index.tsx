import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Edge,
  Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { initialNodes } from '@/nodes';
import { initialEdges } from '@/edges';
import { useDnD } from '@/contexts/dragADrop/DragAndDropContext';
import { AppNode } from '@/nodes/types';

let id = 0;
const getId = () => `dndnode_${id++}`;

const MainFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type, setType] = useDnD();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: getId(),
        type: 'position-logger',
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type]
  );

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      fitView
      style={{ backgroundColor: '#F7F9FB' }}
    >
      <Controls />
      <Background />
    </ReactFlow>
  );
}


export default MainFlow