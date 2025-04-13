import React from 'react';
import { theme, Layout } from 'antd';

const { Content } = Layout;

const ContentCompoent: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            Content
        </Content>
    );
};

export default ContentCompoent;