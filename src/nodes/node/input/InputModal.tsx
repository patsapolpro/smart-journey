import { Modal, Tabs, Table, Input, message, Select, Button } from 'antd';
import { useState } from 'react';
import { InputField } from './interface';
import { type InputNode } from '../../types';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { NodeProps } from '@xyflow/react';

const { TabPane } = Tabs;
const { TextArea } = Input;


const defaultField: InputField = {
  io: 'I',
  field: '',
  mo: 'M',
  length: 0,
  dataType: 'String',
  location: 'Header',
  remark: '',
};

const ioOptions = ['I', 'O'];
const moOptions = ['M', 'O'];
const dataTypes = ['String', 'Number', 'Boolean', 'Date'];

const InputModal = ({
  open,
  onClose,
  id,
  data,
}: {
  open: boolean;
  onClose: () => void;
  id: string;
  data: {
    fields: InputField[];
  };
}) => {
  const [mode, setMode] = useState<'table' | 'json'>('table');
  const [fields, setFields] = useState<InputField[]>(data?.fields || []);
  const [jsonValue, setJsonValue] = useState<string>(JSON.stringify(defaultField, null, 2));

  const handleAddField = () => {
    setFields([...fields, { ...defaultField }]);
  };


  const handleFieldChange = <K extends keyof InputField>(
    index: number,
    key: K,
    value: InputField[K]
  ) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const handleDeleteField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onClose
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      title="Field Configuration"
      width={900}
      styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
      destroyOnClose
    >
      <Tabs
        defaultActiveKey="table"
        onChange={(key) => setMode(key as 'table' | 'json')}
      >
        <TabPane tab="Table Mode" key="table">
          <Table
            dataSource={fields}
            rowKey={(_, idx) => String(idx)}
            pagination={false}
            size="small"
            bordered
            columns={[
              {
                title: 'I/O',
                dataIndex: 'io',
                render: (value, _, idx) => (
                  <Select
                    value={value}
                    onChange={(val) => handleFieldChange(idx, 'io', val)}
                    options={ioOptions.map((v) => ({ value: v }))}
                  />
                ),
              },
              {
                title: 'Field',
                dataIndex: 'field',
                render: (value, _, idx) => (
                  <Input
                    value={value}
                    onChange={(e) => handleFieldChange(idx, 'field', e.target.value)}
                  />
                ),
              },
              {
                title: 'M/O',
                dataIndex: 'mo',
                render: (value, _, idx) => (
                  <Select
                    value={value}
                    onChange={(val) => handleFieldChange(idx, 'mo', val)}
                    options={moOptions.map((v) => ({ value: v }))}
                  />
                ),
              },
              {
                title: 'Length',
                dataIndex: 'length',
                render: (value, _, idx) => (
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => handleFieldChange(idx, 'length', parseInt(e.target.value))}
                  />
                ),
              },
              {
                title: 'Data Type',
                dataIndex: 'dataType',
                render: (value, _, idx) => (
                  <Select
                    value={value}
                    onChange={(val) => handleFieldChange(idx, 'dataType', val)}
                    options={dataTypes.map((v) => ({ value: v }))}
                  />
                ),
              },
              {
                title: 'Location',
                dataIndex: 'location',
                render: (value, _, idx) => (
                  <Input
                    value={value}
                    onChange={(e) => handleFieldChange(idx, 'location', e.target.value)}
                  />
                ),
              },
              {
                title: 'Remark',
                dataIndex: 'remark',
                render: (value, _, idx) => (
                  <Input
                    value={value}
                    onChange={(e) => handleFieldChange(idx, 'remark', e.target.value)}
                  />
                ),
              },
              {
                title: '',
                render: (_, __, idx) => (
                  <Button danger icon={<DeleteOutlined />} onClick={() => handleDeleteField(idx)} />
                ),
              },
            ]}
          />

          <Button type="dashed" onClick={handleAddField} icon={<PlusOutlined />} block>
            Add Field
          </Button>

        </TabPane>
        <TabPane tab="JSON Mode" key="json">
          <TextArea
            value={jsonValue}
            onChange={(e) => setJsonValue(e.target.value)}
            rows={20}
            style={{ fontFamily: 'monospace' }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
}

export default InputModal;
