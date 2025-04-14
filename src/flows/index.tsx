import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  Edge,
  Connection,
  MiniMap,
  OnInit,
} from 'react-flow-renderer';

import '@xyflow/react/dist/style.css';

import Nodes from '@/nodes/Nodes';
import { useDnD } from '@/contexts/dragADrop/DragAndDropContext';
import NodeSider from '@/components/node-sider/NoteSider';
import { message } from 'antd';
import { AppNode } from '@/nodes/types';

let id = 0;
const getId = () => `dndnode_${id++}`;

const MainFlow = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [type] = useDnD();

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

      const reactFlowBounds = reactFlowWrapper?.current?.getBoundingClientRect();

      if (typeof type === 'undefined' || !type) {
        message.warning('Node type not found!');
        return;
      }

      const nodeData = Nodes[type];
      const position = reactFlowInstance?.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: AppNode = {
        id: getId(),
        type,
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [type]
  );

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance as OnInit<any, any>}
          fitView
          style={{ backgroundColor: '#F7F9FB' }}
        >
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
      <NodeSider />
    </div>

  );
}


export default MainFlow