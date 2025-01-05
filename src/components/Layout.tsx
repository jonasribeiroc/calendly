import React from 'react';
import { Avatar, Column, Container, Row, Text } from './';

interface LayoutProps {
    title: string;
    isExpanded?: boolean;
    children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ title, isExpanded, children }) => {
    return (
        <Container style={{ maxWidth: isExpanded ? 1000 : 800 }}>
            <Column style={{ borderRight: '1px solid #eee' }}>
                <Row style={{
                    textAlign: 'center',
                    borderBottom: '1px solid #eee',
                    justifyContent: 'center',
                    paddingTop: '25px',
                    paddingBottom: '25px'
                }}>
                    <Avatar
                        src='https://d3v0px0pttie1i.cloudfront.net/uploads/user/logo/36673524/7321ca0a.png'
                        width='120px'
                        height='120px'
                    />
                </Row>
                <Row style={{
                    padding: '25px 30px',
                }}>
                    <Avatar
                        src='https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/36673524/3c49f63e.jpg'
                        width='65px'
                        height='65px'
                    />
                    <Text style={{ color: '#7d7d7d', fontWeight: 'bold' }}>
                        Arvind Menon
                    </Text>
                    <Text as='h1'>60 Minute Interview</Text>
                    <Text style={{ color: '#7d7d7d' }}>
                        60 min
                    </Text>
                    <Text style={{ color: '#7d7d7d' }}>
                        Web conferencing details provided upon confirmation.
                    </Text>
                </Row>
            </Column>
            <Column style={{ flex: isExpanded ? 2 : 1, transition: 'all 0.22s ease-out' }}>
                <Row style={{
                    padding: '25px 30px',
                }}>
                    <Text as='h2'>{title}</Text>
                </Row>
                <Row style={{
                    padding: '25px 30px',
                }}>
                    {children}
                </Row>
            </Column>
        </Container>
    );
};
