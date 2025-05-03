import React from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { useCollapsed, useSetCollapsed } from '@/contexts/collapsed/CollapsedContext';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    const [collapsed, setCollapsed] = [useCollapsed(), useSetCollapsed()];
    const onClickCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header style={{ padding: 0, background: '#001529' }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined style={{ fontSize: '20px', color: '#fff' }} /> : <MenuFoldOutlined style={{ fontSize: '20px', color: '#fff' }} />}
                onClick={onClickCollapsed}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    );
};

export default HeaderComponent;