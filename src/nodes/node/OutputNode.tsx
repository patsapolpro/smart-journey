import { useNodeData } from '@/contexts/nodeData/NodeDataContext';
import { Handle, NodeProps, Position } from '@xyflow/react';

const OutputNode = ({ id }: NodeProps) => {
  const { outputs } = useNodeData();

  return (
    <div style={{ padding: 10, border: '1px solid #888', borderRadius: 5 }}>
      <strong>Output Node</strong>
      <div>{outputs[id] !== undefined ? outputs[id].toString() : 'No output yet'}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default OutputNode