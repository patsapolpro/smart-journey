import '@xyflow/react/dist/style.css';

import { Layout } from 'antd';

import MainFlow from './flows';
import Sidebar from '@/components/sidebar/Sidebar';
import { Header } from '@/components/header';
import Providers from '@/providers';

const App = () => {
  return (
    <Providers>
      <Layout style={{ minHeight: '100vh' }} >
        <Sidebar />
        <Layout>
          <Header />
          <MainFlow />
        </Layout>
      </Layout>
    </Providers>
  )
}

export default App