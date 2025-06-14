import { useCallback, useRef, useState } from 'react';
import '@xyflow/react/dist/style.css';

import Nodes, { customNodeTypes } from '@/nodes/Nodes';
import { useDnD } from '@/contexts/dragADrop/DragAndDropContext';
import NodeSider from '@/components/node-sider/NodeSider';
import { message } from 'antd';
import { AppEdge, AppNode } from '@/nodes/types';
import { generateNodeId } from '@/utils/helper';
import { Layout } from 'antd';
import { NodeHeader } from '@/components/node-header';
import { addEdge, Background, Connection, Controls, Edge, MiniMap, ReactFlow, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';

const MainFlow = () => {
  const reactFlowWrapper = useRef<any>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<AppEdge>([]);
  const [visitedEdgeIds, setVisitedEdgeIds] = useState(new Set());
  const { screenToFlowPosition } = useReactFlow();
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

      if (typeof type === 'undefined' || !type) {
        message.warning('Node type not found!');
        return;
      }

      const nodeData = Nodes[type];

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: AppNode = {
        id: generateNodeId(),
        type,
        position,
        data: nodeData,
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [type]
  );

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const resetWorkflow = () => {
    console.log('resetWorkflow...')
    setVisitedEdgeIds(new Set());
    setNodes(nodes.map((n) => ({
      ...n,
      style: {
        ...n.style,
        backgroundColor: '#eee',
        border: '2px solid #ccc',
        borderRadius: 8,
        animation: 'none',
        boxShadow: 'none',
      },
    })));
    setEdges(edges.map((e) => ({
      ...e,
      animated: false,
      style: { stroke: '#bbb' },
    })));
  }

  const runWorkflow = async () => {
    console.log('runWorkflow...')
    const getOutgoingEdge = (sourceId: string) =>
      edges.find((e) => e.source === sourceId);

    const getNode = (id: string) => nodes.find((n) => n.id === id);

    let currentNode = nodes[0]; // assume the first node is the start

    // Reset everything
    resetWorkflow()

    while (currentNode) {
      // 1. Animate current node
      setNodes((prev) =>
        prev.map((n) =>
          n.id === currentNode.id
            ? { ...n, animated: true, style: { ...n.style, border: '2px solid #33cc33' } }
            : n
        )
      );
      await wait(800);

      // 2. Get outgoing edge
      const edge = getOutgoingEdge(currentNode.id);
      if (!edge) break; // reached last node

      // 3. Animate edge
      setEdges((prev) =>
        prev.map((e) => {
          if (e.id === edge.id && !visitedEdgeIds.has(e.id)) {
            return {
              ...e,
              animated: true,
              style: { stroke: '#33cc33', strokeWidth: 2 },
            };
          }
          if (visitedEdgeIds.has(e.id)) {
            return {
              ...e,
              animated: false,
              style: { stroke: '#33cc33', strokeWidth: 2 },
            };
          }
          return e;
        })
      );
      await wait(800);

      // 4. Animate target node
      const nextNode = getNode(edge.target);
      if (!nextNode) break;

      setVisitedEdgeIds((prev) => new Set(prev).add(edge.id));
      setEdges((prev) =>
        prev.map((e) => {
          if (e.id === edge.id) {
            return {
              ...e,
              animated: false,
              style: { stroke: '#33cc33', strokeWidth: 2 },
            };
          }
          return e;
        })
      );

      setNodes((prev) =>
        prev.map((n) =>
          n.id === nextNode.id
            ? { ...n, style: { ...n.style, border: '2px solid #33cc33' } }
            : n
        )
      );
      await wait(800);

      // 5. Mark current and next as success
      setNodes((prev) =>
        prev.map((n) =>
          [currentNode.id, nextNode.id].includes(n.id)
            ? { ...n, style: { ...n.style, border: '2px solid #33cc33' } }
            : n
        )
      );

      currentNode = nextNode;
    }

    if (currentNode) {
      setNodes((prev) =>
        prev.map((n) =>
          n.id === currentNode.id
            ? { ...n, style: { ...n.style, border: '2px solid #33cc33' } }
            : n
        )
      );
    }
  }

  return (
    <Layout style={{ height: '100vh' }}>
      <NodeHeader onRunWorkflow={runWorkflow} onReset={resetWorkflow} />
      <div className="dndflow">
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={customNodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
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
    </Layout>
  );
}


export default MainFlow