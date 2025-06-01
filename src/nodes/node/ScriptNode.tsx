import { Handle, Position, type NodeProps } from '@xyflow/react';

import { type ScriptNode } from '../types';
import { useNodeData } from '@/contexts/nodeData/NodeDataContext';
import { useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';

const ScriptNode = ({ id, data }: NodeProps<ScriptNode>) => {
  const { codes, inputs, outputs, setOutput } = useNodeData();
  const [code, setCode] = useState(data.code || '// write your code here\nreturn input;');

  useEffect(() => {
    const code = codes[id];
    const input = inputs[id];

    if (!code) return;

    try {
      const fn = new Function('input', code);
      const result = fn(input);
      setOutput(id, result);
    } catch (err: any) {
      setOutput(id, `Error: ${err.message}`);
    }
  }, [codes, inputs, id, setOutput]);

  return (
    <div style={{ width: 300, height: 200, border: '1px solid #888', borderRadius: 5 }}>
      <strong>Script Node</strong>
      <Editor
        height="140px"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={(value) => setCode(value || '')}
        options={{ minimap: { enabled: false }, fontSize: 12 }}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div style={{ padding: 8, background: '#eee', fontSize: 12 }}>
        Output: {outputs[id] !== undefined ? outputs[id].toString() : 'No output'}
      </div>
    </div>
  );
}

export default ScriptNode
