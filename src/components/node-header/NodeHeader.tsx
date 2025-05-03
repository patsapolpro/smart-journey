import { Button, Flex, Layout, Typography } from 'antd';
import { ClearOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { NodeProperites } from './interfaces';

const { Header } = Layout;
const { Title } = Typography; 

const NodeHeader = (props: NodeProperites) => {
  return (
    <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title level={5} style={{ margin: 0 }}>Untitled Flow</Title>
      <Flex wrap gap="small">
        <Button type="primary" danger icon={<ClearOutlined />} onClick={props.onReset}>
          Reset
        </Button>
        <Button type="primary" icon={<PlayCircleOutlined />} onClick={props.onRunWorkflow}>
          Run Workflow
        </Button>
      </Flex>
    </Header>
  );
}

export default NodeHeader;