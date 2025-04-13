import '@xyflow/react/dist/style.css';

import { Layout } from 'antd';

import MainFlow from './flows';
import Sidebar from '@/components/sidebar/Sidebar';
import { Header } from '@/components/header';
import Providers from '@/providers';
import NodeSider from './components/node-sider/NoteSider';
import { useRef } from 'react';

const App = () => {
  const reactFlowWrapper = useRef(null);

  return (
    <Providers>
      <Layout style={{ minHeight: '100vh' }} >
        <Sidebar />
        <Layout>
          <Header />
          <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
              <MainFlow />
            </div>
            <NodeSider />
          </div>
        </Layout>
      </Layout>
    </Providers>
  )
}

export default App