import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useState } from 'react';

import { type InputNode } from '../../types';
import InputModal from './InputModal';

const InputNode = ({ id, data }: NodeProps<InputNode>) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div>
      <Handle type="source" position={Position.Bottom} />
      <div onClick={() => setModalVisible(true)} style={{ cursor: 'pointer' }}>Input</div>

      <InputModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        id={id}
        data={data} 
      />
    </div>
  );
};

export default InputNode
